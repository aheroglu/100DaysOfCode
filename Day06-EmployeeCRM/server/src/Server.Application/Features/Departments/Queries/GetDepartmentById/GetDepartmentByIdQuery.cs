using MediatR;
using Server.Application.Common;

namespace Server.Application.Features.Departments.Queries.GetDepartmentById;

public sealed record GetDepartmentByIdQuery(
    string Id) : IRequest<Result<GetDepartmentByIdQueryResult>>;
