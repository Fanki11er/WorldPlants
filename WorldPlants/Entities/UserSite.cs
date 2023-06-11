namespace WorldPlants.Entities
{
    public class UserSite: DefaultSite
    {
        public SunExposure SunExposure { get; set; }
        public  Guid UserSpaceId { get; set; }
        public Space Space { get; set; }
        public IEnumerable<Plant> Plants { get; set; }


    }
}
