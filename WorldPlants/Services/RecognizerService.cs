using Newtonsoft.Json;
using System.Net.Http.Headers;
using WorldPlants.Exceptions;
using WorldPlants.Models;

namespace WorldPlants.Services
{
    public interface IRecognizerService
    {
        public Task<List<RecognizedPlantDto>> RecognizePlant(List<IFormFile> images);
    }


    public class RecognizerService : IRecognizerService
    {

        private readonly ILogger<RecognizerService> _logger;

        public RecognizerService(ILogger<RecognizerService> logger)
        {
            _logger = logger;
        }
        public async Task<List<RecognizedPlantDto>> RecognizePlant(List<IFormFile> images)
        {
            var suggestions = await RecognizePlantFromImages(images);

            var resultDtos = ConvertSugestionsToDto(suggestions);

            return resultDtos;
        }


        private List<RecognizedPlantDto> ConvertSugestionsToDto(List<Suggestion> suggestions)
        {
            var results = new List<RecognizedPlantDto>();

            foreach (var suggestion in suggestions)
            {
                RecognizedPlantDto dto = new()
                {
                    Id = suggestion.Id,
                    Name = suggestion.Name,
                    Probability = $"{(int)(suggestion.Probability * 100)}%",
                    Description = suggestion.Details?.Description?.Value ?? "",
                    Images = suggestion.Details?.Images?.Select(i => i.Value ?? "").ToList() ?? new List<string>()
                };
                results.Add(dto);
            }
            return results;
        }

        private async Task<List<Suggestion>> RecognizePlantFromImages(List<IFormFile> images)
        {

            var key = Environment.GetEnvironmentVariable("PLANTID_API_KEY");

            using var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Api-Key", key);


            var formData = new MultipartFormDataContent();

            foreach (var image in images)
            {
                var imageContent = new StreamContent(image.OpenReadStream());
                imageContent.Headers.ContentType = new MediaTypeHeaderValue(image.ContentType);
                formData.Add(imageContent, "images", image.FileName);
            }

            var response = await client.PostAsync("https://plant.id/api/v3/identification?details=description,images&language=pl", formData);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var recognizerResponse = new RecognizerResponse();

                JsonConvert.PopulateObject(content, recognizerResponse);

                if (recognizerResponse != null)
                {
                    return recognizerResponse.Result.Classification.Suggestions.Take(3).ToList();
                }
                else
                {
                    return new List<Suggestion>();
                }

            }
            else
            {
                _logger.LogError(response.Content.ReadAsStringAsync().Result);

                _logger.LogError($"Recognizer response with code: {response.StatusCode}");

                throw new RecognizerException("Błąd rozpoznawania")
;
            }
        }
    }
}
