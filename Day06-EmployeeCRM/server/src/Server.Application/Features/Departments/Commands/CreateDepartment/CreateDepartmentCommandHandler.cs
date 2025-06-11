using MapsterMapper;
using MediatR;
using Server.Application.Common;
using Server.Domain.Entities;
using Server.Domain.Repositories;

namespace Server.Application.Features.Departments.Commands.CreateDepartment;

internal sealed class CreateDepartmentCommandHandler(
    ICommandRepository<Department> commandRepository,
    IUnitOfWork unitOfWork,
    IMapper mapper) : IRequestHandler<CreateDepartmentCommand, Result<string>>
{
    public async Task<Result<string>> Handle(CreateDepartmentCommand request, CancellationToken cancellationToken)
    {
        var deparment = mapper
            .Map<Department>(request);

        await commandRepository
            .CreateAsync(deparment, cancellationToken);

        await unitOfWork
            .SaveChangesAsync(cancellationToken);

        return Result<string>
            .Success("Department created successfully.");
    }
}
