using MapsterMapper;
using MediatR;
using Server.Application.Common;
using Server.Domain.Repositories;

namespace Server.Application.Features.Employees.Queries.GetEmployeeById;

internal sealed class GetEmployeeByIdQueryHandler(
    IEmployeeQueryRepository queryRepository,
    IMapper mapper) : IRequestHandler<GetEmployeeByIdQuery, Result<GetEmployeeByIdQueryResult>>
{
    public async Task<Result<GetEmployeeByIdQueryResult>> Handle(GetEmployeeByIdQuery request, CancellationToken cancellationToken)
    {
        var employee = mapper
            .Map<GetEmployeeByIdQueryResult>(await queryRepository
            .GetByAsync(p => p.Id == request.Id, cancellationToken));

        if (employee is null) return Result<GetEmployeeByIdQueryResult>
                .Failure("Employee not found!");

        return Result<GetEmployeeByIdQueryResult>
            .Success(employee);
    }
}
