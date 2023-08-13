using System;
using System.Collections.Generic;
using WorldPlants.Entities;
using WorldPlants.Enums;

namespace WorldPlantsIntergrationTests.Helpers
{
    public class ValidUserFactory
    {

        public  User MakeCorrectTestUser(Guid id)
        {

            var testUser = new User()
            {
                Id = id,
                Email = "test@test.pl",
                Password = "Test",
                PhoneNumber = "456345678",
                Name = "Test",
                IsActive = true,
                AccountType = "Owner",
                UserSettings = new UserSettings()
                {
                    UserId = id,
                },
                Space = new Space()
                {
                    Id = id,
                },
                SpaceId = id,
                
            };

            return testUser;
        }

        public  UserSite MakeValidUserSideWithPlants(Guid userSpaceId)
        {
            var testSite = new UserSite()
            {
                Name = "Test",
                Location = Locations.Indoor,
                WarmPeriodMinTemperature = 1,
                WarmPeriodMaxTemperature = 2,
                ColdPeriodMinTemperature = 1,
                ColdPeriodMaxTemperature = 2,
                HasRoof = true,
                CanChangeHasRoof = false,
                SunExposureId = 1,
                SpaceId = userSpaceId,
                Plants = new List<Plant>()
                {
                    new Plant()
                    {
                        Name = "Test1"
                    },
                    new Plant()
                    {
                        Name = "Test2"
                    },
                }

            };
            return testSite;
        }

        public  UserSite MakeValidUserSiteWithNoPlants(Guid spaceId)
        {
            var testSite = new UserSite()
            {
                Name = "Test",
                Location = Locations.Indoor,
                WarmPeriodMinTemperature = 1,
                WarmPeriodMaxTemperature = 2,
                ColdPeriodMinTemperature = 1,
                ColdPeriodMaxTemperature = 2,
                HasRoof = true,
                CanChangeHasRoof = false,
                SunExposureId = 1,
                SpaceId = spaceId,
                Plants = new List<Plant>()
            };

            return testSite;
        }

        public SunExposure MakeValidSunExposure(int Id)
        {
            var testSunExposure = new SunExposure()
            {
                Id = Id,
                Description = "Test",
                Name = "Test",
                ForSiteType = Locations.Indoor,
                SunScale = SunScale.Low
            };

            return testSunExposure;
        }
    }
}
