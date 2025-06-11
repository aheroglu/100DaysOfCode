using MediatR;
using Server.Application.Common;

namespace Server.Application.Features.Departments.Queries.GetAllDepartments;

public sealed class GetAllDepartmentsQuery : IRequest<Result<List<GetAllDepartmentsQueryResult>>>;
