using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorldPlants.Models.QrCodes;
using WorldPlants.Services;

namespace WorldPlants.Controllers
{
    [Route("Qr")]
    [ApiController]
    [Authorize]
    public class QrCodesController : Controller
    {
        private readonly IQrCodesService _qrCodesService;
        public QrCodesController(IQrCodesService qrCodesService)
        {
            _qrCodesService = qrCodesService;
        }

        [HttpPost("{plantId}")]
        public ActionResult CreateQrCode([FromRoute] string plantId)
        {
            _qrCodesService.CreateQrCode(plantId);

            return Ok("Utworzono kod");
        }

        [HttpGet]
        public ActionResult<List<QrCodeDTO>> GetQrCodes() 
        {
            var result = _qrCodesService.GetQrCodes();

            return Ok(result);
        }

        [HttpDelete("{qrCodeId}")]
        public ActionResult DeleteQrCode([FromRoute] int qrCodeId)
        {
            _qrCodesService.DeleteQrCode(qrCodeId);

            return Ok("Usunięto kod");
        }
        [HttpDelete]
        public ActionResult DeleteUserQrCodes()
        {
            _qrCodesService.DeleteUserQrCodes();

            return Ok("Usunięto kody");
        }
    }
}
