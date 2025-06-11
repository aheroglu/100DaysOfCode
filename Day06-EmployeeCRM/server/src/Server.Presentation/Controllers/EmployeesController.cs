using MediatR;
using Microsoft.AspNetCore.Mvc;
using Server.Application.Features.Employees.Commands.CreateEmployee;
using Server.Application.Features.Employees.Commands.DeleteEmployee;
using Server.Application.Features.Employees.Commands.UpdateEmployee;
using Server.Application.Features.Employees.Queries.GetAllEmployes;
using Server.Application.Features.Employees.Queries.GetEmployeeById;
using Server.Presentation.Abstractions;

namespace Server.Presentation.Controllers;

public sealed class EmployeesController : ApiController
{
    public EmployeesController(IMediator mediator) : base(mediator) { }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var response = await mediator.Send(new GetAllEmployeesQuery(), cancellationToken);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetById(string id, CancellationToken cancellationToken)
    {
        var response = await mediator.Send(new GetEmployeeByIdQuery(id), cancellationToken);
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateEmployeeCommand request, CancellationToken cancellationToken)
    {
        var response = await mediator.Send(request, cancellationToken);
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> Update(UpdateEmployeeCommand request, CancellationToken cancellationToken)
    {
        var response = await mediator.Send(request, cancellationToken);
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> Delete(string id, CancellationToken cancellationToken)
    {
        var response = await mediator.Send(new DeleteEmployeeCommand(id), cancellationToken);
        return Ok(response);
    }
}