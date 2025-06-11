using MediatR;
using Server.Application.Common;
using Server.Domain.Repositories;

namespace Server.Application.Features.Dashboard.Queries.DashboardStats;

internal sealed class DashboardStatsQueryHandler(
    IEmployeeQueryRepository employeeQueryRepository,
    IDepartmentQueryRepository departmentQueryRepository) : IRequestHandler<DashboardStatsQuery, Result<DashboardStatsQueryResult>>
{
    public async Task<Result<DashboardStatsQueryResult>> Handle(DashboardStatsQuery request, CancellationToken cancellationToken)
    {
        var stats = new DashboardStatsQueryResult(
            await employeeQueryRepository.GetEmployeeCount(cancellationToken),
            await departmentQueryRepository.GetDepartmentCount(cancellationToken),
            await employeeQueryRepository.AverageOfEmployees(cancellationToken),
            await employeeQueryRepository.HiredThisMonthCount(cancellationToken));

        return Result<DashboardStatsQueryResult>
            .Success(stats);
    }
}
