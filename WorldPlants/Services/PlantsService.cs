// Ignore Spelling: Perenual

using AutoMapper;
using Newtonsoft.Json;
using WorldPlants.Exceptions;
using WorldPlants.Models;
using WorldPlants.Utilities;

namespace WorldPlants.Services
{

    public interface IPlantService
    {
        //public Task<SearchPlantResults> SearchForPlant(string searchPhrase);
        //public Task<string> SearchForPlantUsingGPT(string searchPhrase);
        public Task<List<SearchPlantResultDto>> SearchForPlant(string searchPhrase);
    }
    public class PlantsService : IPlantService
    {
        private readonly ITranslationService _translationService;
        private readonly IMapper _mapper;
        private readonly ITranslationUtilities _translationUtilities;

        public PlantsService(ITranslationService translationService, IMapper mapper, ITranslationUtilities translationUtilities)
        {
            _translationService = translationService;
            _mapper = mapper;
            _translationUtilities = translationUtilities;
        }
        public async Task<List<SearchPlantResultDto>> SearchForPlant(string searchPhrase)
        {
            var result = await SearchForPlantInPerenualAPI(searchPhrase);

            if (result.Data.Length != 0)
            {
                return PrepareSerchResults(result);
            }

            var translatedSearchPhrase = await _translationService.TranslateInput(searchPhrase);

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
                    return PrepareSerchResults(result);
                }
            }

            return new List<SearchPlantResultDto>();
        }

        public void GetPlantDetails(int plantId)
        {

        }

        private async Task GetPlantDetailsFromPerenualAPI(int plantId)
        {
            var key = Environment.GetEnvironmentVariable("PARENUAL_API_KEY");

            using var client = new HttpClient();

            var response = await client.GetAsync($"https://perenual.com/api/species/details/{plantId}?key={key}");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();


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

                RawSearchPlantResultsData? deserializedResponse = JsonConvert.DeserializeObject<RawSearchPlantResultsData>(content);

                if (deserializedResponse == null)
                {

                    throw new JsonException("Transformacja rezultatu nie udała się");
                }

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

        /*public async Task<SearchPlantResults> SearchForPlant(string searchPhrase)
        {
        }*/

        /*public async Task<string> SearchForPlantUsingGPT(string searchPhrase)
        {
            var key = "";
            var genetrator = new JSchemaGenerator();

            JSchema schema = genetrator.Generate(typeof(GTPSearchRequestSchema));

            GTPSearchFunction gptFunction = new()
            {
                Name = "GetPlantInformation",
                Parameters = schema
            };

            GPTRequest request = new()
            {
                Model = "gpt-3.5-turbo-0613",

                Messages = new MessageInJSON[]
                {
                    new MessageInJSON()
                    {
                        Role = "user",
                        Content = $"Use metric units. Find information about plant: {searchPhrase}"
                    }
                },
                Functions = new GTPSearchFunction[]
                {
                    gptFunction
                },
                Max_tokens = 256,
                Temperature = 0.2f
                
            };

            using var client = new HttpClient();

            var json = JsonConvert.SerializeObject(request);

            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var httpRequest = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions");

            httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", key);

            httpRequest.Content = httpContent;

            //var response = await client.SendAsync(httpRequest);

            //var content =  await response.Content.ReadAsStringAsync();
            var test = "{\r\n  \"id\": \"chatcmpl-7pF1asOw6H41KP7ACIfkx1ZpAeWXo\",\r\n  \"object\": \"chat.completion\",\r\n  \"created\": 1692446838,\r\n  \"model\": \"gpt-3.5-turbo-0613\",\r\n  \"choices\": [\r\n    {\r\n      \"index\": 0,\r\n      \"message\": {\r\n        \"role\": \"assistant\",\r\n        \"content\": null,\r\n        \"function_call\": {\r\n          \"name\": \"GetPlantInformation\",\r\n          \"arguments\": \"{\\n  \\\"CommonName\\\": \\\"Habanero\\\",\\n  \\\"ScientificName\\\": \\\"Capsicum chinense\\\",\\n  \\\"Description\\\": \\\"The habanero is a hot chili pepper. It is one of the spiciest peppers in the world and is commonly used in spicy dishes.\\\",\\n  \\\"Light\\\": 6,\\n  \\\"DieInTemp\\\": 0,\\n  \\\"NeedsSoilNutrimentsLevel\\\": 3,\\n  \\\"NeedsSoilHumidityLevel\\\": 4,\\n  \\\"AverageHeight\\\": 60,\\n  \\\"AverageHeightUnit\\\": \\\"cm\\\",\\n  \\\"Indoor\\\": false,\\n  \\\"Outdoor\\\": true\\n}\"\r\n        }\r\n      },\r\n      \"finish_reason\": \"function_call\"\r\n    }\r\n  ],\r\n  \"usage\": {\r\n    \"prompt_tokens\": 111,\r\n    \"completion_tokens\": 137,\r\n    \"total_tokens\": 248\r\n  }\r\n}";

            //return content;
            return ProcessGPTSearchResponse(test);


        }*/

        /*private string ProcessGPTSearchResponse(string response)
        {
            GPTResponse? deserializedResponse = JsonConvert.DeserializeObject<GPTResponse>(response);

            if(deserializedResponse == null) {
                throw new Exception("Err");
            }

            var res = deserializedResponse.Choices[0].Message.FunctionCall.Arguments;

            if(res == null)
            {
                throw new Exception("Err");
            }

            GTPSearchRequestSchema? test = JsonConvert.DeserializeObject<GTPSearchRequestSchema>(res);

            if(test == null)
            {
                throw new Exception("Err");
            }

            return test.Description;
           
        }*/


    }
}
