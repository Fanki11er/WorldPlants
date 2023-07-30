using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WorldPlants.Controllers
{
    [Route("Test")]
    [ApiController]
    [AllowAnonymous]
    public class WtfController : Controller
    {
        [HttpPost]
        public ActionResult RecognisePlant(List<IFormFile> images)
        {

           
            return Ok();
        }
    }
}
