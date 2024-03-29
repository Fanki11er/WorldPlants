﻿using Newtonsoft.Json;
using System.Security.Principal;

namespace WorldPlants.Models.PlantsModels
{
    public class RawPlantDetailsData
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("common_name")]
        public string? CommonName { get; set; }

        [JsonProperty("scientific_name")]
        public string[] ScientificName { get; set; }

        [JsonProperty("other_name")]
        public string[] OtherName { get; set; }

        [JsonProperty("type")]
        public string? PlantType { get; set; }

        [JsonProperty("dimensions")]
        public RawPlantDetailsDimension? Dimensions { get; set; }

        [JsonProperty("cycle")]
        public string? LifeCycle { get; set; }

        [JsonProperty("watering")]
        public string? Watering { get; set; } 

        [JsonProperty("watering_period")]
        public string? WateringPeriod { get; set; }

        [JsonProperty("watering_general_benchmark")]
        public PlantDetailsWateringGeneralBenchmark? RawPlantDetailsWateringGeneralBenchmark { get; set; }

        [JsonProperty("sunlight")]
        public string[] Sunlight { get; set; }

        [JsonProperty("pruning_month")]
        public string[] PruningMonth { get; set; }

        [JsonProperty("pruning_count")]
        public object? PruningCount { get; set; }


        [JsonProperty("growth_rate")]
        public string? GrowthRate { get; set; }

        [JsonProperty("care_level")]
        public string? CareLevel { get; set; }

        [JsonProperty("flowering_seson")]
        public string? FloweringSeason { get; set;}

        [JsonProperty("harvest_season")]
        public string? HarvestSeason { get; set;}

        [JsonProperty("description")]
        public string? Description { get; set; }

        [JsonProperty("poisonous_to_humans")]
        public int? PoisonousToHumans { get; set; }

        [JsonProperty("poisonous_to_pets")]
        public int? PoisonousToPets { get; set; }

        [JsonProperty("fruits")]
        public bool? Fruits { get; set; }

        [JsonProperty("edible_fruit")]
        public bool? EdibleFruits { get; set; }

        [JsonProperty("drought_tolerant")]
        public bool? DroughtTolerant { get; set; }

        [JsonProperty("invasive")]
        public bool? Invasive { get; set; }

        [JsonProperty("indoor")]
        public bool? Indoor { get; set; }

        [JsonProperty("default_image")]
        public RawPlantDetailsImage? Image { get; set; }
    }

    public class RawPlantDetailsDimension
    {
        [JsonProperty("min_value")]
        public float? MinValue { get; set; }
        [JsonProperty("max_value")]
        public float? MaxValue { get; set; }
    }

    public class PlantDetailsWateringGeneralBenchmark
    {
        [JsonProperty("value")]
        public string? Value { get; set; }
        [JsonProperty("unit")]
        public string? Unit { get; set; }
    }

    public class RawPlantDetailsImage
    {
        [JsonProperty("original_url")]
        public string? OriginalUrl { get; set; }
    }

    public class RawPlantDetailsPruningCount
    {
        [JsonProperty("amount")]
        public int? Amount { get; set; }
        [JsonProperty("interval")]
        public string? Interval { get; set; }
    }
}
