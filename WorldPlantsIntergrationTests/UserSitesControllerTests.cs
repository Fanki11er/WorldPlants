using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using WorldPlants.Models;
using WorldPlants.Utils;
using Xunit;

namespace WorldPlantsIntergrationTests
{
    public class UserSitesControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public UserSitesControllerTests(WebApplicationFactory<Program> factory)
        {
            _client = new FakeHttpClient(factory).fakeHttpClient;
        }

        [Fact]
        public async Task AddNewUserSite_with_valid_model_returns_status_200()
        {
            var model = new NewUserSiteDto()
            {
                DefaultSiteId = 1,
                SunExposureId = 1,
                Name = "Test",
            };
            
            var json = JsonConvert.SerializeObject(model);

            var httpContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");

            var response = await _client.PostAsync("/UserSites/Add", httpContent);

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
            response.Headers.Location.Should().NotBeNull();

        }
    }
}
