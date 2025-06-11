namespace Server.Application.Dtos;

public sealed record EmployeeDto(
    string Id,
    string FirstName,
    string LastName,
    string Email,
    string PhoneNumber,
    string City,
    DateTime BirthDate,
    DateTime HireDate,
    string DepartmentId,
    DepartmentDto Department,
    string CreatedFromId,
    AppUserDto CreatedFrom,
    DateTime CreatedAt,
    DateTime? UpdatedAt);