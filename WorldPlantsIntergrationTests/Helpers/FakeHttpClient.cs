using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Net.Http;
using WorldPlants.Entities;

namespace WorldPlants.Utils
{
    public class FakeHttpClient
    {
        public HttpClient FakeHttpClinet { get; }
        public FakeHttpClient(WebApplicationFactory<Program> factory)
        {
            FakeHttpClinet = factory.WithWebHostBuilder(builder =>
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
    }
}

