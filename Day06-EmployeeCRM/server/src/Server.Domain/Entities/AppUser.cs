using Microsoft.AspNetCore.Identity;

namespace Server.Domain.Entities;

public sealed class AppUser : IdentityUser
{
    public AppUser()
    {
        Id = Guid.NewGuid().ToString();
    }

    public ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
