using MediatR;
using Server.Application.Common;

namespace Server.Application.Features.Employees.Commands.CreateEmployee;

public sealed record CreateEmployeeCommand(
    string FirstName,
    string LastName,
    string Email,
    string PhoneNumber,
    string City,
    DateTime BirthDate,
    DateTime HireDate,
    string DepartmentId,
    string CreatedFromId) : IRequest<Result<string>>;
