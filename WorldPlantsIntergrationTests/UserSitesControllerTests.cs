using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using WorldPlants.Entities;
using WorldPlants.Models;
using WorldPlants.Utils;
using WorldPlantsIntergrationTests.Helpers;
using Xunit;

namespace WorldPlantsIntergrationTests
{
    public class UserSitesControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;
        private readonly FakeHttpClient _clientFactory;
        private readonly WorldPlantsDbContext _dbContext;

        public UserSitesControllerTests(WebApplicationFactory<Program> factory)
        {

            _clientFactory = new FakeHttpClient(factory);
            _client = _clientFactory._fakeClient;
            _dbContext = _clientFactory._dbContext;

        }
        [Fact]
        public async Task AddNewUserSite_with_valid_model_and_not_existing_userSpace_returns_NotFound()
        {
            var model = new NewUserSiteDto()
            {
                DefaultSiteId = 1,
                SunExposureId = 1,
                Name = "Test",
            };


            var httpContent = model.ToJsonHttpContent();

            var response = await _client.PostAsync("/UserSites/Add", httpContent);

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);

        }

        [Fact]
        public async Task AddNewUserSite_with_valid_model_returns_status_OK()
        {
            var model = new NewUserSiteDto()
            {
                DefaultSiteId = 1,
                SunExposureId = 1,
                Name = "Test",
            };

            var testUser = TestUserGenerator.GenerateTestUser();

            _dbContext.Add(testUser);
            _dbContext.SaveChanges();

            var httpContent = model.ToJsonHttpContent();

            var response = await _client.PostAsync("/UserSites/Add", httpContent);

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);

        }
        [Fact]
        public async Task AddNewUserSite_with_not_valid_model_returns_badRequest()
        {
            var model = new NewUserSiteDto()
            {
                DefaultSiteId = 1,
                Name = "",
            };

            var httpContent = model.ToJsonHttpContent();

            var response = await _client.PostAsync("/UserSites/Add", httpContent);

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.BadRequest);
        }
    }
}
