using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Services;

namespace DecorativeMagnetsWebApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ThumbnailController : ControllerBase
    {
        private readonly IThumbnailService _thumbnailService;

        public ThumbnailController(IThumbnailService thumbnailService)
        {
            _thumbnailService = thumbnailService;
        }

        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var items = await _thumbnailService.GetById(id);
                return Ok(items);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll([FromQuery] List<int> ids)
        {
            try
            {
                var items = await _thumbnailService.GetThumbnails(ids);
                return Ok(items);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}
