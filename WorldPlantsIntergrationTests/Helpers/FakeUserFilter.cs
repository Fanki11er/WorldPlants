using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using WorldPlants.Enums;

namespace WorldPlantsIntergrationTests.Helpers
{
    public class FakeUserFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var claimsPrincipal = new ClaimsPrincipal();
            claimsPrincipal.AddIdentity(new ClaimsIdentity(
                new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, new Guid("11111111-1111-1111-1111-111111111111").ToString()),
                    new Claim(ClaimTypes.Role, UserRoles.Owner.ToString()),
                    new Claim("SpaceIdentifier", new Guid("11111111-1111-1111-1111-111111111111").ToString())
                }
                
            ));

            context.HttpContext.User = claimsPrincipal;

            await next();
        }
    }
}
