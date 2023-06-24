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

        [Fact]
        public async Task Delete_user_site_when_plants_are_present_should_return_BadRequest()
        {

            clear();

            var testUser = new User()
            {
                Id = new Guid("11111111-1111-1111-1111-111111111111"),
                Email = "test@test.pl",
                Password = "Test",
                PhoneNumber = "456345678",
                Name = "Test",
                IsActive = true,
                AccountType = "Owner",
                UserSettings = new UserSettings(),
                Space = new Space()
                {
                    Id = new Guid("11111111-1111-1111-1111-111111111111")
                }
            };

            _dbContext.Add(testUser);
            _dbContext.SaveChanges();

            var testUserSpaceId = testUser.SpaceId; 

            var testSite = new UserSite()
            {
                Name = "Test",
                Location = Locations.Indor,
                WarmPeriodMinTemperature = 1,
                WarmPeriodMaxTemperature = 2,
                ColdPeriodMinTemperature = 1,
                ColdPeriodMaxTemperature = 2,
                HasRoof = true,
                CanChangeHasRoof = false,
                SunExposure = new SunExposure()
                {
                    Name = "Test",
                    Description = "Test",
                },
                SpaceId = testUserSpaceId,
                Plants = new List<Plant>()
                {
                    new Plant()
                    {
                        Name = "Test1"
                    },
                    new Plant()
                    {
                        Name = "Test2"
                    },
                } 

            };

           
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
            clear();

            var testUser = MakeCorrectTestUser();

            _dbContext.Add(testUser);
            _dbContext.SaveChanges();

            var testSite = new UserSite()
            {
                Name = "Test",
                Location = Locations.Indor,
                WarmPeriodMinTemperature = 1,
                WarmPeriodMaxTemperature = 2,
                ColdPeriodMinTemperature = 1,
                ColdPeriodMaxTemperature = 2,
                HasRoof = true,
                CanChangeHasRoof = false,
                SunExposure = new SunExposure()
                {
                    Name = "Test",
                    Description = "Test",
                },
                SpaceId = new Guid("21111111-1111-1111-1111-111111111111"),
                Plants = new List<Plant>()
                {
                    new Plant()
                    {
                        Name = "Test1"
                    },
                    new Plant()
                    {
                        Name = "Test2"
                    },
                }

            };


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
            clear();

            var testUser = MakeCorrectTestUser();


            _dbContext.Add(testUser);
            _dbContext.SaveChanges();

            var testUserSpaceId = testUser.SpaceId;

            var testSite = new UserSite()
            {
                Name = "Test",
                Location = Locations.Indor,
                WarmPeriodMinTemperature = 1,
                WarmPeriodMaxTemperature = 2,
                ColdPeriodMinTemperature = 1,
                ColdPeriodMaxTemperature = 2,
                HasRoof = true,
                CanChangeHasRoof = false,
                SunExposure = new SunExposure()
                {
                    Name = "Test",
                    Description = "Test",
                },
                SpaceId = testUserSpaceId,
                Plants = new List<Plant>()
            };


            _dbContext.Add(testSite);
            _dbContext.SaveChanges();

            var siteId = testSite.Id;


            var response = await _client.DeleteAsync($"/UserSites/Delete/{siteId}");
            var userSitesCount = _dbContext.UserSites.Where(s => s.SpaceId.ToString() == "11111111-1111-1111-1111-111111111111").Count();

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NoContent);
            userSitesCount.Should().Be(0);

        }

        private User MakeCorrectTestUser()
        {
           
            var testUser = new User()
            {
                Id = new Guid("11111111-1111-1111-1111-111111111111"),
                Email = "test@test.pl",
                Password = "Test",
                PhoneNumber = "456345678",
                Name = "Test",
                IsActive = true,
                AccountType = "Owner",
                UserSettings = new UserSettings(),
                Space = new Space()
                {
                    Id = new Guid("11111111-1111-1111-1111-111111111111")
                }
            };

            return testUser;
        }

       private void clear()
        {
            var usres = _dbContext.Users;
            var spaces = _dbContext.Spaces ;
            var sites = _dbContext.UserSites;
            /*foreach ( var user in usres )
            {
                _dbContext.Spaces.Remove(user.Space);
            }*/
            _dbContext.Users.RemoveRange(usres);
            _dbContext.Spaces.RemoveRange(spaces);
            _dbContext.UserSites.RemoveRange(sites);
           // var count = usres.Count();
            _dbContext.SaveChanges();
            //var count2 = usres.Count();






        }
    }
}
