using Server.Domain.Abstractions;

namespace Server.Domain.Entities;

public sealed class Employee : Entity
{
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string PhoneNumber { get; set; } = default!;
    public string City { get; set; } = default!;
    public DateTime BirthDate { get; set; }
    public DateTime HireDate { get; set; }

    public string DepartmentId { get; set; } = default!;
    public Department Department { get; set; } = default!;

    public string CreatedFromId { get; set; } = default!;
    public AppUser CreatedFrom { get; set; } = default!;
}