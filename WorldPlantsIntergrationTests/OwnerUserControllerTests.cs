﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using WorldPlants.Entities;
using WorldPlants.Models;
using WorldPlants.Utils;
using Xunit;

namespace WorldPlantsIntergrationTests
{
    public class OwnerUserControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

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
            yield return new object[]
            {
                null
            };

        }

        private static IEnumerable<object[]> ValidRegisterDtos()
        {
            yield return new object[] {
              new  RegisterUserDto(){
                   Name = "Kdz",
                   Email = "kdz@kdz.pl",
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

        public OwnerUserControllerTests(WebApplicationFactory<Program> factory)
        {
            _client = new FakeHttpClient(factory).fakeHttpClient;
        }

        [Theory]
        [MemberData(nameof(InvalidRegisterDtos))]
        public void RegisterOwnerUser_withInvalidModel_throwException(RegisterUserDto dto)
        {
            var json = JsonConvert.SerializeObject(dto);
            var httpContext = new StringContent(json, UnicodeEncoding.UTF8, "application/json");

            Assert.ThrowsAsync<Exception>(() => _client.PostAsync("/Owner/Register", httpContext));
        }

      /* [Theory]
        [MemberData(nameof(ValidRegisterDtos))]
        public async void RegisterOwnerUser_withValidModel_do_not_throwException(RegisterUserDto dto)
        {
            var json = JsonConvert.SerializeObject(dto);
            var httpContext = new StringContent(json, UnicodeEncoding.UTF8, "application/json");

            Exception exception = null;
            try
            {
                var response = await _client.PostAsync("/Owner/Register", httpContext);
                response.EnsureSuccessStatusCode();
            }
            catch (Exception ex)
            {
                exception = ex;
            }

            Assert.Null(exception);
        }*/
    }
}