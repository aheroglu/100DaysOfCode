namespace Server.Application.Features.Dashboard.Queries.DashboardStats;

public sealed record DashboardStatsQueryResult(
    int EmployeeCount,
    int DepartmentCount,
    double AverageAge,
    int HiredThisMonth);
