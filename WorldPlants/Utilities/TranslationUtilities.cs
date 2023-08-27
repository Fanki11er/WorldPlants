using Newtonsoft.Json.Linq;
using WorldPlants.Enums;
using WorldPlants.Models.PlantsModels;

namespace WorldPlants.Utilities
{

    public interface ITranslationUtilities
    {
        public string? TransformStringProperty(string? property);
        public List<string> TransformStringProperty(IEnumerable<string> properties);
        public int? TransformDimensionProperty(RawPlantDetailsDimension? dimension);
        public PlantDetailsWateringGeneralBenchmark? TransformGeneralWateringBenchmark(PlantDetailsWateringGeneralBenchmark? data);
        public RawPlantDetailsPruningCount? TransformPruningCount(object? data);
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
                    "Herbaceous Perennial", "Roślina wieloletnia"
                },

                {
                    "Perennial",  "Roślina wieloletnia"
                },

                // PlantType

                {
                    "Fruit", "Krzew owocowy"
                },

                {
                    "Tree", "Drzewo"
                },
                                {
                    "tree", "Drzewo"
                },

                {
                    "Herb", "Zioło"
                },

                {
                    "Ornamental grass", "Trawa ozdobna"
                },

                {
                    "Flower", "Kwiat"
                },

                {
                    "Broadleaf evergreen", "Liściasta, wiecznie zielona"
                },

                {
                    "Needled evergreen", "Iglaste, wiecznie zielone"
                },

                {
                    "Deciduous shrub", "Krzew liściasty"
                },

                // Watering period

                {
                    "morning", "Rano"
                },

                {
                    "night", "Wieczór"
                },

                // Units

                {
                    "days", "Dni"
                },

                // Months

                {
                    "January", "Styczeń"
                },

                {
                    "February", "Luty"
                },

                {
                    "March", "Marzec"
                },

                {
                    "April", "Kwiecień"
                },

                {
                    "May", "Maj"
                },

                {
                    "June", "Czerwiec"
                },

                {
                    "July", "Lipiec"
                },

                {
                    "August", "Sierpień"
                },

                {
                    "September", "Wrzesień"
                },

                {
                    "October", "Październik"
                },

                {
                    "November","Listopad"
                },

                {
                    "December","Grudzień"
                },

                {
                    "yearly", "w roku"
                },

                // CareLevel / GrowRate
                {
                    "Low", "Mały"
                },

                {
                    "Medium", "Średni"
                },

                {
                    "Moderate", "Umiarkowany"
                },

                {
                    "High", "Duży"
                },

                // Seasons

                {
                    "Fall", "Jeśień"
                },

                {
                    "Winter", "Zima"
                },

                {
                    "Spring", "Wiosna"
                },

                {
                    "Summer", "Lato"
                }


            };

            _logger = logger;
        }

        public string? TransformStringProperty(string? property)
        {
            if (property == null)
            {
                return null;
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

                    if (!results.Contains(property))
                    {
                        results.Add(result);
                    }

                }
                catch (Exception)
                {
                    _logger.LogInformation($"Missing translation for : {property}");

                    results.Add(property);
                }

            }

            return results;
        }
        public int? TransformDimensionProperty(RawPlantDetailsDimension? dimension)
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

            return (int)convertedToCentimeters;
        }

        public PlantDetailsWateringGeneralBenchmark? TransformGeneralWateringBenchmark(PlantDetailsWateringGeneralBenchmark? data)
        {
            if (data == null)
            {
                return null;
            }

            if (data.Value == null || data.Unit == null)
            {
                return null;
            }

            data.Unit = TransformStringProperty(data.Unit);

            return data;
        }

        public RawPlantDetailsPruningCount? TransformPruningCount(object? data)
        {
            if (data == null)
            {
                return null;
            }

            if (data is JArray)
            {
                return null;
            }

            var jsonObject = (JObject)data;

            RawPlantDetailsPruningCount? castedData = jsonObject.ToObject<RawPlantDetailsPruningCount>();

            if (castedData == null || castedData.Interval == null || castedData.Amount == null)
            {
                return null;
            }

            castedData.Interval = TransformStringProperty(castedData.Interval);

            return castedData;
        }

    }
}
