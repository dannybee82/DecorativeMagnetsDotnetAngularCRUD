using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using RepositoryLayer;
using RepositoryLayer.Repository;
using ServiceLayer.Services;
using ServiceLayer.Settings;

var builder = WebApplication.CreateBuilder(args);

//For PostgreSQL Databases and DateTime.
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// Add DbContext.
var dbConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<MainDbContext>(options => options.UseNpgsql(dbConnectionString));

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "DecorativeMagnetsWebApi", Version = "v1" });
});

// Enable CORS - Cross Origin Resource Sharing
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", builder =>
        builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod()
    );
});

// Set allowed File Types. See: FileSignatures.Formats for available formats.
//Also see: https://github.com/neilharvey/FileSignatures/
var allowedFileList = new AllowedFileFormatList()
{
    AllowedFileList = new List<AllowedFileFormat>()
    {
        new AllowedFileFormat()
        {
            Extension = "jpg",
            MimeType = "image/jpg"
        },
        new AllowedFileFormat()
        {
            Extension = "jpeg",
            MimeType = "image/jpeg"
        },
        new AllowedFileFormat()
        {
            Extension = "png",
            MimeType = "image/png"
        },
        new AllowedFileFormat()
        {
            Extension = "gif",
            MimeType = "image/gif"
        }
    }
};

// Register repositories (Database Layer)
builder.Services.AddScoped<IDecorativeMagnetRepository, DecorativeMagnetRepository>();
builder.Services.AddScoped<IImageRepository, ImageRepository>();
builder.Services.AddScoped<IThumbnailRepository, ThumbnailRepository>();

// Register services.
builder.Services.AddScoped<IDecorativeMagnetService, DecorativeMagnetService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IThumbnailService, ThumbnailService>();

// Register Singletons => Allowed files.
builder.Services.AddSingleton<IAllowedFileFormatList, AllowedFileFormatList>((IServiceProvider sp) => allowedFileList);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();
