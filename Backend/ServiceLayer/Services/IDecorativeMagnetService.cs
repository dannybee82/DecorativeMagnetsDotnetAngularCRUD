using RepositoryLayer.PagingSorting;
using ServiceLayer.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public interface IDecorativeMagnetService
    {
        Task CreateDecorativeMagnet(DecorativeMagnetFormDataDto dto);

        Task UpdateDecorativeMagnet(DecorativeMagnetFormDataDto dto);

        Task DeleteDecorativeMagnet(int id);

        Task<List<DecorativeMagnetDto>> GetAllDecorativeMagnets();

        Task<DecorativeMagnetDto?> GetDecorativeMagnetById(int id);

        Task<PaginatedList<DecorativeMagnetDto>> GetList(int? pageNumber, int? pageSize);
    }

}
