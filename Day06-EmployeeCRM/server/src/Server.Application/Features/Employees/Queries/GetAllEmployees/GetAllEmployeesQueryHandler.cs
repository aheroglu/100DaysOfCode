using MapsterMapper;
using MediatR;
using Server.Application.Common;
using Server.Domain.Repositories;

namespace Server.Application.Features.Employees.Queries.GetAllEmployes;

internal sealed class GetAllEmployeesQueryHandler(
    IEmployeeQueryRepository queryRepository,
    IMapper mapper) : IRequestHandler<GetAllEmployeesQuery, Result<List<GetAllEmployeesQueryResult>>>
{
    public async Task<Result<List<GetAllEmployeesQueryResult>>> Handle(GetAllEmployeesQuery request, CancellationToken cancellationToken)
    {
        var employees = mapper
            .Map<List<GetAllEmployeesQueryResult>>(await queryRepository
            .GetAllAsync(cancellationToken));

        return Result<List<GetAllEmployeesQueryResult>>
            .Success(employees);
    }
}
