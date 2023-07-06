using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using WorldPlants.Entities;
using WorldPlants.Models;
using WorldPlants.Utils;
using WorldPlantsIntergrationTests.Helpers;
using Xunit;

namespace WorldPlantsIntergrationTests
{
    public class OwnerUserControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;
        private readonly FakeHttpClient _clientFactory;
        private readonly WorldPlantsDbContext _dbContext;
        private readonly DbCleaner _dbCleaner;
        private readonly ValidUserFactory _validUserFactory;


        private static IEnumerable<object[]> InvalidRegisterDtos()
        {
            yield return new object[] {
              new  RegisterUserDto(){
                   Name = "Kdz",
                   Email = "",
                   Password =  "qwertyui",
                   RepeatedPassword = "qwertyui",
                   PhoneNumber = "531358154"
                },
            };
            yield return new object[]
            {
                null
            };

        }

        private static IEnumerable<object[]> ValidRegisterDtos()
        {
            yield return new object[] {
              new  RegisterUserDto(){
                   Name = "Kdz",
                   Email = "kdz@kdz.pl",
                   Password =  "qwertyui",
                   RepeatedPassword = "qwertyui",
                   PhoneNumber = "531358154"
                },
            };
            yield return new object[]
            {
                 new  RegisterUserDto(){
                   Name = "Kdz",
                   Email = "kdz@kdz2.pl",
                   Password =  "qwertyui",
                   RepeatedPassword = "qwertyui",
                   PhoneNumber = null
                },
            };

        }

        public OwnerUserControllerTests(WebApplicationFactory<Program> factory)
        {
            

            _clientFactory = new FakeHttpClient(factory);
            _client = _clientFactory._fakeClient;
            _dbContext = _clientFactory._dbContext;
            _dbCleaner = new DbCleaner();
            _validUserFactory = new ValidUserFactory();
    }

        [Theory]
        [MemberData(nameof(InvalidRegisterDtos))]
        public async Task RegisterOwnerUser_withInvalidModel_throwException(RegisterUserDto dto)
        {
            _dbCleaner.ClearDatabase(_dbContext);

            var httpContext = dto.ToJsonHttpContent();
            var response = await _client.PostAsync("/Owner/Register", httpContext);
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.BadRequest);

        }

        [Theory]
        [MemberData(nameof(ValidRegisterDtos))]
        public async void RegisterOwnerUser_withValidModel_returns_OK(RegisterUserDto dto)
        {
            _dbCleaner.ClearDatabase(_dbContext);

            var httpContext = dto.ToJsonHttpContent();

            var response = await _client.PostAsync("/Owner/Register", httpContext);
            var usersCount = _dbContext.Users.Count();
            var userSpacesCount = _dbContext.Spaces.Count();
            var userSettingsCouunt = _dbContext.UserSettings.Count();

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
            usersCount.Should().Be(1);
            userSpacesCount.Should().Be(1);
            userSettingsCouunt.Should().Be(1);

        }

        [Fact]
        public async void Delete_OwnerUser_should_delete_all_connected_wiith_account_data()
        {
            _dbCleaner.ClearDatabase(_dbContext);

           User testUser =  _validUserFactory.MakeCorrectTestUser(new Guid("11111111-1111-1111-1111-111111111111"));
           User testUser2 = _validUserFactory.MakeCorrectTestUser(new Guid("11111111-1111-1111-1111-111111111112"));

            _dbContext.Users.Add(testUser);
            _dbContext.Users.Add(testUser2);
            _dbContext.SaveChanges();

           UserSite testSite =  _validUserFactory.MakeValidUserSideWithPlants(testUser.SpaceId);
           UserSite testSite2 = _validUserFactory.MakeValidUserSideWithPlants(testUser2.SpaceId);

            _dbContext.UserSites.Add(testSite);
            _dbContext.UserSites.Add(testSite2);
            _dbContext.SaveChanges();

            var response = await _client.DeleteAsync("/Owner");

            var usersCount = _dbContext.Users.Count();
            var userSpacesCount = _dbContext.Spaces.Count();
            var userSettingsCouunt = _dbContext.UserSettings.Count();
            var userPlantsCount = _dbContext.Plants.Count();

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.NoContent);

            userSpacesCount.Should().Be(1);
            usersCount.Should().Be(1);
            userSettingsCouunt.Should().Be(1);
            userPlantsCount.Should().Be(2);

           
        }

        // Make tests for deleting all items when delete owner account
    }
}
