using Microsoft.EntityFrameworkCore;
using RepositoryLayer.Entity;
using RepositoryLayer.PagingSorting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repository
{
    public class DecorativeMagnetRepository : IDecorativeMagnetRepository
    {
        private readonly MainDbContext _dbContext;
        private const int PageSize = 25;

        public DecorativeMagnetRepository(MainDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Create(DecorativeMagnet entity)
        {
            await _dbContext.DecorativeMagnets.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var record = await GetById(id);

            if (record != null)
            {
                _dbContext.DecorativeMagnets.Entry(record).State = EntityState.Deleted;
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<List<DecorativeMagnet>> GetAll()
        {
            return await _dbContext.DecorativeMagnets
               .AsNoTracking()
               .OrderByDescending(x => x.Id)
               .Include(x => x.Thumbnail)
               .ToListAsync()
               .ConfigureAwait(false);
        }

        public async Task<DecorativeMagnet?> GetById(int id)
        {
            return await _dbContext.DecorativeMagnets
                .AsNoTracking()
                .Include(x => x.Thumbnail)
                .Include(x => x.Image)
                .SingleOrDefaultAsync(x => x.Id == id)
                .ConfigureAwait(false);
        }

        public async Task<PaginatedList<DecorativeMagnet>> GetList(int? pageNumber, int? pageSize)
        {
            IQueryable<DecorativeMagnet> query = _dbContext.DecorativeMagnets
                .AsNoTracking()
               .OrderByDescending(x => x.Id)
               .Include(x => x.Thumbnail);

            return await PaginatedList<DecorativeMagnet>.CreateAsync(query, pageNumber ?? 1, pageSize ?? PageSize);
        }

        public IQueryable<DecorativeMagnet> GetQueryable()
        {
            return _dbContext.DecorativeMagnets
                .AsNoTracking();
        }

        public async Task Update(DecorativeMagnet entity)
        {
            var record = await GetById(entity.Id);

            if (record != null)
            {
                _dbContext.Entry<DecorativeMagnet>(record).State = EntityState.Detached;
                record = entity;
                _dbContext.DecorativeMagnets.Update(entity);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<PaginatedList<DecorativeMagnet>> GetList(IQueryable<DecorativeMagnet> query, int? pageNumber, int? pageSize)
        {
            return await PaginatedList<DecorativeMagnet>.CreateAsync(query, pageNumber ?? 1, pageSize ?? PageSize);
        }

        public async Task StopTracking()
        {
            await Task.Run(() => {
                _dbContext.ChangeTracker.Clear();
            });
        }
    }

}