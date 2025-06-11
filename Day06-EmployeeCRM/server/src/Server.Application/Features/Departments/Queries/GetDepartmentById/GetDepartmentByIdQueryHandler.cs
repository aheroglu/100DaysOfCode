using Mapster;
using MapsterMapper;
using MediatR;
using Server.Application.Common;
using Server.Domain.Entities;
using Server.Domain.Repositories;

namespace Server.Application.Features.Departments.Queries.GetDepartmentById;

internal sealed class GetDepartmentByIdQueryHandler(
    IQueryRepository<Department> queryRepository,
    IMapper mapper) : IRequestHandler<GetDepartmentByIdQuery, Result<GetDepartmentByIdQueryResult>>
{
    public async Task<Result<GetDepartmentByIdQueryResult>> Handle(GetDepartmentByIdQuery request, CancellationToken cancellationToken)
    {
        var department = mapper
            .Map<Department>(await queryRepository
            .GetByAsync(p => p.Id == request.Id, cancellationToken));

        if (department is null) return Result<GetDepartmentByIdQueryResult>
                .Failure("Department not found.");

        return Result<GetDepartmentByIdQueryResult>
            .Success(department.Adapt<GetDepartmentByIdQueryResult>());
    }
}
