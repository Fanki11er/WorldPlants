using Sprache;
using WorldPlants.Enums;
using WorldPlants.Models.PlantsModels;

namespace WorldPlants.Utilities
{

    public interface ITranslationUtilities
    {
        public string TransformStringProperty(string? property);
        public List<string> TransformStringProperty(IEnumerable<string> properties);
        public float? TransformDimensionProperty(RawPlantDetailsDimension? dimension);
        public PlantDetailsWateringGeneralBenchmark? TransformGeneralWateringBenchmark(PlantDetailsWateringGeneralBenchmark? data);
    }
    public class TranslationUtilities : ITranslationUtilities
    {
        private readonly Dictionary<string, string> _propertiesTranslations;
        private readonly ILogger<TranslationUtilities> _logger;


        public TranslationUtilities(ILogger<TranslationUtilities> logger)
        {
            _propertiesTranslations = new Dictionary<string, string>
            {
                // Sun Exposures
                {
                    "full sun",  SunScale.High.ToString()
                },

                {
                    "part shade", SunScale.Medium.ToString()
                },

                {
                    "part sun/part shade", SunScale.Medium.ToString()
                },

                {
                    "sheltered", SunScale.Low.ToString()
                },

                {
                    "filtered shade", SunScale.Low.ToString()
                },

                // Watering

                {
                    "Average",  WateringScale.High.ToString()
                },

                {
                    "Frequent", WateringScale.Medium.ToString()
                },

                {
                    "Minimal", WateringScale.Low.ToString()
                },

                // Cycle

                {
                    "Herbaceous Perennial", "Perennial"
                },

                // Watering period

                {
                    "morning", "Morning"
                },

                // Units

                {
                    "days", "Days"
                }

            };

            _logger = logger;
        }

        public string TransformStringProperty(string? property)
        {
            if(property == null)
            {
                return "Brak informacji";
            }

            try
            {
                var result = _propertiesTranslations[property];

                return result;
            }
            catch (Exception)
            {
                _logger.LogInformation($"Missing translation for : {property}");

                return property;
            }

        }

        public List<string> TransformStringProperty(IEnumerable<string> properties)
        {
            var results = new List<string>();

            foreach (string property in properties)
            {
                try
                {
                    var result = _propertiesTranslations[property];

                    results.Add(result);
                }
                catch (Exception)
                {
                    _logger.LogInformation($"Missing translation for : {property}");

                    results.Add(property);
                }

            }

            return results;
        }
        public float? TransformDimensionProperty(RawPlantDetailsDimension? dimension)
        {
            if (dimension == null)
            {
                return null;
            }

            if (dimension!.MaxValue == null || dimension!.MinValue == null)
            {
                return null;
            }


            var average = (dimension.MaxValue + dimension.MinValue) / 2;

            var convertedToCentimeters = average * 30.48f;

            return convertedToCentimeters;
        }

        public PlantDetailsWateringGeneralBenchmark? TransformGeneralWateringBenchmark(PlantDetailsWateringGeneralBenchmark? data)
        {
            if(data == null)
            {
                return null;
            }

            if(data.Value == null || data.Unit == null)
            {
                return null;
            }

            data.Unit = TransformStringProperty(data.Unit);

            return data;
        }

        
    }



    /*public class PropertyWithInformation
    {
        public string PropertyValue { get; set; }
        public string PropertyInformation { get; set; }
    }*/
}
