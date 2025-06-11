using MediatR;
using Server.Application.Common;

namespace Server.Application.Features.Employees.Commands.DeleteEmployee;

public sealed record DeleteEmployeeCommand(
    string Id) : IRequest<Result<string>>;
