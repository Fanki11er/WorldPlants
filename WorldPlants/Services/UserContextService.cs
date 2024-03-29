﻿using System.Security.Claims;

namespace WorldPlants.Services
{
    public interface IUserContextService
    {
        string? GetSpaceId { get; }
        string? GetUserId { get; }
        string? GetUserEmail { get; }
        ClaimsPrincipal? User { get; }
    }

    public class UserContextService : IUserContextService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserContextService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public ClaimsPrincipal? User => _httpContextAccessor.HttpContext?.User;
        public string? GetUserId => User?.FindFirstValue(ClaimTypes.NameIdentifier);
        public string? GetSpaceId => User?.FindFirstValue("SpaceIdentifier");
        public string? GetUserEmail => User?.FindFirstValue(ClaimTypes.Email);

    }
}
