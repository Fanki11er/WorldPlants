// Ignore Spelling: Dto

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorldPlants.Models;
using WorldPlants.Services;

namespace WorldPlants.Controllers
{
    [Route("UserSites")]
    [ApiController]
    [Authorize]
    public class UserSitesController : Controller
    {
        private readonly ISiteService _siteService;

        public UserSitesController(ISiteService siteService)
        {
            _siteService = siteService;
        }

        [HttpGet]
        public ActionResult<UserSiteWithPlantsAndTasksDto> GetUserSiteWithPlantsAndTasksDto()
        {
            var userSites = _siteService.GetUserSitesWithPlants();
            return Ok(userSites);
        }
        /*[HttpGet("Site/{siteId}")]
        public ActionResult<SiteWithPlantsDto> GetSiteWithPlants([FromRoute] int siteId)
        {
            var siteWithPlantsDto = _siteService.GetSiteWithPlants(siteId);
            return Ok(siteWithPlantsDto);
        }*/

        [HttpGet("DefaultSites")]
        public ActionResult<SiteWithIdAndNameDto> GetDefaultSites()
        {
            var defaultSites = _siteService.GetDefaultSites();
            return Ok(defaultSites);
        }

        [HttpGet("SunExposures/{locationId}")]
        public ActionResult<List<SunExposureDto>> GetSunExposures([FromRoute] int locationId)
        {
            var sunExposures = _siteService.GetSunExposures(locationId);
            return Ok(sunExposures);
        }
        [HttpGet("SunExposures/ByLocation/{locationId}")]
        public ActionResult<List<SunExposureDto>> GetSunExposuresByLocation([FromRoute] int locationId)
        {
            var sunExposures = _siteService.GetSunExposuresByLocation(locationId);
            return Ok(sunExposures);
        }

        [HttpPost("Add")]
        public ActionResult AddNewUserSite([FromBody] NewUserSiteDto newUserSiteDto)
        {
            var id = _siteService.AddNewUserSite(newUserSiteDto);

            return Created("", id);
        }

        [HttpGet("BeforeDelete/{siteId}")]
        public ActionResult<GetSiteBeforeDeleteInformationDto> GetBeforeDeleteSiteInfo(int siteId)
        {
            var result = _siteService.GetBeforeDeleteSiteInfo(siteId);

            return Ok(result);
        }

        [HttpDelete("Delete/{siteId}")]
        public ActionResult DeleteUserSite([FromRoute] int siteId)
        {
            _siteService.DeleteUserSite(siteId);

            return NoContent();
        }

        [HttpPost("Edit/{siteId}")]
        public ActionResult EditUserSite([FromRoute] int siteId, [FromBody] EditUserSiteSettingsDto dto)
        {
            _siteService.EditUserSite(siteId, dto);

            return Ok();
        }

        [HttpGet("Settings/{siteId}")]
        public ActionResult<GetUserSiteSettingsDto> GetSiteSettings([FromRoute] int siteId)
        {
            var userSiteSettingsDto = _siteService.GetSiteSettings(siteId);

            return Ok(userSiteSettingsDto);
        }

        [HttpGet("Plants/{siteId}")]
        public ActionResult<List<PlantBasicInformationDto>> GetSitePlants([FromRoute]int siteId)
        {
            var result = _siteService.GetSitePlants(siteId);

            return Ok(result);
        }

    }
}
