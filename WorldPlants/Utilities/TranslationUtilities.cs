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
        //public string TranslateActionTypeEnum(ActionType actionType);
        public string TranslatePartOfTheDayEnum(PartOfTheDay partOfTheDay);
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
                {
                    "shade", SunScale.Low.ToString()
                },
                {
                    "full shade", SunScale.Low.ToString()
                },

                // Watering

                {
                    "average",  WateringScale.High.ToString()
                },

                {
                    "frequent", WateringScale.Medium.ToString()
                },

                {
                    "minimal", WateringScale.Low.ToString()
                },

                {
                    "minimum", WateringScale.Low.ToString()
                },

                // Cycle

                {
                    "herbaceous perennial", "Roślina wieloletnia"
                },

                {
                    "perennial",  "Roślina wieloletnia"
                },

                // PlantType

                {
                    "fruit", "Krzew owocowy"
                },

                {
                    "tree", "Drzewo"
                },

                {
                    "herb", "Zioło"
                },

                {
                    "ornamental grass", "Trawa ozdobna"
                },

                {
                    "flower", "Kwiat"
                },

                {
                    "broadleaf evergreen", "Liściasta, wiecznie zielona"
                },

                {
                    "needled evergreen", "Iglaste, wiecznie zielone"
                },

                {
                    "deciduous shrub", "Krzew liściasty"
                },

                {
                    "indoor foliage plant, succulent or cacti", "Kaktus"
                },

                {
                    "flowering pot plant, succulent or cacti", "Kaktus"
                },

                {
                    "epiphyte", "Kaktus"
                },

                {
                    "orchid", "Orchidea"
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
                    "january", "Styczeń"
                },

                {
                    "february", "Luty"
                },

                {
                    "march", "Marzec"
                },

                {
                    "april", "Kwiecień"
                },

                {
                    "may", "Maj"
                },

                {
                    "june", "Czerwiec"
                },

                {
                    "july", "Lipiec"
                },

                {
                    "august", "Sierpień"
                },

                {
                    "september", "Wrzesień"
                },

                {
                    "october", "Październik"
                },

                {
                    "november","Listopad"
                },

                {
                    "december","Grudzień"
                },

                {
                    "yearly", "w roku"
                },

                // CareLevel / GrowRate
                {
                    "low", "Mały"
                },

                {
                    "medium", "Średni"
                },

                {
                    "moderate", "Umiarkowany"
                },

                {
                    "high", "Duży"
                },

                // Seasons

                {
                    "fall", "Jeśień"
                },

                {
                    "winter", "Zima"
                },

                {
                    "spring", "Wiosna"
                },

                {
                    "summer", "Lato"
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
                var result = _propertiesTranslations[property.ToLower()];

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

            if(properties == null)
            {
                return results;
            }

            foreach (string property in properties)
            {
                try
                {
                    var result = _propertiesTranslations[property.ToLower()];

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

        /*public string TranslateActionTypeEnum(ActionType actionType)
        {
            switch (actionType)
            {
                case ActionType.Water:
                    {
                        return "Podlewanie";
                    }
                case ActionType.Fertilize:
                    {
                        return "Nawożenie";
                    }
                case ActionType.Cut:
                    {
                        return "Przycinanie";
                    }
                case ActionType.Mist:
                    {
                        return "Zwilżanie";
                    }
                case ActionType.Replant:
                    {
                        return "Przesadzanie";
                    }
                default:
                    {
                        return "Użytkownika";
                    }
            }
        }*/

        public string TranslatePartOfTheDayEnum(PartOfTheDay partOfTheDay)
        {
            switch (partOfTheDay)
            {
                case PartOfTheDay.night:
                    {
                        return "Wieczór";
                    }
                default:
                    {
                        return "Rano";
                    }
            }
        }

    }
}
