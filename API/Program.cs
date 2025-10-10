

using Application.Core;
using Application;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using Application.Activities.Validators;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssemblyContaining<Application.Activities.Queries.GetActivityList.Handler>();
    cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
}
    );
builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile(new MappingProfiles()); // Replace with your actual profile
});
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
builder.Services.AddDbContext<Persistence.AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddTransient<ExceptionMiddleWare>();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleWare>();

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
