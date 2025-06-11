using MediatR;
using Server.Application.Common;

namespace Server.Application.Features.Departments.Commands.DeleteDepartment;

public sealed record DeleteDepartmentCommand(
    string Id) : IRequest<Result<string>>;
