namespace WorldPlants.Models.PlantsModels
{
    public class PlantHeaderInformationDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string UserSiteName { get; set; }
        public string UserSiteId { get; set; }
        public string? AdditionalDescription { get; set; }
        public string? ImageUrl { get; set; }
    }
}
