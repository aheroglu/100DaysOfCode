using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

var builder = WebApplication.CreateBuilder(args);

builder
    .Services
    .AddDbContext<AppDbContext>(options =>
        options.UseInMemoryDatabase("InMemoryDb"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowAngularApp");

app.MapGet("/api/todos", async (AppDbContext context) =>
{
    var todos = await context.Todos.ToListAsync();
    return Results.Ok(todos);
});

app.MapGet("/api/todos/{id}", async (string id, AppDbContext context) =>
{
    var todo = await context.Todos.FindAsync(id);

    if (todo == null)
    {
        return Results.NotFound();
    }

    return Results.Ok(todo);
});

app.MapPost("/api/todos", async (Todo todo, AppDbContext context) =>
{
    await context.Todos.AddAsync(todo);
    await context.SaveChangesAsync();
    return Results.Created($"/api/todos/{todo.Id}", todo);
});

app.MapPut("/api/todos", async (Todo updatedTodo, AppDbContext context) =>
{
    var todo = await context.Todos.FindAsync(updatedTodo.Id);

    if (todo == null)
    {
        return Results.NotFound();
    }

    todo.Text = updatedTodo.Text;

    await context.SaveChangesAsync();
    return Results.Ok(todo);
});

app.MapDelete("/api/todos/{id}", async (string id, AppDbContext context) =>
{
    var todo = await context.Todos.FindAsync(id);

    if (todo == null)
    {
        return Results.NotFound();
    }

    context.Todos.Remove(todo);

    await context.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();