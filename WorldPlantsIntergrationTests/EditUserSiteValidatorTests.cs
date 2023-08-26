// Ignore Spelling: Validator Dto

using FluentValidation.TestHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using WorldPlants.Entities;
using WorldPlants.Models;
using WorldPlants.Models.Validators;
using WorldPlantsIntergrationTests.Helpers;
using Xunit;

namespace WorldPlantsIntergrationTests
{
    public class EditUserSiteValidatorTests
    {
        private readonly WorldPlantsDbContext _dbContext;
        private readonly DbCleaner _dbCleaner;
        public EditUserSiteValidatorTests()
        {
            var builder = new DbContextOptionsBuilder<WorldPlantsDbContext>();
            builder.UseInMemoryDatabase( new Guid().ToString());
            _dbContext = new WorldPlantsDbContext(builder.Options);
            _dbCleaner = new DbCleaner();

            _dbCleaner.ClearDatabase(_dbContext);

            var testSunExposure = new SunExposure()
            {
                Id = 1,
                Name = "Test",
                Description = "Test",
            };

            var testUserSite = new UserSite()
            {
                Id = 1,
                Name = "Test",
                SunExposureId = 1,
                ColdPeriodMinTemperature = -5,
                ColdPeriodMaxTemperature = 0,
                WarmPeriodMinTemperature = 10,
                WarmPeriodMaxTemperature = 30,
                SpaceId = new Guid()
            };

            _dbContext.SunExposures.Add(testSunExposure);
            _dbContext.UserSites.Add(testUserSite);
            _dbContext.SaveChanges();
           
        }
       /* [Fact]
        public void Valid_dto_pass_validation()
        {
            EditUserSiteDto testDto = new EditUserSiteDto()
            {
                Id = 1,
                Name = "Test",
                SunExposureId = 1,
                ColdPeriodMinTemperature = -10,
                ColdPeriodMaxTemperature = 0,
                WarmPeriodMinTemperature = 15,
                WarmPeriodMaxTemperature = 30,
            };

            var validator = new EditUserSiteValidator(_dbContext);
            var result = validator.TestValidate(testDto);
            result.ShouldNotHaveAnyValidationErrors();
        }*/

       /* [Fact]
        public void Dto_With_Invalid_SunExposureId_should_throw_error()
        {
            EditUserSiteDto testDto = new EditUserSiteDto()
            {
                Id = 1,
                Name = "Test",
                SunExposureId = 999,
                ColdPeriodMinTemperature = -10,
                ColdPeriodMaxTemperature = 0,
                WarmPeriodMinTemperature = 15,
                WarmPeriodMaxTemperature = 30,
            };

            var validator = new EditUserSiteValidator(_dbContext);
            var result = validator.TestValidate(testDto);
            result.ShouldHaveValidationErrorFor(e => e.SunExposureId);
        }
       */
       /* [Fact]
        public void Dto_With_Invalid_ColdPeriodMaxTemperature_should_throw_error()
        {
            EditUserSiteDto testDto = new EditUserSiteDto()
            {
                Id = 1,
                Name = "Test",
                SunExposureId = 1,
                ColdPeriodMinTemperature = 0,
                ColdPeriodMaxTemperature = -5,
                WarmPeriodMinTemperature = 15,
                WarmPeriodMaxTemperature = 30,
            };

            var validator = new EditUserSiteValidator(_dbContext);
            var result = validator.TestValidate(testDto);
            result.ShouldHaveValidationErrorFor(e => e.ColdPeriodMinTemperature);
        }

        [Fact]
        /*public void Dto_With_Invalid_WarmPeriodMaxTemperature_should_throw_error()
        {
            EditUserSiteDto testDto = new EditUserSiteDto()
            {
                Id = 1,
                Name = "Test",
                SunExposureId = 1,
                ColdPeriodMinTemperature = 0,
                ColdPeriodMaxTemperature = 10,
                WarmPeriodMinTemperature = 40,
                WarmPeriodMaxTemperature = 30,
            };

            var validator = new EditUserSiteValidator(_dbContext);
            var result = validator.TestValidate(testDto);
            result.ShouldHaveValidationErrorFor(e => e.WarmPeriodMinTemperature);
        }
        */
        /*[Fact]
        public void Dto_With_Invalid_NameLength_should_throw_error()
        {
            EditUserSiteDto testDto = new EditUserSiteDto()
            {
                Id = 1,
                Name = "T",
                SunExposureId = 1,
                ColdPeriodMinTemperature = 0,
                ColdPeriodMaxTemperature = 10,
                WarmPeriodMinTemperature = 30,
                WarmPeriodMaxTemperature = 40,
            };

            var validator = new EditUserSiteValidator(_dbContext);
            var result = validator.TestValidate(testDto);
            result.ShouldHaveValidationErrorFor(e => e.Name);
        }
        */
       /* [Fact]
        public void Dto_With_Invalid_Name_should_throw_error()
        {
            EditUserSiteDto testDto = new EditUserSiteDto()
            {
                Id = 1,
                Name = null,
                SunExposureId = 1,
                ColdPeriodMinTemperature = 0,
                ColdPeriodMaxTemperature = 10,
                WarmPeriodMinTemperature = 30,
                WarmPeriodMaxTemperature = 40,
            };

            var validator = new EditUserSiteValidator(_dbContext);
            var result = validator.TestValidate(testDto);
            result.ShouldHaveValidationErrorFor(e => e.Name);
        }

        [Fact]
        public void Dto_With_TooHigh_WarmPeriodMaxTemperature_should_throw_error()
        {
            EditUserSiteDto testDto = new EditUserSiteDto()
            {   Id = 1,
                Name = "Test",
                SunExposureId = 1,
                ColdPeriodMinTemperature = 0,
                ColdPeriodMaxTemperature = 10,
                WarmPeriodMinTemperature = 15,
                WarmPeriodMaxTemperature = 55,
            };

            var validator = new EditUserSiteValidator(_dbContext);
            var result = validator.TestValidate(testDto);
            result.ShouldHaveValidationErrorFor(e => e.WarmPeriodMaxTemperature);
        }

        [Fact]
        public void Dto_With_too_low_ColdPeriodMaxTemperature_should_throw_error()
        {
            EditUserSiteDto testDto = new EditUserSiteDto()
            {   Id = 1,
                Name = "Test",
                SunExposureId = 1,
                ColdPeriodMinTemperature = -60,
                ColdPeriodMaxTemperature = 10,
                WarmPeriodMinTemperature = 15,
                WarmPeriodMaxTemperature = 30,
            };

            var validator = new EditUserSiteValidator(_dbContext);
            var result = validator.TestValidate(testDto);
            result.ShouldHaveValidationErrorFor(e => e.ColdPeriodMinTemperature);
        }*/

    }
}
