// Ignore Spelling: Accessor

namespace WorldPlants.Utilities
{
    public interface IPathHelper
    {
        public string GetHostUrl();
    }
    public class PathHelper: IPathHelper
    {

        private readonly IHttpContextAccessor _httpContextAccessor;
        public PathHelper(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetHostUrl()
        {
            string myHostUrl = $"{_httpContextAccessor.HttpContext?.Request.Scheme}://{_httpContextAccessor.HttpContext?.Request.Host}";
            
            return myHostUrl;
        }
    }
}
