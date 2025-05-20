namespace Server.Models;

public sealed class Todo
{
    public Todo()
    {
        Id = Guid.NewGuid().ToString();
    }

    public string Id { get; set; }
    public string Text { get; set; } = default!;
}