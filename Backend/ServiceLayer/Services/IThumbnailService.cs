using ServiceLayer.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public interface IThumbnailService
    {

        Task<ThumbnailDto> GetById(int id);
        Task<List<ThumbnailDto>> GetThumbnails(List<int> ids);

    }

}