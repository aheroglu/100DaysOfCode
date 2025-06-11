using MediatR;
using Server.Application.Common;
using Server.Domain.Entities;
using Server.Domain.Repositories;

namespace Server.Application.Features.Departments.Commands.DeleteDepartment;

internal sealed class DeleteDepartmentCommandHandler(
    IQueryRepository<Department> queryRepository,
    ICommandRepository<Department> commandRepository,
    IUnitOfWork unitOfWork) : IRequestHandler<DeleteDepartmentCommand, Result<string>>
{
    public async Task<Result<string>> Handle(DeleteDepartmentCommand request, CancellationToken cancellationToken)
    {
        var department = await queryRepository
            .GetByAsync(p => p.Id == request.Id, cancellationToken);

        if (department is null) return Result<string>
                .Failure("Department not found.");

        commandRepository
            .Delete(department);

        await unitOfWork
            .SaveChangesAsync(cancellationToken);

        return Result<string>
            .Success("Department deleted successfully.");
    }
}
