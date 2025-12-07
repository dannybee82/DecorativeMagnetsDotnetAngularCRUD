using Microsoft.EntityFrameworkCore;
using RepositoryLayer.Entity;
using RepositoryLayer.PagingSorting;
using RepositoryLayer.Repository;
using ServiceLayer.DataTransferObjects;
using ServiceLayer.Mappers;
using ServiceLayer.Settings;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Processing;
using System;
using System.Buffers.Text;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public class DecorativeMagnetService : IDecorativeMagnetService
    {
        private readonly IDecorativeMagnetRepository _decorativeMagnetRepository;
        private readonly IThumbnailRepository _thumbnailRepository;
        private readonly IImageRepository _imageRepository;
        private readonly IAllowedFileFormatList _allowedFileFormatList;

        public DecorativeMagnetService(
            IDecorativeMagnetRepository decorativeMagnetRepository,
            IThumbnailRepository thumbnailRepository,
            IImageRepository imageRepository,
            IAllowedFileFormatList allowedFileFormatList)
        {
            _decorativeMagnetRepository = decorativeMagnetRepository;
            _thumbnailRepository = thumbnailRepository;
            _imageRepository = imageRepository;
            _allowedFileFormatList = allowedFileFormatList;
        }

        public async Task CreateDecorativeMagnet(DecorativeMagnetFormDataDto dto)
        {
            try
            {
                if(dto.ImageBase64 == null || string.IsNullOrEmpty(dto.ImageBase64 ?? string.Empty))
                {
                    throw new Exception("No Image received");
                }

                if(!IsValidBase64(dto.ImageBase64 ?? string.Empty))
                {
                    throw new Exception("No Valid base64");
                }

                MemoryStream? ms = Base64ToMemoryStream(dto.ImageBase64);

                if(ms == null)
                {
                    throw new Exception("Can't create MemoryStream");
                }

                SixLabors.ImageSharp.Formats.IImageFormat? format = await SixLabors.ImageSharp.Image.DetectFormatAsync(ms);

                if(format == null)
                {
                    throw new Exception("Not allowed file format.");
                }

                string type = GetImageType(dto.ImageBase64);

                var record = _allowedFileFormatList.AllowedFileList.SingleOrDefault(x => 
                    x.Extension.Equals(type) && 
                    x.MimeType.Equals(format.DefaultMimeType));

                if (record == null)
                {
                    throw new Exception("Not allowed file format.");
                }

                //Create new image and thumbnail.
                int imageId = 0;
                int thumbnailId = 0;

                SixLabors.ImageSharp.Image imageFull = ConvertBase64StringToImage(dto.ImageBase64);

                string thumbnail = string.Empty;

                using (var image = SixLabors.ImageSharp.Image.Load(ms))
                {
                    if (image.Width > 250)
                    {
                        image.Mutate(x => x.Resize(new Size(250, 0)));
                        thumbnail = image.ToBase64String(PngFormat.Instance);
                    }
                    else
                    {
                        thumbnail = dto.ImageBase64;
                    }
                }

                //Add Image.
                imageId = await _imageRepository.CreateAndReturnId(new RepositoryLayer.Entity.Image()
                {
                    Base64 = imageFull.ToBase64String(PngFormat.Instance)
                });

                //Add thumbnail.
                thumbnailId = await _thumbnailRepository.CreateAndReturnId(new RepositoryLayer.Entity.Thumbnail()
                {
                    Base64 = thumbnail,
                    ParentImageId = imageId
                });

                await _decorativeMagnetRepository.Create(new DecorativeMagnet()
                {
                    Name = dto.Name,
                    ThumbnailId = thumbnailId,
                    ImageId = imageId
                });
            }
            catch (Exception ex)
            {
                throw new Exception("Something went wrong: " + ex.Message + " - " + ex.InnerException);
            }
        }

        public async Task DeleteDecorativeMagnet(int id)
        {
            try
            {
                var currentDecorativeMagnet = await _decorativeMagnetRepository.GetQueryable()
                    .Include(x => x.Image)
                    .Include(x => x.Thumbnail)
                    .SingleOrDefaultAsync(x => x.Id == id)
                    .ConfigureAwait(false);

                if (currentDecorativeMagnet == null)
                {
                    throw new Exception("Invalid Decorative Magnet.");
                }

                await _decorativeMagnetRepository.Delete(id);

                int targetThumbnailId = currentDecorativeMagnet.ThumbnailId ?? 0;
                int targetImageId = currentDecorativeMagnet.ImageId ?? 0;

                if (targetThumbnailId > 0)
                {
                    await _thumbnailRepository.Delete(targetThumbnailId);
                }

                if (targetImageId > 0)
                {
                    await _imageRepository.Delete(targetImageId);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Something went wrong: " + ex.Message + " - " + ex.InnerException);
            }
        }
        
        public async Task<List<DecorativeMagnetDto>> GetAllDecorativeMagnets()
        {
            try
            {
                var records = await _decorativeMagnetRepository.GetAll();
                return records.Select(record => DecorativeMagnetMapper.ToDto(record)).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Something went wrong: " + ex.Message + " - " + ex.InnerException);
            }
        }

        public async Task<PaginatedList<DecorativeMagnetDto>> GetList(int? pageNumber, int? pageSize)
        {
            PaginatedList<DecorativeMagnet> result = await _decorativeMagnetRepository.GetList(pageNumber, pageSize);

            return new PaginatedList<DecorativeMagnetDto>
            {
                CurrentPage = result.CurrentPage,
                From = result.From,
                PageSize = result.PageSize,
                To = result.To,
                TotalCount = result.TotalCount,
                TotalPages = result.TotalPages,
                Items = result.Items.Select(x => DecorativeMagnetMapper.ToDto(x)).ToList()
            };
        }

        public async Task<DecorativeMagnetDto?> GetDecorativeMagnetById(int id)
        {
            try
            {
                var record = await _decorativeMagnetRepository.GetById(id);
                return record != null ? DecorativeMagnetMapper.ToDto(record) : null;
            }
            catch (Exception ex)
            {
                throw new Exception("Something went wrong: " + ex.Message + " - " + ex.InnerException);
            }
        }

        public async Task UpdateDecorativeMagnet(DecorativeMagnetFormDataDto dto)
        {
            try
            {
                int targetId = dto.Id ?? 0;

                if (targetId == 0)
                {
                    throw new Exception("Invalid Id");
                }

                if (dto.ImageBase64 == null)
                {
                    throw new Exception("No Image Received");
                }

                if (!IsValidBase64(dto.ImageBase64))
                {
                    throw new Exception("No Valid base64");
                }

                var currentRecord = await _decorativeMagnetRepository.GetById(targetId);

                if(currentRecord == null)
                {
                    throw new Exception("No Record Found");
                }

                if(dto.ThumbnailId != null && currentRecord.ThumbnailId == (dto.ThumbnailId ?? 0))
                {
                    //Update name.
                    currentRecord.Name = dto.Name;
                    await _decorativeMagnetRepository.Update(currentRecord);
                }
                else
                {
                    MemoryStream? ms = Base64ToMemoryStream(dto.ImageBase64);

                    if (ms == null)
                    {
                        throw new Exception("Can't create MemoryStream");
                    }

                    SixLabors.ImageSharp.Formats.IImageFormat? format = await SixLabors.ImageSharp.Image.DetectFormatAsync(ms);

                    if (format == null)
                    {
                        throw new Exception("Not allowed file format.");
                    }

                    string type = GetImageType(dto.ImageBase64);

                    var record = _allowedFileFormatList.AllowedFileList.SingleOrDefault(x =>
                        x.Extension.Equals(type) &&
                        x.MimeType.Equals(format.DefaultMimeType));

                    if (record == null)
                    {
                        throw new Exception("Not allowed file format.");
                    }

                    //Create new image and thumbnail.
                    int oldImageId = currentRecord.ImageId ?? 0;
                    int oldThumbnailId = currentRecord.ThumbnailId ?? 0;
                    int imageId = 0;
                    int thumbnailId = 0;

                    SixLabors.ImageSharp.Image imageFull = ConvertBase64StringToImage(dto.ImageBase64);

                    string thumbnail = string.Empty;

                    using (var image = SixLabors.ImageSharp.Image.Load(ms))
                    {
                        if (image.Width > 250)
                        {
                            image.Mutate(x => x.Resize(new Size(250, 0)));
                            thumbnail = image.ToBase64String(PngFormat.Instance);
                        }
                        else
                        {
                            thumbnail = dto.ImageBase64;
                        }
                    }

                    //Add Image.
                    imageId = await _imageRepository.CreateAndReturnId(new RepositoryLayer.Entity.Image()
                    {
                        Base64 = imageFull.ToBase64String(PngFormat.Instance)
                    });

                    //Add thumbnail.
                    thumbnailId = await _thumbnailRepository.CreateAndReturnId(new RepositoryLayer.Entity.Thumbnail()
                    {
                        Base64 = thumbnail,
                        ParentImageId = imageId
                    });

                    //Update.
                    DecorativeMagnet entity = new DecorativeMagnet()
                    {
                        Id = currentRecord.Id,
                        Name = dto.Name,
                        ImageId = imageId,
                        ThumbnailId = thumbnailId
                    };

                    await _decorativeMagnetRepository.Update(entity);
                    await _decorativeMagnetRepository.StopTracking();

                    //Delete old records.
                    if(oldImageId > 0)
                    {
                        await _imageRepository.Delete(oldImageId);
                    }

                    if(oldThumbnailId > 0)
                    {
                        await _thumbnailRepository.Delete(oldThumbnailId);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Something went wrong: " + ex.Message + " - " + ex.InnerException);
            }
        }

        private SixLabors.ImageSharp.Image ConvertBase64StringToImage(string base64)
        {
            var finalB64 = base64.Split(",")[1];
            var imageContent = Convert.FromBase64String(finalB64);
            return SixLabors.ImageSharp.Image.Load(imageContent);
        }

        private string GetImageType(string base64)
        {
            var finalB64 = base64.Split(",")[0];

            if(finalB64.IndexOf("/") > -1 && finalB64.IndexOf(";") > -1)
            {
                return Regex.Replace(finalB64, "^.*\\/|\\;.*$", "").ToLower();
            }

            return string.Empty;
        }

        private bool IsValidBase64(string base64)
        {
            if(string.IsNullOrEmpty(base64))
            {
                return false;
            }

            if (base64.IndexOf("data:") == -1 || base64.IndexOf("image/") == -1 || base64.IndexOf(";") == -1 || base64.IndexOf("base64,") == -1)
            {
                return false;
            }

            return true;
        }

        private MemoryStream? Base64ToMemoryStream(string base64)
        {
            try
            {
                string base64Only = base64.Split(",")[1];
                MemoryStream ms = new MemoryStream(Convert.FromBase64String(base64Only));
                return ms;
            }
            catch (Exception)
            {
                return null;
            }
        }

    }

}