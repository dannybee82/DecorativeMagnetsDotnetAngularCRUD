using RepositoryLayer.Repository;
using ServiceLayer.DataTransferObjects;
using ServiceLayer.Mappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public class ImageService : IImageService
    {
        private readonly IImageRepository _imageRepository;

        public ImageService(IImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }

        public async Task<ImageDto> GetById(int id)
        {
            var record = await _imageRepository.GetById(id);

            if(record != null)
            {
                return ImageMapper.ToDto(record);
            }

            return new ImageDto();
        }

    }

}