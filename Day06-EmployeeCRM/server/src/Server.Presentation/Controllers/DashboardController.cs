using MediatR;
using Microsoft.AspNetCore.Mvc;
using Server.Application.Features.Dashboard.Queries.DashboardStats;
using Server.Presentation.Abstractions;

namespace Server.Presentation.Controllers;

public sealed class DashboardController : ApiController
{
    public DashboardController(IMediator mediator) : base(mediator) { }

    [HttpGet]
    public async Task<IActionResult> GetDashboardStats(CancellationToken cancellationToken)
    {
        var response = await mediator.Send(new DashboardStatsQuery(), cancellationToken);
        return Ok(response);
    }
}