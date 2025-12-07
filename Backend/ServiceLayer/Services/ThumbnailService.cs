using Microsoft.EntityFrameworkCore;
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
    public class ThumbnailService : IThumbnailService
    {
        private readonly IThumbnailRepository _thumbnailRepository;

        public ThumbnailService(IThumbnailRepository thumbnailRepository)
        {
            _thumbnailRepository = thumbnailRepository;
        }

        public async Task<ThumbnailDto> GetById(int id)
        {
            var record = await _thumbnailRepository.GetById(id);

            return record != null ? 
                ThumbnailMapper.ToDto(record) :
                new ThumbnailDto();
        }

        public async Task<List<ThumbnailDto>> GetThumbnails(List<int> ids)
        {
            var records = await _thumbnailRepository.GetQueryable().Where(x => ids.Contains(x.Id)).ToListAsync().ConfigureAwait(false);
            return records.Select(x => ThumbnailMapper.ToDto(x)).ToList();
        }
    }

}