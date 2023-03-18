using Microsoft.AspNetCore.Mvc;

namespace WorldPlants.Controllers
{
    [ApiController]
    [Route("recognizer")]
    public class RecognizerController : Controller
    {

        [HttpPost]
        public async Task<IActionResult> UploadImage(IFormFile image)
        {
            var hash = Guid.NewGuid().ToString();
            var filePath = Path.Combine(Directory.GetCurrentDirectory(),
                @"Store/Images", hash + "_" + image.FileName);
            using (FileStream fs = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(fs);
            }

            return PhysicalFile(filePath, "image/png");
        }
    }

    /*
     A simple way to make HTTP-Request out of a .NET-Application is the System.Net.Http.HttpClient (MSDN). An example usage would look something like this:
     // Should be a static readonly field/property, wich is only instanciated once
var client = new HttpClient();

var requestData = new Dictionary<string, string>
{  
    { "field1", "Some data of the field" },
    { "field2", "Even more data" }
};

var request = new HttpRequestMessage() {
    RequestUri = new Uri("https://domain.top/route"),
    Method = HttpMethod.Post,
    Content = new FormUrlEncodedContent(requestData)
};

request.Headers // Add or modify headers

var response = await client.SendAsync(request);

// To read the response as string
var responseString = await response.Content.ReadAsStringAsync();

// To read the response as json
var responseJson = await response.Content.ReadAsAsync<ResponseObject>();
     */
}
