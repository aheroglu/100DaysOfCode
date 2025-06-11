namespace Server.Application.Dtos;

public sealed record DepartmentDto(
    string Id,
    string Name,
    DateTime CreatedAt,
    DateTime? UpdatedAt);