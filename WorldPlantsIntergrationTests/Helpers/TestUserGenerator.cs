using System;
using WorldPlants.Entities;

namespace WorldPlantsIntergrationTests.Helpers
{
    public class TestUserGenerator
    {
       public  User GenerateTestUser(Guid userId)
        {
            User testUser = new User()
            {
                Id = userId,
                Email = "test@test.pl",
                Password = "Test",
                PhoneNumber = "456345678",
                Name = "Test",
                IsActive = true,
                AccountType = "Owner",
                UserSettings = new UserSettings()
                {
                    UserId = userId,
                },
                Space = new Space()
                {
                    Id = userId
                }
            };
            return testUser;
        }
      

    }
}
