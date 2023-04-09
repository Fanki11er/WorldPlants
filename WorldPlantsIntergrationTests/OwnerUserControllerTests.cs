using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using WorldPlants.Entities;
using WorldPlants.Models;
using Xunit;

namespace WorldPlantsIntergrationTests
{
    public class OwnerUserControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        private static IEnumerable<object[]> InvalidRegisterDtos()
        {
            yield return new object[] {
              new  RegisterUserDto(){
                  Name = "Kdz",
                   Email = "",
                   Password =  "qwertyui",
                   RepeatedPassword = "qwertyui"
                },
            };
            yield return new object[]
            {
                null
            };

        }

        public OwnerUserControllerTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    var dbContextOptions = services.
                      SingleOrDefault(services => services.ServiceType == typeof(DbContextOptions<WorldPLantsDbContext>));

                    services.Remove(dbContextOptions!);

                    services.AddDbContext<WorldPLantsDbContext>(options => options.UseInMemoryDatabase("WorldPlantsTestDb"));
                });
            })
            .CreateClient();
        }

        [Theory]
        [MemberData(nameof(InvalidRegisterDtos))]
        public void RegisterOwnerUser_withInvalidModel_throwException(RegisterUserDto dto)
        {
            var json = JsonConvert.SerializeObject(dto);
            var httpContext = new StringContent(json, UnicodeEncoding.UTF8, "application/json");

            Assert.ThrowsAsync<Exception>(() => _client.PostAsync("/Owner/Register", httpContext));
        }
    }
}
