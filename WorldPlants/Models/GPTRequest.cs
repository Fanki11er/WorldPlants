using Newtonsoft.Json;
using Newtonsoft.Json.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WorldPlants.Models
{
    public class GPTRequest
    {
        [JsonProperty("model")]
        public string Model { get; set; }
        [JsonProperty("messages")]
        public  MessageInJSON[] Messages { get; set; }
        [JsonProperty("functions")]
        public  GTPSearchFunction[] Functions { get; set; }
        [JsonProperty("max_tokens")]
        public int Max_tokens { get; set; }
        [JsonProperty("temperature")]
        public float Temperature { get; set; }

    }


    public class MessageInJSON
    {
        [JsonProperty("role")]
        public string Role { get; set; }
        [JsonProperty("content")]
        public string Content { get; set; }
    }

    public class GTPSearchFunction
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("parameters")]
        public JSchema Parameters { get; set; }
    }

    public class GTPSearchRequestSchema
    {
        public string CommonName { get; set; }
        public string ScientificName { get; set; }
        public string Description { get; set; }
        [Range(0, 10)]
        public int Light { get; set; }
        public int DieInTemp { get; set; }
        [Range(0, 10)]
        public int NeedsSoilNutrimentsLevel { get; set; }
        [Range(0, 10)]
        public int NeedsSoilHumidityLevel { get; set; }
        public int AverageHeight { get; set; }
        public string AverageHeightUnit { get; set; }
        [MinLength(1)]
        public bool Indoor { get; set; }
        public bool Outdoor { get; set; }
    }

    public class GTPGetDetailsSchema
    {
        [Range(0, 10)]
        public int Light { get; set; }
        public int DieInTemp { get; set; }
        [Range(0, 10)]
        public int NeedsSoilNutrimentsLevel { get; set; }
        [Range(0, 10)]
        public int NeedsSoilHumidityLevel { get; set; }
        public int AverageHeight { get; set; }
        [Required]
        public string AverageHeightUnit { get; set;}
        [MinLength(1)]
        public bool Indoor { get; set; }
        public bool Outdoor { get; set; }
    }
    
}



