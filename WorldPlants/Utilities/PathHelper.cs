// Ignore Spelling: Accessor

namespace WorldPlants.Utilities
{
    public interface IPathHelper
    {
        public string GetHostUrl();
        public string GetClientUrl();
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

        public string GetClientUrl()
        {
            var splitedHostUrl = _httpContextAccessor.HttpContext?.Request.Host.ToString().Split(":");

            string clientUrl = $"{_httpContextAccessor.HttpContext?.Request.Scheme}://{splitedHostUrl?[0]}:5173"; //!! Change port on production

            return clientUrl;

        }
    }
}
