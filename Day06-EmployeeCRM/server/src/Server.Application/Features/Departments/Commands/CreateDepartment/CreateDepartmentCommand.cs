using MediatR;
using Server.Application.Common;

namespace Server.Application.Features.Departments.Commands.CreateDepartment;

public sealed record CreateDepartmentCommand(
    string Name) : IRequest<Result<string>>;
