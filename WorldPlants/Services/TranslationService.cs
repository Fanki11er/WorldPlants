using DeepL;

namespace WorldPlants.Services
{

    public interface ITranslationService
    {
        public Task<string> TranslateInputToEnglish(string? input);
        public Task<string> TranslateInputToPolish(string? input);
    }
    public class TranslationService : ITranslationService
    {
        private readonly string _key;

        public TranslationService()
        {
            _key = Environment.GetEnvironmentVariable("DEEPLY_API_KEY") ?? "";
        }
        public async Task<string> TranslateInputToEnglish(string? input)
        {
            var translator = new Translator(_key);

            if(input == null)
            {
                return "";
            }

            var translatedText = await translator
                .TranslateTextAsync( input, LanguageCode.Polish, LanguageCode.EnglishBritish);

            return translatedText.Text;
        }

        public async Task<string> TranslateInputToPolish(string? input)
        {
            var translator = new Translator(_key);

            if (input == null)
            {
                return "";
            }

            var translatedText = await translator
                .TranslateTextAsync(input, LanguageCode.English, LanguageCode.Polish);

            return translatedText.Text;
        }

    }
}
