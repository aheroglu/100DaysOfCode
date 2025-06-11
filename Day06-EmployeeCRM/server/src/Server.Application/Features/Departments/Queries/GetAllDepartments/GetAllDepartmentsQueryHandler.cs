using Mapster;
using MapsterMapper;
using MediatR;
using Server.Application.Common;
using Server.Domain.Entities;
using Server.Domain.Repositories;

namespace Server.Application.Features.Departments.Queries.GetAllDepartments;

internal sealed class GetAllDepartmentsQueryHandler(
    IQueryRepository<Department> queryRepository,
    IMapper mapper) : IRequestHandler<GetAllDepartmentsQuery, Result<List<GetAllDepartmentsQueryResult>>>
{
    public async Task<Result<List<GetAllDepartmentsQueryResult>>> Handle(GetAllDepartmentsQuery request, CancellationToken cancellationToken)
    {
        var departments = mapper
            .Map<List<Department>>(await queryRepository
            .GetAllAsync(cancellationToken));

        return Result<List<GetAllDepartmentsQueryResult>>
            .Success(departments.Adapt<List<GetAllDepartmentsQueryResult>>());
    }
}
