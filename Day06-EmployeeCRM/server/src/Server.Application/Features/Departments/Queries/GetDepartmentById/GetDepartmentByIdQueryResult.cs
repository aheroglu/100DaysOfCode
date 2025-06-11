namespace Server.Application.Features.Departments.Queries.GetDepartmentById;

public sealed record GetDepartmentByIdQueryResult(
    string Id,
    string Name);
