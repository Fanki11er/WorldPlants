using System;
using WorldPlants.Entities;

namespace WorldPlantsIntergrationTests.Helpers
{
    public static class TestUserGenerator
    {
       public static  User GenerateTestUser()
        {
            User testUser = new User()
            {
                Id = new Guid("11111111-1111-1111-1111-111111111111"),
                Email = "test@test.pl",
                Password = "Test",
                PhoneNumber = "456345678",
                Name = "Test",
                IsActive = true,
                AccountType = "Owner",
                UserSettings = new UserSettings(),
                Space = new Space()
                {
                    Id = new Guid("11111111-1111-1111-1111-111111111111")
                }
            };
            return testUser;
        }
      

    }
}
