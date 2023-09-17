using FluentValidation;
using FluentValidation.AspNetCore;
using Hangfire;
using HangfireBasicAuthenticationFilter;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using NLog.Web;
using System.Text;
using WorldPlants;
using WorldPlants.DbSeeders;
using WorldPlants.Entities;
using WorldPlants.MiddleWare;
using WorldPlants.Models;
using WorldPlants.Models.PlantsModels;
using WorldPlants.Models.Validators;
using WorldPlants.Services;
using WorldPlants.Utilities;
using WorldPlants.Utils;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

var authenticationSettings = new AuthenticationSettings
{
    JwtKey = Environment.GetEnvironmentVariable("JWTKEY") ?? ""
};

builder.Configuration.GetSection("Authentication").Bind(authenticationSettings);



// Add services to the container.
//builder.Host.UseNLog();
builder.Services.AddControllersWithViews();
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddSingleton(authenticationSettings);
builder.Services.AddCors(p => p.AddPolicy("CORS", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));


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

builder.Services.AddDbContext<WorldPlantsDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("WorldPlantsDb")));

builder.Services.AddHangfire((provider, options) =>
{
    options.UseSqlServerStorage(builder.Configuration
        .GetConnectionString("HangfireCS"))
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings();
});

builder.Services.AddHangfireServer();

//Services
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IOwnerUserService, OwnerUserService>();
builder.Services.AddScoped<IGuestUserService, GuestUserService>();
builder.Services.AddScoped<ISiteService, SitesService>();
builder.Services.AddScoped<IUserContextService, UserContextService>();
builder.Services.AddScoped<IRecognizerService, RecognizerService>();
builder.Services.AddScoped<IPlantService, PlantsService>();
builder.Services.AddScoped<ITranslationService, TranslationService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IActiveTasksService, ActiveTasksService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IRemindersService, RemindersService>();
builder.Services.AddScoped<ISMSService, SMSService>();
builder.Services.AddScoped<IJobsService, JobsService>();
//

//Validators
builder.Services.AddScoped<IValidator<RegisterUserDto>, RegisterUserDtoValidator>();
builder.Services.AddScoped<IValidator<LoginUserDto>, LoginUserDtoValidator>();
builder.Services.AddScoped<IValidator<UserChangePasswordDto>, UserChangePasswordValidator>();
builder.Services.AddScoped<IValidator<NewUserSiteDto>, NewUserSiteValidator>();
builder.Services.AddScoped<IValidator<EditUserSiteSettingsDto>, EditUserSiteValidator>();
builder.Services.AddScoped<IValidator<AccountSettingsDto>, AccountSettingsValidator>();
builder.Services.AddScoped<IValidator<AddPlantDto>, AddPlantValidator>();
//

builder.Services.AddScoped<DbSeeder, DbSeeder>();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<IDatabaseUtils, DatabaseUtils>();
builder.Services.AddScoped<IUtilities, Utilities>();
builder.Services.AddScoped<ITranslationUtilities, TranslationUtilities>();
builder.Services.AddScoped<ErrorHandlingMiddleWare>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IPathHelper, PathHelper>();

var app = builder.Build();

SeedDatabase();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseMiddleware<ErrorHandlingMiddleWare>();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
           Path.Combine(builder.Environment.ContentRootPath, "Store")),
    RequestPath = "/StaticFiles"
});

app.UseAuthentication();
app.UseHttpsRedirection();

app.UseHangfireDashboard("/Hangfire/Dashboard", new DashboardOptions()
{
    Authorization = new[]
    {
         new HangfireCustomBasicAuthenticationFilter
         {
             User =  Environment.GetEnvironmentVariable("HANGFIRE_DASHBOARD_USER")?? "",
             Pass =  Environment.GetEnvironmentVariable("HANGFIRE_DASHBOARD_PASSWORD")?? "",
         }
    },

}) ;

RecurringJob.AddOrUpdate<IJobsService>("SendEmailReminders", e => e.ExecuteSendEmailReminders(), "00 8 * * *", new RecurringJobOptions()
{
    TimeZone = TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time") ?? TimeZoneInfo.Utc
});
/* Temporaly off
RecurringJob.AddOrUpdate<IJobsService>("SendSMSReminders", e => e.ExecuteSendSMSReminders(), "00 20 * * *", new RecurringJobOptions()
{
    TimeZone = TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time") ?? TimeZoneInfo.Utc

});*/

app.UseRouting();
app.UseCors("CORS");
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
void SeedDatabase()
{
    using (var scope = app.Services.CreateScope())
    {
        var dbInitializer = scope.ServiceProvider.GetRequiredService<DbSeeder>();
        dbInitializer.Seed();
    };
}
public partial class Program { }


