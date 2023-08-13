using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using WorldPlants.Entities;
using WorldPlants.Enums;
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
        private readonly DbCleaner _dbCleaner;
        private readonly ValidUserFactory _validUserFactory;

        public UserSitesControllerTests(WebApplicationFactory<Program> factory)
        {

            _clientFactory = new FakeHttpClient(factory);
            _client = _clientFactory._fakeClient;
            _dbContext = _clientFactory._dbContext;
            _dbCleaner = new DbCleaner();
            _validUserFactory = new ValidUserFactory();

        }
       /* [Fact]
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

        }*/

        [Fact]
        public async Task AddNewUserSite_with_valid_model_returns_status_OK()
        {
            _dbCleaner.ClearDatabase(_dbContext);

            var testsunExposure = new SunExposure()
            {
                Name = "Test",
                Description = "Test",
                SunScale = SunScale.Low,
                ForSiteType = Locations.Indoor
            };

            _dbContext.Add(testsunExposure);
            _dbContext.SaveChanges();

            var model = new NewUserSiteDto()
            {
                DefaultSiteId = 1,
                SunExposureId = testsunExposure.Id,
                Name = "Test",
            };

            var testUser = _validUserFactory.MakeCorrectTestUser(new Guid("11111111-1111-1111-1111-111111111111"));

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

        [Fact]
        public async Task Delete_user_site_when_plants_are_present_should_return_BadRequest()
        {

            _dbCleaner.ClearDatabase(_dbContext);

            var testUser = _validUserFactory.MakeCorrectTestUser(new Guid("11111111-1111-1111-1111-111111111111"));

            _dbContext.Add(testUser);
            _dbContext.SaveChanges();

            var testUserSpaceId = testUser.SpaceId; 

            var testSite = _validUserFactory.MakeValidUserSideWithPlants(testUserSpaceId);

           
            _dbContext.Add(testSite);
            _dbContext.SaveChanges();

            var siteId = testSite.Id;

        
            var response = await _client.DeleteAsync($"/UserSites/Delete/{siteId}");
            var responseContent = await response.Content.ReadAsStringAsync();

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.BadRequest);
            responseContent.Should().Be("Nie możesz usunąć przestrzeni jeśli znajdują się w niej rośliny");

            

        }
        
        [Fact]
        public async Task Delete_user_site_that_not_belong_to_user_should_return_Forbiden()
        {
            _dbCleaner.ClearDatabase(_dbContext);

            var testUser = _validUserFactory.MakeCorrectTestUser(new Guid("11111111-1111-1111-1111-111111111112"));

            _dbContext.Add(testUser);
            _dbContext.SaveChanges();

            var testUserSpaceId = testUser.SpaceId;

            var testSite = _validUserFactory.MakeValidUserSideWithPlants(testUserSpaceId);


            _dbContext.Add(testSite);
            _dbContext.SaveChanges();

            var siteId = testSite.Id;


            var response = await _client.DeleteAsync($"/UserSites/Delete/{siteId}");
            var responseContent = await response.Content.ReadAsStringAsync();

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.Forbidden);
            responseContent.Should().Be("Nie jesteś właścicielem przestrzeni o podanym id");

            

        }

        [Fact]
        public async Task Delete_user_site_when_it_not_exists_should_return_NotFound()
        {
            var response = await _client.DeleteAsync($"/UserSites/Delete/{999}");
            var responseContent = await response.Content.ReadAsStringAsync();

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
            responseContent.Should().Be("Nie odnaleziono przestrzeni o podanym id");
        }

        [Fact]
        public async Task Delete_user_site_shold_return_NoContent()
        {
            _dbCleaner.ClearDatabase(_dbContext);

            var testUser = _validUserFactory.MakeCorrectTestUser(new Guid("11111111-1111-1111-1111-111111111111"));


            _dbContext.Add(testUser);
            _dbContext.SaveChanges();

            var testUserSpaceId = testUser.SpaceId;

            var testSite = _validUserFactory.MakeValidUserSiteWithNoPlants(testUserSpaceId);


            _dbContext.Add(testSite);
            _dbContext.SaveChanges();

            var siteId = testSite.Id;


            var response = await _client.DeleteAsync($"/UserSites/Delete/{siteId}");
            var userSitesCount = _dbContext.UserSites.Where(s => s.SpaceId.ToString() == "11111111-1111-1111-1111-111111111111").Count();

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NoContent);
            userSitesCount.Should().Be(0);

        }

        [Fact]
        public async Task Edit_site_editing_site_in_proper_way()
        {
            _dbCleaner.ClearDatabase(_dbContext);

            var testSunExposure = _validUserFactory.MakeValidSunExposure(3);

            _dbContext.Add(testSunExposure);
            _dbContext.SaveChanges();

            var testUser = _validUserFactory.MakeCorrectTestUser(new Guid("11111111-1111-1111-1111-111111111111"));

            _dbContext.Add(testUser);
            _dbContext.SaveChanges();

            var testUserSpaceId = testUser.SpaceId;

            var testSite = _validUserFactory.MakeValidUserSideWithPlants(testUserSpaceId);


            _dbContext.Add(testSite);
            _dbContext.SaveChanges();


            var model = new EditUserSiteDto()
            {
                Id = testSite.Id,
                Name = "Test Site",
                ColdPeriodMinTemperature = 5,
                ColdPeriodMaxTemperature = 10,
                WarmPeriodMaxTemperature = 35,
                WarmPeriodMinTemperature = 20,
                SunExposureId = 3
            };

            var httpContent = model.ToJsonHttpContent();

            var response = await _client.PostAsync("/UserSites/Edit", httpContent);
            var updatedTestSite = _dbContext.UserSites.FirstOrDefault(s => s.Id == testSite.Id);


            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);

           

            updatedTestSite.Name.Should().Be(model.Name);
            updatedTestSite.ColdPeriodMinTemperature.Should().Be(model.ColdPeriodMinTemperature);
            updatedTestSite.ColdPeriodMaxTemperature.Should().Be(model.ColdPeriodMaxTemperature);
            updatedTestSite.WarmPeriodMinTemperature.Should().Be(model.WarmPeriodMinTemperature);
            updatedTestSite.WarmPeriodMaxTemperature.Should().Be(model.ColdPeriodMaxTemperature);
            updatedTestSite.SunExposureId.Should().Be(model.SunExposureId);


        }

        [Fact]
        public async Task Edit_not_existing_site_throws_NotFound()
        {
            _dbCleaner.ClearDatabase(_dbContext);

            var testSunExposure = _validUserFactory.MakeValidSunExposure(3);

            _dbContext.Add(testSunExposure);
            _dbContext.SaveChanges();

            var testUser = _validUserFactory.MakeCorrectTestUser(new Guid("11111111-1111-1111-1111-111111111112"));

            _dbContext.Add(testUser);
            _dbContext.SaveChanges();

            var testUserSpaceId = testUser.SpaceId;

            var testSite = _validUserFactory.MakeValidUserSideWithPlants(testUserSpaceId);


            _dbContext.Add(testSite);
            _dbContext.SaveChanges();

            var model = new EditUserSiteDto()
            {
                Id = 999,
                Name = "Test Site",
                ColdPeriodMinTemperature = 5,
                ColdPeriodMaxTemperature = 10,
                WarmPeriodMaxTemperature = 35,
                WarmPeriodMinTemperature = 20,
                SunExposureId = 3
            };

            var httpContent = model.ToJsonHttpContent();

            var response = await _client.PostAsync("/UserSites/Edit", httpContent);
            var responseContent = await response.Content.ReadAsStringAsync();

            responseContent.Should().Be("Nie odnaleziono przestrzeni o podanym id");
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        }


        [Fact]
        public async Task Edit_not_user_site_throws_NotFound()
        {
            _dbCleaner.ClearDatabase(_dbContext);

            var testSunExposure = _validUserFactory.MakeValidSunExposure(3);

            _dbContext.Add(testSunExposure);
            _dbContext.SaveChanges();

            var testUser1 = _validUserFactory.MakeCorrectTestUser(new Guid("11111111-1111-1111-1111-111111111111"));
            var testUser2 = _validUserFactory.MakeCorrectTestUser(new Guid("11111111-1111-1111-1111-111111111112"));

            _dbContext.Add(testUser1);
            _dbContext.Add(testUser2);
            _dbContext.SaveChanges();

            var testUserSpaceId1 = testUser1.SpaceId;
            var testUserSpaceId2 = testUser2.SpaceId;

            var testSite1 = _validUserFactory.MakeValidUserSideWithPlants(testUserSpaceId1);
            var testSite2 = _validUserFactory.MakeValidUserSideWithPlants(testUserSpaceId2);


            _dbContext.Add(testSite1);
            _dbContext.Add(testSite2);

            _dbContext.SaveChanges();

            var siteId2 = testSite2.Id;

            var model = new EditUserSiteDto()
            {
                Id = siteId2,
                Name = "Test Site",
                ColdPeriodMinTemperature = 5,
                ColdPeriodMaxTemperature = 10,
                WarmPeriodMaxTemperature = 35,
                WarmPeriodMinTemperature = 20,
                SunExposureId = 3
            };

            var httpContent = model.ToJsonHttpContent();

            var response = await _client.PostAsync("/UserSites/Edit", httpContent);
            var responseContent = await response.Content.ReadAsStringAsync();

            responseContent.Should().Be("Nie jesteś właścicielem przestrzeni o podanym id");
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.Forbidden);
        }
    }
}
