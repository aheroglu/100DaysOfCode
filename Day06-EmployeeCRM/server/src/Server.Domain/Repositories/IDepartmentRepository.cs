using Server.Domain.Entities;

namespace Server.Domain.Repositories;

public interface IDepartmentQueryRepository : IQueryRepository<Department>
{
    Task<int> GetDepartmentCount(CancellationToken cancellationToken = default);
}

public interface IDepartmentCommandRepository : ICommandRepository<Department> { }