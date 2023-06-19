using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Net.Http;
using WorldPlants.Entities;
using WorldPlantsIntergrationTests.Helpers;

namespace WorldPlants.Utils
{
    public class FakeHttpClient
    {
        public HttpClient fakeHttpClient { get; }
        public FakeHttpClient(WebApplicationFactory<Program> factory)
        {
            fakeHttpClient = factory.WithWebHostBuilder(builder =>
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
            })
           .CreateClient();
        }
    }
}

