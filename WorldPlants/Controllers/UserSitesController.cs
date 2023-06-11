using Microsoft.AspNetCore.Mvc;
using WorldPlants.Models;
using WorldPlants.Services;

namespace WorldPlants.Controllers
{
    [Route("UserSites")]
    [ApiController]
    public class UserSitesController : Controller
    {
        private readonly ISiteService _siteService;

        public UserSitesController(ISiteService siteService)
        {
            _siteService = siteService;
        }

      

        [HttpGet]
        public ActionResult<UserSiteWithPlantsAndTasksDto> GetUserSiteWithPlantsAndTasksDtos()
        {
            var userSites = _siteService.GetUserSitesWithPlants();
            return Ok(userSites);
        }

        [HttpGet("DefaultSites")]
        public ActionResult<SiteWithIdAndNameDto> GetDefaultSites()
        {
            var defaultSites = _siteService.GetDefaultSites();
            return Ok(defaultSites);
        }

        [HttpGet("SunExposures/{locationId}")]
        public ActionResult<SunExposureDto> GetSunExposures([FromRoute] int locationId)
        {
            var sunExposures = _siteService.GetSunExposures(locationId);
            return Ok(sunExposures);
        }
    }
}
