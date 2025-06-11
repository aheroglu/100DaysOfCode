using MapsterMapper;
using MediatR;
using Server.Application.Common;
using Server.Domain.Entities;
using Server.Domain.Repositories;

namespace Server.Application.Features.Employees.Commands.CreateEmployee;

internal sealed class CreateEmployeeCommandHandler(
    IEmployeeQueryRepository queryRepository,
    IEmployeeCommandRepository commandRepository,
    IUnitOfWork unitOfWork,
    IMapper mapper) : IRequestHandler<CreateEmployeeCommand, Result<string>>
{
    public async Task<Result<string>> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
    {
        bool isEmailExists = await queryRepository
            .IsEmailExists(request.Email, cancellationToken);

        if (isEmailExists) return Result<string>
                .Failure("Email already exists.");

        bool isPhoneNumberExists = await queryRepository
            .IsPhoneNumberExists(request.PhoneNumber, cancellationToken);

        if (isPhoneNumberExists) return Result<string>
                .Failure("Phone number already exists.");

        bool isNameExists = await queryRepository
            .IsNameExists(request.FirstName, request.LastName, cancellationToken);

        if (isNameExists) return Result<string>
                .Failure("Employee with the same name already exists.");

        var employee = mapper
            .Map<Employee>(request);

        await commandRepository
            .CreateAsync(employee, cancellationToken);

        await unitOfWork
            .SaveChangesAsync(cancellationToken);

        return Result<string>
            .Success("Employee created successfully.");
    }
}
