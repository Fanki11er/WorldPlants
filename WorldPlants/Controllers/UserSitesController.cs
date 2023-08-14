// Ignore Spelling: Dto

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using WorldPlants.Enums;
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
        [Authorize]
        public ActionResult<UserSiteWithPlantsAndTasksDto> GetUserSiteWithPlantsAndTasksDto()
        {
            var userSites = _siteService.GetUserSitesWithPlants();
            return Ok(userSites);
        }
        [HttpGet("Site/{siteId}")]
        [Authorize]
        public ActionResult<SiteWithPlantsDto> GetSiteWithPlants([FromRoute]int siteId)
        {
            var siteWithPlantsDto  = _siteService.GetSiteWithPlants(siteId);
            return Ok(siteWithPlantsDto);
        }

        [HttpGet("DefaultSites")]
        [Authorize]
        public ActionResult<SiteWithIdAndNameDto> GetDefaultSites()
        {
            var defaultSites = _siteService.GetDefaultSites();
            return Ok(defaultSites);
        }

        [HttpGet("SunExposures/{locationId}")]
        [Authorize]
        public ActionResult<List<SunExposureDto>> GetSunExposures([FromRoute] int locationId)
        {
            var sunExposures = _siteService.GetSunExposures(locationId);
            return Ok(sunExposures);
        }
        [HttpGet("SunExposures/ByLocation/{locationId}")]
        [Authorize]
        public ActionResult<List<SunExposureDto>> GetSunExposuresByLocation([FromRoute] int locationId)
        {
            var sunExposures = _siteService.GetSunExposuresByLocation(locationId);
            return Ok(sunExposures);
        }

        [HttpPost("Add")]
        [Authorize]
        
        public ActionResult AddNewUserSite([FromBody] NewUserSiteDto newUserSiteDto)
        {
           var id =  _siteService.AddNewUserSite(newUserSiteDto);

            return Created("",id);
        }

        [HttpGet("BeforeDelete/{siteId}")]
        [Authorize]
        public ActionResult<GetSiteBeforeDeleteInformationDto> GetBeforeDeleteSiteInfo(int siteId)
        {
            var result = _siteService.GetBeforeDeleteSiteInfo(siteId);

            return Ok(result);
        }

        [HttpDelete("Delete/{siteId}")]
        [Authorize]
        public ActionResult DeleteUserSite([FromRoute] int siteId)
        {
            _siteService.DeleteUserSite(siteId);

            return NoContent();
        }

        [HttpPost("Edit/{siteId}")]
        [Authorize]
        public ActionResult EditUserSite([FromRoute] int siteId, [FromBody] EditUserSiteSettingsDto dto)
        {
            _siteService.EditUserSite(siteId, dto);

            return Ok();
        }

        [HttpGet("Settings/{siteId}")]
        [Authorize]
        public ActionResult<GetUserSiteSettingsDto> GetSiteSettings([FromRoute] int siteId)
        {
           var userSiteSettingsDto = _siteService.GetSiteSettings(siteId);

            return Ok(userSiteSettingsDto);
        }

    }
}
