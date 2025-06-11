using Microsoft.EntityFrameworkCore;
using Server.Domain.Entities;
using Server.Domain.Repositories;
using Server.Infrastructure.Context;
using System.Linq.Expressions;

namespace Server.Infrastructure.Repositories;

public sealed class EmployeeQueryRepository : QueryRepository<Employee>, IEmployeeQueryRepository
{
    public EmployeeQueryRepository(AppDbContext context) : base(context) { }

    public override async Task<IEnumerable<Employee>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await context.Set<Employee>()
            .Include(p => p.Department)
            .Include(p => p.CreatedFrom)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public override async Task<Employee> GetByAsync(Expression<Func<Employee, bool>> filter, CancellationToken cancellationToken = default)
    {
        return await context.Set<Employee>()
            .Include(p => p.Department)
            .Include(p => p.CreatedFrom)
            .Where(filter)
            .FirstOrDefaultAsync(cancellationToken) ?? default!;
    }

    public async Task<double> AverageOfEmployees(CancellationToken cancellationToken = default)
    {
        return await context.Set<Employee>()
            .AverageAsync(x => x.BirthDate.Year, cancellationToken);
    }

    public async Task<int> GetEmployeeCount(CancellationToken cancellationToken = default)
    {
        return await context.Set<Employee>()
            .CountAsync(cancellationToken);
    }

    public async Task<int> HiredThisMonthCount(CancellationToken cancellationToken = default)
    {
        return await context.Set<Employee>()
            .CountAsync(x => x.HireDate.Month == DateTime.Now.Month && x.HireDate.Year == DateTime.Now.Year, cancellationToken);
    }

    public async Task<bool> IsEmailExists(string email, CancellationToken cancellationToken = default)
    {
        return await context.Set<Employee>()
            .AnyAsync(x => x.Email == email, cancellationToken);
    }

    public async Task<bool> IsNameExists(string firstName, string lastName, CancellationToken cancellationToken = default)
    {
        return await context.Set<Employee>()
            .AnyAsync(x => x.FirstName == firstName && x.LastName == lastName, cancellationToken);
    }

    public async Task<bool> IsPhoneNumberExists(string phoneNumber, CancellationToken cancellationToken = default)
    {
        return await context.Set<Employee>()
            .AnyAsync(x => x.PhoneNumber == phoneNumber, cancellationToken);
    }
}

public sealed class EmployeeCommandRepository : CommandRepository<Employee>, IEmployeeCommandRepository
{
    public EmployeeCommandRepository(AppDbContext context) : base(context) { }
}
