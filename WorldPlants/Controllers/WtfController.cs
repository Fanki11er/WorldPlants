using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorldPlants.Services;

namespace WorldPlants.Controllers
{
    [Route("Test")]
    [ApiController]
    [AllowAnonymous]
    public class WtfController : Controller
    {
        private readonly IRemindersService _remindersService;
        public WtfController(IRemindersService remindersService)
        {
            _remindersService = remindersService;
        }

        [HttpGet]
        public async Task<ActionResult> TestReminders()
        {
            // await _remindersService.SendReminderEmails();
             await _remindersService.SendReminderSMS();

            return Ok();
        } 
    }
}


/* [HttpPost("GPT")]
 public async Task<ActionResult<string>> SearchForPlantUsingGPT(string searchPhrase)
 {
     var result = await _plantService.SearchForPlantUsingGPT(searchPhrase);

     return Ok(result);
 }
*/

//public Task<SearchPlantResults> SearchForPlant(string searchPhrase);
//public Task<string> SearchForPlantUsingGPT(string searchPhrase);

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