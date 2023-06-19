using FluentValidation.TestHelper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using WorldPlants.Entities;
using WorldPlants.Models;
using WorldPlants.Models.Validators;
using Xunit;

namespace WorldPlantsIntergrationTests
{
    public class RegisterUserValidatorTests
    {
        private readonly WorldPlantsDbContext _dbContext;
        public RegisterUserValidatorTests()
        {
            var builder = new  DbContextOptionsBuilder<WorldPlantsDbContext>();
            builder.UseInMemoryDatabase("TestDatabase");
            _dbContext = new WorldPlantsDbContext(builder.Options);
            Seed();

         

        }
        private static IEnumerable<object[]> InvalidRegisterDtos()
        {
            yield return new object[] {
              new  RegisterUserDto(){
                   Name = "Kdz",
                   Email = "",
                   Password =  "qwertyui",
                   RepeatedPassword = "qwertyui",
                   PhoneNumber = "531358154"
                },
            };

            yield return new object[] {
              new  RegisterUserDto(){
                   Name = "Kdz",
                   Email = "test@test.pl",
                   Password =  "qwertyui",
                   RepeatedPassword = "qwertyui",
                   PhoneNumber = "531358154"
                },
            };



        }

        private static IEnumerable<object[]> ValidRegisterDtos()
        {
            yield return new object[] {
              new  RegisterUserDto(){
                   Name = "Kdz",
                   Email = "kdz@kdz3.pl",
                   Password =  "qwertyui",
                   RepeatedPassword = "qwertyui",
                   PhoneNumber = "531358154"
                },
            };
            yield return new object[]
            {
                 new  RegisterUserDto(){
                   Name = "Kdz",
                   Email = "kdz@kdz2.pl",
                   Password =  "qwertyui",
                   RepeatedPassword = "qwertyui",
                   PhoneNumber = null
                },
            };

        }

        private void Seed()
        {
            var testUsersList = new List<User>()
            {
                new User()
                {
                    Email = "test@test.pl",
                    Password = "Test",
                    PhoneNumber= "456345678",
                    Name = "Test",
                    IsActive = true,
                    AccountType = "Owner",
                    UserSettings = new UserSettings(),
                    Space = new Space()
                }
            };
            _dbContext.Users.AddRange(testUsersList);
            _dbContext.SaveChanges();
        }

        [Theory]
        [MemberData(nameof(ValidRegisterDtos))]
        public void Validate_for_valid_dto(RegisterUserDto dto)
        {
            var validator = new RegisterUserDtoValidator(_dbContext);
            var result  = validator.TestValidate(dto);
            result.ShouldNotHaveAnyValidationErrors();
        }
        [Theory]
        [MemberData(nameof(InvalidRegisterDtos))]
        public void Validate_for_invalid_dto(RegisterUserDto dto)
        {
            var validator = new RegisterUserDtoValidator(_dbContext);
            var result = validator.TestValidate(dto);
            result.ShouldHaveAnyValidationError();
        }

    }
}
