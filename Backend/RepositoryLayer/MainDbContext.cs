using Microsoft.EntityFrameworkCore;
using RepositoryLayer.DummyData;
using RepositoryLayer.DummyData.Images;
using RepositoryLayer.DummyData.Thumbnails;
using RepositoryLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer
{
    public class MainDbContext : DbContext
    {
        public DbSet<DecorativeMagnet> DecorativeMagnets { get; set; }

        public DbSet<Image> Images { get; set; }

        public DbSet<Thumbnail> Thumbnails { get; set; }

        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DecorativeMagnet>().HasData(
              DummyDataDecorativeMagnets.Create()
           );

            var allImages = DummyDataImagesPart_001.Create()
                .Concat(DummyDataImagesPart_002.Create())
                .Concat(DummyDataImagesPart_003.Create())
                .Concat(DummyDataImagesPart_004.Create())
                .Concat(DummyDataImagesPart_005.Create())
                .Concat(DummyDataImagesPart_006.Create())
                .Concat(DummyDataImagesPart_007.Create())
                .ToList();

            modelBuilder.Entity<Image>().HasData(
               allImages
            );

            var allThumbnails = DummyDataThumbnailsPart_001.Create()
               .Concat(DummyDataThumbnailsPart_002.Create())
               .Concat(DummyDataThumbnailsPart_003.Create())
               .Concat(DummyDataThumbnailsPart_004.Create())
               .Concat(DummyDataThumbnailsPart_005.Create())
               .Concat(DummyDataThumbnailsPart_006.Create())
               .Concat(DummyDataThumbnailsPart_007.Create())
               .ToList();

            modelBuilder.Entity<Thumbnail>().HasData(
               allThumbnails
            );
        }

    }

}