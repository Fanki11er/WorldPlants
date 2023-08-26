﻿// Ignore Spelling: Dto

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorldPlants.Models;
using WorldPlants.Models.PlantsModels;
using WorldPlants.Services;

namespace WorldPlants.Controllers
{
    [Route("Plants")]
    [ApiController]
    //[Authorize]
    public class PlantsController : Controller
    {
        private readonly IPlantService _plantService;
        public PlantsController(IPlantService plantService)
        {
            _plantService = plantService;
        }

        [HttpGet("Search")]
        public async Task<ActionResult<SearchPlantResultDto>> SearchForPlant([FromQuery] string searchPhrase)
        {
            var result = await _plantService.SearchForPlant(searchPhrase);

            return Ok(result);
        }

        [HttpGet("Details/{plantId}")]
        public async Task<ActionResult<PlantInformationDto>> SearchForPlant([FromRoute] int plantId)
        {
            var result = await _plantService.GetPlantDetails(plantId);

            return Ok(result);
        }

        [HttpPost("Add/{siteId}")]
        public async Task<ActionResult<string>> AddPlant([FromForm] AddPlantDto plantDto, [FromRoute]int siteId)
        {
         var plantId =   await _plantService.AddPlant(plantDto, siteId);

            return Ok(plantId);
        }

        /* [HttpPost("GPT")]
         public async Task<ActionResult<string>> SearchForPlantUsingGPT(string searchPhrase)
         {
             var result = await _plantService.SearchForPlantUsingGPT(searchPhrase);

             return Ok(result);
         }
        */



    }
}
