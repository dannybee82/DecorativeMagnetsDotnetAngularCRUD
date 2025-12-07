using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Services;

namespace DecorativeMagnetsWebApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;

        public ImageController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var item = await _imageService.GetById(id);
                return Ok(item);
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong. " + ex.Message + " - " + ex.InnerException);
            }
        }

    }

}