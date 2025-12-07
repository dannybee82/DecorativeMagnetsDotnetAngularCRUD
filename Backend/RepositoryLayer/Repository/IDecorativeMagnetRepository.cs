using RepositoryLayer.Entity;
using RepositoryLayer.PagingSorting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repository
{

    public interface IDecorativeMagnetRepository
    {
        IQueryable<DecorativeMagnet> GetQueryable();

        Task<List<DecorativeMagnet>> GetAll();

        Task<PaginatedList<DecorativeMagnet>> GetList(int? pageNumber, int? pageSize);

        Task<PaginatedList<DecorativeMagnet>> GetList(IQueryable<DecorativeMagnet> query, int? pageNumber, int? pageSize);

        Task<DecorativeMagnet?> GetById(int id);

        Task Create(DecorativeMagnet entity);

        Task Update(DecorativeMagnet entity);

        Task Delete(int id);

        Task StopTracking();
    }

}
