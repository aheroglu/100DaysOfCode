using MediatR;
using Server.Application.Common;

namespace Server.Application.Features.Departments.Commands.UpdateDepartment;

public sealed record UpdateDepartmentCommand(
    string Id,
    string Name) : IRequest<Result<string>>;
