using WorldPlants.Exceptions;

namespace WorldPlants.Middleware
{
    public class ErrorHandelingMiddleware : IMiddleware
    {
        private readonly ILogger<ErrorHandelingMiddleware> _logger;

        public ErrorHandelingMiddleware(ILogger<ErrorHandelingMiddleware> logger)
        {
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch(ForbidException forbidException)
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync(forbidException.Message);
            }
            catch(NotFoundException notFoundException)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(notFoundException.Message);
            }
            catch(BadRequestException badRequestException)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsJsonAsync(badRequestException.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("Coś się wykrzaczyło");
            }
        }
    }
}
