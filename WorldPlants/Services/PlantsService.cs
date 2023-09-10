// Ignore Spelling: Perenual Dto

using AutoMapper;
using DeepL;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WorldPlants.Entities;
using WorldPlants.Exceptions;
using WorldPlants.Models;
using WorldPlants.Models.PlantsModels;
using WorldPlants.Utilities;

namespace WorldPlants.Services
{

    public interface IPlantService
    {
        public Task<List<SearchPlantResultDto>> SearchForPlant(string searchPhrase);
        public Task<PlantDetailsDto> GetPlantDetails(int plantId);
        public Task<string?> AddPlant(AddPlantDto plantDto, int siteId);
        public PlantHeaderInformationDTO GetPlantHeaderInformationData(string plantId);
        public Task<PlantTipsDTO?> GetPlantTips(string plantId);
    }
    public class PlantsService : IPlantService
    {
        private readonly ITranslationService _translationService;
        private readonly IMapper _mapper;
        private readonly ITranslationUtilities _translationUtilities;
        private readonly WorldPlantsDbContext _dbContext;
        private readonly IUtilities _Utilities;
        private readonly IImageService _ImageService;

        public PlantsService(
            ITranslationService translationService, 
            IMapper mapper, 
            ITranslationUtilities translationUtilities, 
            WorldPlantsDbContext dbContext, 
            IUtilities utilities,
            IImageService ImageService
            )
        {
            _translationService = translationService;
            _mapper = mapper;
            _translationUtilities = translationUtilities;
            _dbContext = dbContext;
            _Utilities = utilities;
            _ImageService = ImageService;
        }
        public async Task<List<SearchPlantResultDto>> SearchForPlant(string searchPhrase)
        {
            var result = await SearchForPlantInPerenualAPI(searchPhrase);

            if (result.Data.Length != 0)
            {
                return PrepareSerchResults(result);
            }

            var translatedSearchPhrase = await _translationService.TranslateInputToEnglish(searchPhrase);

            result = await SearchForPlantInPerenualAPI(translatedSearchPhrase);

            if (result.Data.Length != 0)
            {
                return PrepareSerchResults(result);
            }

            var splitedSearchPhrase = translatedSearchPhrase.Split(' ');

            foreach (string fragmentOfPhrase in splitedSearchPhrase)
            {
                var resultFromSplitedSerchPhrase = await SearchForPlantInPerenualAPI(fragmentOfPhrase);

                if (resultFromSplitedSerchPhrase.Data.Length != 0)
                {
                    return PrepareSerchResults(resultFromSplitedSerchPhrase);
                }
            }

            return new List<SearchPlantResultDto>();
        }

        public async Task<PlantDetailsDto> GetPlantDetails(int plantId)
        {
            var rawDetails = await GetPlantDetailsFromPerenualAPI(plantId);

            var plantDetails = await PreparePlandDetailsDto(rawDetails);

            return plantDetails;

        }

        private async Task<RawPlantDetailsData> GetPlantDetailsFromPerenualAPI(int plantId)
        {
            var key = Environment.GetEnvironmentVariable("PARENUAL_API_KEY");

            using var client = new HttpClient();

            var response = await client.GetAsync($"https://perenual.com/api/species/details/{plantId}?key={key}");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();

                RawPlantDetailsData? plantDetailsData = JsonConvert
                    .DeserializeObject<RawPlantDetailsData>(content) ?? 
                    throw new JsonException("Transformacja rezultatu nie udała się");
                
                return plantDetailsData;

            }
            else
            {
                throw new SearchPlantException("Wystapił bład podczas wyszukiwania rosliny");
            }
        }

