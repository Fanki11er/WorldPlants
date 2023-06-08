using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http;
using WorldPlants.Utils;
using Xunit;

namespace WorldPlantsIntergrationTests
{
    public class AccountControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public AccountControllerTests(WebApplicationFactory<Program> factory)
        {
            _client = new FakeHttpClient(factory).fakeHttpClient;
        }
    }

}
