namespace WorldPlants.Models.PlantsModels
{
    public class MovePlantInformationDTO
    {
        public string PlantId { get; set; }
        public SiteWithIdAndNameDto CurrentSite { get; set; }
        public List<SiteWithIdAndNameDto> AvailableSites { get; set; } = new List<SiteWithIdAndNameDto>();
    }
}
