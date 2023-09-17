using DeepL;
using Microsoft.JSInterop;
using System.IdentityModel.Tokens.Jwt;
using Twilio.Exceptions;
using WorldPlants.Exceptions;

namespace WorldPlants.MiddleWare
{
    public class ErrorHandlingMiddleWare : IMiddleware
    {
        private readonly ILogger<ErrorHandlingMiddleWare> _logger;

        public ErrorHandlingMiddleWare(ILogger<ErrorHandlingMiddleWare> logger)
        {
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch (ForbidException forbidException)
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync(forbidException.Message);
            }
            catch (Exceptions.NotFoundException notFoundException)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(notFoundException.Message);
            }
            catch (BadRequestException badRequestException)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(badRequestException.Message);
            }
            catch (UserSiteNotFoundException userSiteNotFoundException)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(userSiteNotFoundException.Message);
            }
            catch (SiteWithPlantsException siteWithPlantsException)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(siteWithPlantsException.Message);
            }
            catch (RecognizerException recognizerException)
            {
                context.Response.StatusCode = 408;
                await context.Response.WriteAsync(recognizerException.Message);
            }
            catch (NotUpdatedException notUpdatedException)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(notUpdatedException.Message);
            }
            catch (ActionAccessPermittedException actionAccessPermittedException)
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync(actionAccessPermittedException.Message);
            }
            catch(SearchPlantException searchPlantException) {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(searchPlantException.Message);
            }
            catch(JSException jsonException)
            {
                context.Response.StatusCode = 422;
                await context.Response.WriteAsync(jsonException.Message);
            }
            catch(NotSupportedImageTypeException notSupportedImageTypeException)
            {
                context.Response.StatusCode = 415;
                await context.Response.WriteAsync(notSupportedImageTypeException.Message);
            }
            catch(ArgumentNullException argumentNullException)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(argumentNullException.Message);
            }
            catch(DeepLException ex)
            {
                context.Response.StatusCode = 415;
                await context.Response.WriteAsync("Błąd tłumaczenia");
                _logger.LogError("Bład DeepL: " + ex.Message);
            }
            catch(TimeZoneNotFoundException ex)
            {
                context.Response.StatusCode = 415;
                await context.Response.WriteAsync(ex.Message);
            }
            catch(ApiException ex)
            {
                _logger.LogError("Twilio SMS reminder error: " + ex.Message);
            }

            catch(Exception ex)
            { 
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("Coś się wykrzaczyło)");
                _logger.LogError("Coś się wykrzaczyło: " + ex.Message, ex);
            }
        }
    }
}
