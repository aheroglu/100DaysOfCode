namespace Server.Application.Features.Departments.Queries.GetAllDepartments;

public sealed record GetAllDepartmentsQueryResult(
    string Id,
    string Name,
    DateTime CreatedAt,
    DateTime? UpdatedAt);
