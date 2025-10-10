using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator =>
            _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
                ?? throw new InvalidOperationException("IMediator not found in RequestServices");


        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (!result.IsSuccess && (result.Code == 404 || result.Code == 400)) return NotFound();
            if (result.IsSuccess && result.Value != null) return Ok(result.Value);

            return BadRequest(result.Error);
        }
    }
}
