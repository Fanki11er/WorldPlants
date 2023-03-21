using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NLog.Web;
using System.Text;
using WorldPlants;
using WorldPlants.Entities;
using WorldPlants.Middleware;
using WorldPlants.Models;
using WorldPlants.Models.Validators;
using WorldPlants.Services;
using WorldPlants.Utils;

var builder = WebApplication.CreateBuilder(args);

var authenticationSettings = new AuthenticationSettings
{
    JwtKey = builder.Configuration["WorldPlants:TokenKey"]
};

// Add services to the container.
builder.Host.UseNLog();
builder.Services.AddControllersWithViews();
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddSingleton(authenticationSettings);


builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = "Bearer";
    option.DefaultScheme = "Bearer";
    option.DefaultChallengeScheme = "Bearer";
}).AddJwtBearer(cfg =>
{
    cfg.RequireHttpsMetadata = true;
    cfg.SaveToken = true;
    cfg.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = authenticationSettings.JwtIssuer,
        ValidAudience = authenticationSettings.JwtIssuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.JwtKey)),

    };
});

builder.Services.AddDbContext<WorldPLantsDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("WorldPlantsDb")));

builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IOwnerUserService, OwnerUserService>();
builder.Services.AddScoped<IGuestUsertService, GuestUserService>();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<IDatabaseUtils, DatabaseUtils>();
builder.Services.AddScoped<IValidator<RegisterUserDto>, RegisterUserDtoValidator>();
builder.Services.AddScoped<IValidator<LoginUserDto>, LoginUserDtoValidator>();
builder.Services.AddScoped<ErrorHandelingMiddleware>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseMiddleware<ErrorHandelingMiddleware>();
app.UseAuthentication();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
