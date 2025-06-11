using MediatR;
using Server.Application.Common;
using Server.Domain.Entities;
using Server.Domain.Repositories;

namespace Server.Application.Features.Departments.Commands.UpdateDepartment;

internal sealed class UpdateDepartmentCommandHandler(
    IQueryRepository<Department> queryRepository,
    ICommandRepository<Department> commandRepository,
    IUnitOfWork unitOfWork) : IRequestHandler<UpdateDepartmentCommand, Result<string>>
{
    public async Task<Result<string>> Handle(UpdateDepartmentCommand request, CancellationToken cancellationToken)
    {
        var department = await queryRepository
            .GetByAsync(p => p.Id == request.Id, cancellationToken);

        if (department is null) return Result<string>
                .Failure("Department not found.");

        department.Name = request.Name;

        commandRepository
            .Update(department);

        await unitOfWork
            .SaveChangesAsync(cancellationToken);

        return Result<string>
            .Success("Department updated successfully.");
    }
}
