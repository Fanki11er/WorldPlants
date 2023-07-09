// Ignore Spelling: Validator

using FluentValidation.TestHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using WorldPlants.Entities;
using WorldPlants.Models;
using WorldPlants.Models.Validators;
using Xunit;

namespace WorldPlantsIntergrationTests
{
    public class EditUserSiteValidatorTests
    {
        private readonly WorldPlantsDbContext _dbContext;
        public EditUserSiteValidatorTests()
        {
            var builder = new DbContextOptionsBuilder<WorldPlantsDbContext>();
            builder.UseInMemoryDatabase( new Guid().ToString());
            _dbContext = new WorldPlantsDbContext(builder.Options);

            var testSunExposure = new SunExposure()
            {
                Name = "Test",
                Description = "Test",
            };

            _dbContext.SunExposures.Add(testSunExposure);
            _dbContext.SaveChanges();
            //Seed();
        }
        [Fact]
        public void Valid_dto_pass_validation()
        {
            EditUserSiteDto testDto = new EditUserSiteDto()
            {
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
        }

        [Fact]
        public void Dto_With_Invalid_SunExposureId_should_throw_error()
        {
            EditUserSiteDto testDto = new EditUserSiteDto()
            {
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

        [Fact]
        public void Dto_With_Invalid_ColdPeriodMaxTemperature_should_throw_error()
        {
            EditUserSiteDto testDto = new EditUserSiteDto()
            {
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
        public void Dto_With_Invalid_WarmPeriodMaxTemperature_should_throw_error()
        {
            EditUserSiteDto testDto = new EditUserSiteDto()
            {
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

        [Fact]
        public void Dto_With_Invalid_NameLength_should_throw_error()
        {
            EditUserSiteDto testDto = new EditUserSiteDto()
            {
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

        [Fact]
        public void Dto_With_Invalid_Name_should_throw_error()
        {
            EditUserSiteDto testDto = new EditUserSiteDto()
            {
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
            {
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
            {
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
        }
    }
}