        private async Task<RawSearchPlantResultsData> SearchForPlantInPerenualAPI(string searchPhrase)
        {

            var key = Environment.GetEnvironmentVariable("PARENUAL_API_KEY");

            using var client = new HttpClient();

            var response = await client.GetAsync($"https://perenual.com/api/species-list?&key={key}&q={searchPhrase}");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();

                RawSearchPlantResultsData? deserializedResponse = JsonConvert.DeserializeObject<RawSearchPlantResultsData>(content) ?? throw new JsonException("Transformacja rezultatu nie udała się");
                return deserializedResponse;

            }
            else
            {
                throw new SearchPlantException("Wystapił bład podczas wyszukiwania rosliny");
            }
        }


        private List<SearchPlantResultDto> PrepareSerchResults(RawSearchPlantResultsData rawData)
        {
            var searchResultsList = new List<SearchPlantResultDto>();

            foreach (RawSearchPlantResult rawSearchPlantResult in rawData.Data)
            {
                var result = _mapper.Map<SearchPlantResultDto>(rawSearchPlantResult);

                result.Watering = _translationUtilities.TransformStringProperty(rawSearchPlantResult.Watering);

                result.Sunlight = _translationUtilities.TransformStringProperty(rawSearchPlantResult.Sunlight);

                searchResultsList.Add(result);
            }
            return searchResultsList;
        }

        public async Task<string?> AddPlant(AddPlantDto plantDto, int siteId)
        {
            string? fileName = "";

            var site = _dbContext.UserSites
                .Include(i => i.Plants)
                .AsSplitQuery()
                .FirstOrDefault(s => s.Id == siteId) ?? throw new Exceptions.NotFoundException("Nie odnaleziono miejsca");

            if (plantDto.ImageFile != null)
            {
                fileName = await _ImageService.SaveImageOnServer(plantDto.ImageFile);
            }
            else if (plantDto.ImageUrl != null)
            {
                fileName = await _ImageService.SaveImageFromApiOnServer(plantDto.ImageUrl);
            }

            Plant plant = _mapper.Map<Plant>(plantDto);

            plant.ImageName = fileName;

            plant.UserSiteId = siteId;

            _dbContext.Plants.Add(plant);

            _Utilities.SaveChangesToDatabase();

            return plant.Id.ToString();
        }

        public PlantHeaderInformationDTO GetPlantHeaderInformationData(string plantId)
        {
           Plant plant = _Utilities.FindPlant(plantId);

            PlantHeaderInformationDTO plantHeaderInformation = _mapper.Map<PlantHeaderInformationDTO>(plant);

            plantHeaderInformation.ImageUrl = _ImageService.GetImageUrl(plant.ImageName);

            return plantHeaderInformation;
        }

        public async Task<PlantTipsDTO?> GetPlantTips(string plantId)
        {
            var plant = _Utilities.FindPlant(plantId);

            var rawTips = await GetRawPlantTips(plant.ExternalId);

            var plantTipsDTO = await PreparePlantTipsData(rawTips);

            return plantTipsDTO;

        }

        private async Task<RawPlantTipsDataDTO?> GetRawPlantTips(int? tipsId)
        {

            if (tipsId == null)
            {
                return null;
            }

            var key = Environment.GetEnvironmentVariable("PARENUAL_API_KEY");

            using var client = new HttpClient();

            var response = await client.GetAsync($"http://perenual.com/api/species-care-guide-list?species_id={tipsId}&key={key}");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();

                RawPlantTipsDataDTO? deserializedResponse = JsonConvert.DeserializeObject<RawPlantTipsDataDTO>(content) ?? throw new JsonException("Transformacja rezultatu nie udała się");
                return deserializedResponse;

            }
            else
            {
                throw new SearchPlantException("Wystapił bład podczas wyszukiwania rosliny");
            }
        }

        private async Task<PlantTipsDTO?> PreparePlantTipsData(RawPlantTipsDataDTO? data)
        {
            if(data == null || data.Data.Length == 0)
            {
                return null;
            }

            var plantTipsDto = new PlantTipsDTO()
            {
                Id = data.Data[0].SpeciesId
            };

            var watering = data.Data[0].Section.FirstOrDefault(s => s.Type == "watering");

            var pruning = data.Data[0].Section.FirstOrDefault(s => s.Type == "pruning");

            if (watering != null)
            {
                var translatedWateringTip = await _translationService.TranslateInputToPolish(watering.Description);

                plantTipsDto.Watering = translatedWateringTip;
            }

            if(pruning != null) 
            {
                var translatedPruningTip = await _translationService.TranslateInputToPolish(pruning.Description);

                plantTipsDto.Pruning = translatedPruningTip;
            }

            return plantTipsDto;
        }

        private async Task<PlantDetailsDto> PreparePlandDetailsDto(RawPlantDetailsData rawData)
        {
            var plantDetails = _mapper.Map<PlantDetailsDto>(rawData);

            plantDetails.Watering = _translationUtilities.TransformStringProperty(rawData.Watering);

            plantDetails.Sunlight = _translationUtilities.TransformStringProperty(rawData.Sunlight);

            plantDetails.LifeCycle = _translationUtilities.TransformStringProperty(rawData.LifeCycle);

            plantDetails.AverageHeight = _translationUtilities.TransformDimensionProperty(rawData.Dimensions);

            plantDetails.PlantType = _translationUtilities.TransformStringProperty(rawData.PlantType);

            plantDetails.WateringPeriod = _translationUtilities.TransformStringProperty(rawData.WateringPeriod);

            plantDetails.WateringGeneralBenchmark = _translationUtilities
                .TransformGeneralWateringBenchmark(rawData.RawPlantDetailsWateringGeneralBenchmark);

            plantDetails.PruningMonth = _translationUtilities.TransformStringProperty(rawData.PruningMonth);

            plantDetails.PruningCount = _translationUtilities.TransformPruningCount(rawData.PruningCount);

            plantDetails.CareLevel = _translationUtilities.TransformStringProperty(rawData.CareLevel);

            plantDetails.GrowthRate = _translationUtilities.TransformStringProperty(rawData.GrowthRate);

            plantDetails.FloweringSeason = _translationUtilities.TransformStringProperty(rawData.FloweringSeason);

            plantDetails.HarvestSeason = _translationUtilities.TransformStringProperty(rawData.HarvestSeason);

            try
            {
                plantDetails.Description = await _translationService.TranslateInputToPolish(rawData.Description);
            }
            catch(QuotaExceededException ex)
            {
                plantDetails.Description = "Nie udało się uzyskać inforacji";

                Console.WriteLine(ex.Message);
            }

           

            return plantDetails;
        }
    }
}
