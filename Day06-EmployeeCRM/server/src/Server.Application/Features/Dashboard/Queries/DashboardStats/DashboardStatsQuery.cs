using MediatR;
using Server.Application.Common;

namespace Server.Application.Features.Dashboard.Queries.DashboardStats;

public sealed record DashboardStatsQuery : IRequest<Result<DashboardStatsQueryResult>>;
