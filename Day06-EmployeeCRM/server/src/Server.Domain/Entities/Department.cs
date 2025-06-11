using Server.Domain.Abstractions;

namespace Server.Domain.Entities;

public sealed class Department : Entity
{
    public string Name { get; set; } = default!;

    public ICollection<Employee> Employees { get; set; } = new List<Employee>();
}