using backend.Data;
using Microsoft.EntityFrameworkCore;

// Create a new web application builder
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add Swagger/OpenAPI services to the container
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add a database context to the container
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
// app.UseDeveloperExceptionPage();  being used by default to return exception to the client

if (app.Environment.IsDevelopment())
{
    // Enable middleware to serve generated Swagger as a JSON endpoint.
    app.UseSwagger();

    // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
    // specifying the Swagger JSON endpoint.
    app.UseSwaggerUI();
}

// This method configures Cross-Origin Resource Sharing (CORS) between backend and frontend
app.UseCors(opt =>
{
    opt.AllowAnyHeader()
        .AllowAnyMethod()
        // Allow requests from:
        .WithOrigins("http://localhost:3000");
});

// Enable authorization middleware
app.UseAuthorization();

app.MapControllers();

// Create a new scope for services
var scope = app.Services.CreateScope();

// Get database context and logger services
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    // Apply any pending migrations to the database
    context.Database.Migrate();

    // Seed the database with initial data
    DbInitializer.Initialize(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "Error occured during database migration or seeding.");
}

app.Run();
