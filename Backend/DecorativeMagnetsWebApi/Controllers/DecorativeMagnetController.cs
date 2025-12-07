using Microsoft.AspNetCore.Mvc;
using ServiceLayer.DataTransferObjects;
using ServiceLayer.Services;

namespace DecorativeMagnetsWebApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class DecorativeMagnetController : ControllerBase
    {
        private readonly IDecorativeMagnetService _decorativeMagnetService;

        public DecorativeMagnetController(IDecorativeMagnetService decorativeMagnetService)
        {
            _decorativeMagnetService = decorativeMagnetService;
        }

        [HttpGet("GetPagedList")]
        public async Task<IActionResult> GetPagedList(int? pageNumber, int? pageSize)
        {
            try
            {
                var list = await _decorativeMagnetService.GetList(pageNumber, pageSize);
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var item = await _decorativeMagnetService.GetDecorativeMagnetById(id);
                return Ok(item);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] DecorativeMagnetFormDataDto dto)
        {
            try
            {
                await _decorativeMagnetService.CreateDecorativeMagnet(dto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] DecorativeMagnetFormDataDto dto)
        {
            try
            {
                await _decorativeMagnetService.UpdateDecorativeMagnet(dto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _decorativeMagnetService.DeleteDecorativeMagnet(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }

}