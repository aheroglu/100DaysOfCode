using MediatR;
using Server.Application.Common;
using Server.Domain.Repositories;

namespace Server.Application.Features.Employees.Commands.DeleteEmployee;

internal sealed class DeleteEmployeeCommandHandler(
    IEmployeeQueryRepository queryRepository,
    IEmployeeCommandRepository commandRepository,
    IUnitOfWork unitOfWork) : IRequestHandler<DeleteEmployeeCommand, Result<string>>
{
    public async Task<Result<string>> Handle(DeleteEmployeeCommand request, CancellationToken cancellationToken)
    {
        var employee = await queryRepository
            .GetByAsync(p => p.Id == request.Id, cancellationToken);

        if (employee is null) return Result<string>
                .Failure("Employee not found.");

        commandRepository
            .Delete(employee);

        await unitOfWork
            .SaveChangesAsync(cancellationToken);

        return Result<string>
            .Success("Employee deleted successfully.");
    }
}
