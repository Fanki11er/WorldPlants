using WorldPlants.Entities;

namespace WorldPlants.Exceptions
{
    public class UserSiteNotFoundException :Exception
    {
      
        public UserSiteNotFoundException(string message): base( message)
        {
            
        }
    }
}
