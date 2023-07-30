using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Threading.Tasks;
using WorldPlants.Services;
using Xunit;

namespace WorldPlantsIntergrationTests
{
    public class UserContextServiceTests : IClassFixture<WebApplicationFactory<Program>>
    {

        public UserContextServiceTests(WebApplicationFactory<Program> factory)
        {
          
        }

        /*z[Fact]
        public void Get_authenticated_user_properties_from_claims()
        {
            var userId = _userContextService.GetUserId;

            userId.Should().Be("11111111-1111-1111-1111-111111111111");

        }*/
    }
}
