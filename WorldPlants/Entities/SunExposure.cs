using WorldPlants.Enums;

namespace WorldPlants.Entities
{
    public class SunExposure
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Locations ForSiteType { get; set; }
        public SunScale SunScale { get; set; }


    }
}
