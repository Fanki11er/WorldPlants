using WorldPlants.Enums;
using WorldPlants.Models.PlantsModels;

namespace WorldPlants.Utilities
{

    public interface ITranslationUtilities
    {
        public PropertyWithInformation TransformStringProperty(string property);
        public List<PropertyWithInformation> TransformStringProperty(IEnumerable<string> properties);
    }
    public class TranslationUtilities : ITranslationUtilities
    {
        private readonly Dictionary<string, PropertyWithInformation> _propertiesWithInformatinsTranslations;
        private readonly ILogger<TranslationUtilities> _logger;


        public TranslationUtilities(ILogger<TranslationUtilities> logger)
        {
            _propertiesWithInformatinsTranslations = new Dictionary<string, PropertyWithInformation>
            {
                // Sun Exposures
                {
                    "full sun",  new PropertyWithInformation()
                    {
                        PropertyValue = SunScale.High.ToString(),
                        PropertyInformation = "Pełne słońce"
                    }
                },

                {
                    "part shade", new PropertyWithInformation()
                    {
                        PropertyValue = SunScale.Medium.ToString(),
                        PropertyInformation = "Częściowy cień"
                    }
                },

                {
                    "part sun/part shade",  new PropertyWithInformation()
                    {
                        PropertyValue = SunScale.Medium.ToString(),
                        PropertyInformation = "Częściowy cień"
                    }
                },

                {
                    "sheltered", new PropertyWithInformation()
                    {
                        PropertyValue = SunScale.Low.ToString(),
                        PropertyInformation = "Cień"
                    }
                },

                {
                    "filtered shade", new PropertyWithInformation()
                    {
                        PropertyValue = SunScale.Low.ToString(),
                        PropertyInformation = "Cień"
                    }

                },

                // Watering

                {
                    "Average", new PropertyWithInformation()
                    {
                        PropertyValue = WateringScale.High.ToString(),
                        PropertyInformation = "Duże"
                    }
                },

                {
                    "Frequent", new PropertyWithInformation()
                    {
                        PropertyValue = WateringScale.Medium.ToString(),
                        PropertyInformation = "Średnie"
                    }
                },

                {
                    "Minimal", new PropertyWithInformation()
                    {
                        PropertyValue = WateringScale.Low.ToString(),
                        PropertyInformation = "Małe"
                    }
                },
                // Plant types
                 {
                    "Fruit", new PropertyWithInformation()
                    {
                        PropertyValue = "Fruit",
                        PropertyInformation = "Owocowe"
                    }
                },

                {
                   "Tree", new PropertyWithInformation()
                   {
                        PropertyValue = "Tree",
                        PropertyInformation = "Drzewo"
                   }
                }
            };

            _logger = logger;
        }

        public PropertyWithInformation TransformStringProperty(string property)
        {
            var result = _propertiesWithInformatinsTranslations[property];
            _logger.LogInformation($"Translated: {property}");

            if (result == null)
            {
                _logger.LogInformation($"Missing translation for : {property}");

                return new PropertyWithInformation()
                {
                    PropertyValue = property,
                    PropertyInformation = property
                };
            }

            return result;
        }

        public List<PropertyWithInformation> TransformStringProperty(IEnumerable<string> properties)
        {
            var results = new List<PropertyWithInformation>();

            foreach (string property in properties)
            {
                var result = _propertiesWithInformatinsTranslations[property];

                if (result == null)
                {
                    _logger.LogInformation($"Missing translation for : {property}");

                    result = new PropertyWithInformation()
                    {
                        PropertyValue = property,
                        PropertyInformation = property
                    };
                }
                results.Add(result);
            }
            return results;
        }
        public float TransformDimensionProperty(RawPlantDetailsDimension dimension)
        {
            var average = (dimension.MaxValue + dimension.MinValue) / 2;

            var convertedToCentimeters = average * 30.48f;

            return convertedToCentimeters;
        }
    }



    public class PropertyWithInformation
    {
        public string PropertyValue { get; set; }
        public string PropertyInformation { get; set; }
    }
}
