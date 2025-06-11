using MediatR;
using Microsoft.AspNetCore.Mvc;
using Server.Application.Features.Departments.Commands.CreateDepartment;
using Server.Application.Features.Departments.Commands.DeleteDepartment;
using Server.Application.Features.Departments.Commands.UpdateDepartment;
using Server.Application.Features.Departments.Queries.GetAllDepartments;
using Server.Application.Features.Departments.Queries.GetDepartmentById;
using Server.Presentation.Abstractions;

namespace Server.Presentation.Controllers;

public sealed class DepartmentsController : ApiController
{
    public DepartmentsController(IMediator mediator) : base(mediator) { }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var response = await mediator.Send(new GetAllDepartmentsQuery(), cancellationToken);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetById(string id, CancellationToken cancellationToken)
    {
        var response = await mediator.Send(new GetDepartmentByIdQuery(id), cancellationToken);
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateDepartmentCommand request, CancellationToken cancellationToken)
    {
        var response = await mediator.Send(request, cancellationToken);
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> Update(UpdateDepartmentCommand request, CancellationToken cancellationToken)
    {
        var response = await mediator.Send(request, cancellationToken);
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> Delete(string id, CancellationToken cancellationToken)
    {
        var response = await mediator.Send(new DeleteDepartmentCommand(id), cancellationToken);
        return Ok(response);
    }
}
