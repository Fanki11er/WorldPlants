using Newtonsoft.Json;

namespace WorldPlants.Models.PlantsModels
{
    public class RawPlantTipsDataDTO
    {

        [JsonProperty("data")]
        public  RawPlantTipsData[] Data { get; set; }
    }

    public class RawPlantTipsData
    {
        [JsonProperty("species_id")]
        public int SpeciesId { get; set; }

        [JsonProperty("section")]
        public RawPlantTipsDataDetails[] Section { get; set; }
    }

    public class RawPlantTipsDataDetails 
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }
    }
}
