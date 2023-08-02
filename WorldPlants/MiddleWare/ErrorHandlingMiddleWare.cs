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
            catch (NotFoundException notFoundException)
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
            catch(NotUpdatedException notUpdatedException)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(notUpdatedException.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("Coś się wykrzaczyło" + ex.Message);
            }
        }
    }
}
