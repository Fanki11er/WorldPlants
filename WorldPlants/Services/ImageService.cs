using WorldPlants.Exceptions;
using WorldPlants.Utilities;

namespace WorldPlants.Services
{
    
    public interface IImageService
    {
        public Task<string> SaveImageOnServer(IFormFile image);
        public Task<string?> SaveImageFromApiOnServer(string url);
        public string CheckFileExtension(string path);
        public string? GetImageUrl(string? imageName);
        public void DeleteImage(string? imageName);
    }
    public class ImageService: IImageService
    {

        private readonly IPathHelper _pathHelper;
        private readonly ILogger<ImageService> _logger;

        public ImageService(
            IPathHelper pathHelper,
            ILogger<ImageService> logger
            )
        {
            _pathHelper = pathHelper;
            _logger = logger;
        }

        public async Task<string> SaveImageOnServer(IFormFile image)
        {
            var fileName = CreateImageName(image.FileName);

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), @"Store/Images", fileName);

            using (FileStream fs = new(filePath, FileMode.Create))
            {
                await image.CopyToAsync(fs);
            }

            return fileName;
        }

        public void DeleteImage(string? imageName)
        {
            if (imageName != null)
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), @"Store/Images", imageName);

                try
                {
                    File.Delete(filePath);
                }catch{
                    _logger.LogError($"Cant delete image: {imageName}");
                }
            }
            
        }

        public async Task<string?> SaveImageFromApiOnServer(string url)
        {
            var httpClient = new HttpClient();

            var response = await httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {

                var fileName = CreateImageName(url);

                var filePath = Path.Combine(Directory.GetCurrentDirectory(), @"Store/Images", fileName);

                var contentStream = await response.Content.ReadAsStreamAsync();

                using var fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.None);

                await contentStream.CopyToAsync(fileStream);

                return fileName;
            }

            return null;
        }

        public string CheckFileExtension(string path) {

            var fileType = Path.GetExtension(path);

            var acceptedFileTypes = new[]
            {
                ".jpeg",
                ".jpg",
                ".png"
            };

            if(!acceptedFileTypes.Contains(fileType.ToLower()))
            {
                return $"Dopuszczalen rozszerzenia obrazów to {String.Join(", ", acceptedFileTypes)}";
            }

            return String.Empty;

        }

        public string GetImageUrl(string? imageName = "")
        {
            string hostPath = _pathHelper.GetHostUrl();

            string imageUrl = imageName!.Length > 0 ? $"{hostPath}/StaticFiles/Images/{imageName}" : "";

            return imageUrl;
        }

        private string? CreateImageName(string? path)
        {

            if(path == null)
            {
                return null;
            }

            var hash = Guid.NewGuid().ToString();

            var imageType = Path.GetExtension(path);

            var fileName = hash + "_" + imageType;

            return fileName;
        }
    }
}
