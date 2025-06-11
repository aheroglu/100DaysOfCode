using MediatR;
using Server.Application.Common;

namespace Server.Application.Features.Employees.Queries.GetEmployeeById;

public sealed record GetEmployeeByIdQuery(
    string Id) : IRequest<Result<GetEmployeeByIdQueryResult>>;
