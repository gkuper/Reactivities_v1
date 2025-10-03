using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddDbContext<Persistence.AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
var app = builder.Build();
app.UseCors(policy => policy
    .AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("https://localhost:3000")); // React app domain

// Configure the HTTP request pipeline. 


app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<Persistence.AppDbContext>();
    await context.Database.MigrateAsync();
    await Persistence.DbInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}
app.Run();
