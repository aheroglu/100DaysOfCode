namespace Server.Application.Features.Employees.Queries.GetEmployeeById;

public sealed record GetEmployeeByIdQueryResult(
    string Id,
    string FirstName,
    string LastName,
    string Email,
    string PhoneNumber,
    string City,
    DateTime BirthDate,
    DateTime HireDate,
    DateTime CreatedAt,
    DateTime? UpdatedAt);
