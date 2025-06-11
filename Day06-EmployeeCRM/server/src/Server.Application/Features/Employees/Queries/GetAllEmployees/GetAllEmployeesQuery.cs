using MediatR;
using Server.Application.Common;

namespace Server.Application.Features.Employees.Queries.GetAllEmployes;

public sealed record GetAllEmployeesQuery : IRequest<Result<List<GetAllEmployeesQueryResult>>>;
