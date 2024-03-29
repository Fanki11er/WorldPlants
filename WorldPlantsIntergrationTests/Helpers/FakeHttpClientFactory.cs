﻿using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Net.Http;
using WorldPlants.Entities;
using WorldPlants.Services;
using WorldPlantsIntergrationTests.Helpers;

namespace WorldPlants.Utils
{
    public class FakeHttpClient
    {
        public WebApplicationFactory<Program> factory { get; }
        public HttpClient _fakeClient { get; }

        public WorldPlantsDbContext _dbContext { get; }
        public FakeHttpClient(WebApplicationFactory<Program> webApplicationFactory)
        {
            factory = webApplicationFactory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    var dbContextOptions = services.
                      SingleOrDefault(services => services.ServiceType == typeof(DbContextOptions<WorldPlantsDbContext>));

                    services.Remove(dbContextOptions!);

                    services.AddDbContext<WorldPlantsDbContext>(options => options.UseInMemoryDatabase("WorldPlantsTestDb"));

                    services.AddSingleton<IPolicyEvaluator, FakePolicyEvaluator>();

                    services.AddMvc(options => options.Filters.Add(new FakeUserFilter()));

                });
            });

            _fakeClient = factory.CreateClient();

            var scopeFactory = factory.Services.GetService<IServiceScopeFactory>();
            var scope = scopeFactory.CreateScope();
            _dbContext =scope.ServiceProvider.GetService<WorldPlantsDbContext>();
           
        }
    }
}

