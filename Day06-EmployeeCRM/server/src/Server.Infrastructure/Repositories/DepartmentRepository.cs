using Microsoft.EntityFrameworkCore;
using Server.Domain.Entities;
using Server.Domain.Repositories;
using Server.Infrastructure.Context;

namespace Server.Infrastructure.Repositories;

public sealed class DepartmentQueryRepository : QueryRepository<Department>, IDepartmentQueryRepository
{
    public DepartmentQueryRepository(AppDbContext context) : base(context) { }

    public override async Task<IEnumerable<Department>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await context.Set<Department>()
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<int> GetDepartmentCount(CancellationToken cancellationToken = default)
    {
        return await context.Set<Department>()
            .CountAsync(cancellationToken);
    }
}

public sealed class DepartmentCommandRepository : CommandRepository<Department>, IDepartmentCommandRepository
{
    public DepartmentCommandRepository(AppDbContext context) : base(context) { }
}
