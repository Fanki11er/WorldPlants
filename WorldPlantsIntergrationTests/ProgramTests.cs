using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace WorldPlantsIntergrationTests
{
    public class ProgramTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;
        private readonly List<Type> _controllerTypes;

        public ProgramTests(WebApplicationFactory<Program> factory)
        {

             _controllerTypes = typeof(Program).Assembly.GetTypes()
                .Where(t => t.IsSubclassOf(typeof(Controller)))
                .ToList();

            _factory = factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    _controllerTypes.ForEach(ct => services.AddScoped(ct));
                });
            });
        }
        [Fact]
        public void ConfigureServices_for_controllers_registered_all_dependences()
        {
            var scopeFactory = _factory.Services.GetService<IServiceScopeFactory>();
            var scope = scopeFactory.CreateScope();

            _controllerTypes.ForEach(t =>
            {
                var controller = scope.ServiceProvider.GetService(t);
                controller.Should().NotBeNull();
            });
        }
    }
}
