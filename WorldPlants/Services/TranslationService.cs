using DeepL;

namespace WorldPlants.Services
{

    public interface ITranslationService
    {
        public Task<string> TranslateInput(string input);
    }
    public class TranslationService : ITranslationService
    {
        private readonly string _key;

        public TranslationService()
        {
            _key = Environment.GetEnvironmentVariable("DEEPLY_API_KEY") ?? "";
        }
        public async Task<string> TranslateInput(string input)
        {
            var translator = new Translator(_key);

            var translatedText = await translator
                .TranslateTextAsync( input, LanguageCode.Polish, LanguageCode.EnglishBritish);

            return translatedText.Text;
        }

    }
}
