using RepositoryLayer.Entity;
using ServiceLayer.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Mappers
{
    public class DecorativeMagnetMapper
    {

        public static DecorativeMagnetDto ToDto(DecorativeMagnet entity)
        {
            return new DecorativeMagnetDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                ThumbnailId = entity.ThumbnailId,
                ImageId = entity.ImageId,
            };
        }

        public static DecorativeMagnet ToEntity(DecorativeMagnetDto dto)
        {
            return new DecorativeMagnet()
            {
                Id = dto.Id != null ? dto.Id ?? 0 : 0,
                Name = dto.Name,
                ThumbnailId = dto.ThumbnailId,
                ImageId = dto.ImageId
            };
        }

    }

}