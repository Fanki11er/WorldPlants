using Microsoft.AspNetCore.Mvc;
using Microsoft.SqlServer.Server;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using WorldPlants.Exceptions;
using WorldPlants.Models;

namespace WorldPlants.Services
{
    public interface IRecognizerService
    {
        public Task<RecognizedPlantDto?> RecognizePlant(List<IFormFile> images);
        public Task<string?> RecognizeAndGetPlantAdditionalInformation(List<IFormFile> images);
    }


    public class RecognizerService : IRecognizerService
    {

        public async Task<RecognizedPlantDto?> RecognizePlant(List<IFormFile> images)
        {
            RecognizedPlantInformation? result = await RecognizePlantFromImages(images);

            if(result == null)
            {
                return null;
            }

            RecognizedPlantDto resultDto = ConvertRecognizedPlantInformationToDto(result);

            return resultDto;
        }

        public async Task<string?> RecognizeAndGetPlantAdditionalInformation(List<IFormFile> images)
        {
            RecognizedPlantInformation? result = await RecognizePlantFromImages(images);

            if (result == null)
            {
                return null;
            }

            var additionalPlantInformation = await GetAddidionalPlantIformation(result);

            return additionalPlantInformation;
        }


        private async Task<string?> GetAddidionalPlantIformation(RecognizedPlantInformation recognizedPlantInformation)
        {
            var key = Environment.GetEnvironmentVariable("PARENUAL_API_KEY");

            string spieceName = recognizedPlantInformation.Species.Genus.ScientificName;

            using var client = new HttpClient();

            var response = await client.GetAsync($"https://perenual.com/api/species-list?page=1&key={key}&q={spieceName}");

            return await response.Content.ReadAsStringAsync();
        }


        private RecognizedPlantDto ConvertRecognizedPlantInformationToDto( RecognizedPlantInformation recognizedPlantInformation)
        {
            RecognizedPlantDto dto = new()
            {
                PlantGenus = recognizedPlantInformation.Species.Genus.ScientificName,
                PlantFamily = recognizedPlantInformation.Species.Family.ScientificName,
                PlantScientificName = recognizedPlantInformation.Species.ScientificName
            };

            return dto;
        }



        private async Task<RecognizedPlantInformation?> RecognizePlantFromImages(List<IFormFile> images)
        {

            var key = Environment.GetEnvironmentVariable("PLANTNET_API_KEY");

            using var client = new HttpClient();


            var formData = new MultipartFormDataContent();

            foreach (var image in images)
            {
                var imageContent = new StreamContent(image.OpenReadStream());
                imageContent.Headers.ContentType = new MediaTypeHeaderValue(image.ContentType);
                formData.Add(imageContent, "images", image.FileName);
            }

            var response = await client.PostAsync($"https://my-api.plantnet.org/v2/identify/all?lang=pl&api-key={key}", formData);

            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine("Images uploaded successfully.");
                var content = await response.Content.ReadAsStringAsync();
                var recognizerResponse = new RecognizerResponse();

                JsonConvert.PopulateObject(content, recognizerResponse);

                if (recognizerResponse.Results.Length > 0)
                {
                    return recognizerResponse.Results[0];
                }
                else
                {
                    return null;
                }

            }
            else
            {
                Console.WriteLine(response.RequestMessage);
                throw new RecognizerException($"Recognizer response with code: ${response.StatusCode}")
;
            }
        }
    }
}
