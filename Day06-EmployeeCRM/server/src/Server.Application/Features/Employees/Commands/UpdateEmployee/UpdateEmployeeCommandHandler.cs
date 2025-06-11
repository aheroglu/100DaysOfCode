using MediatR;
using Server.Application.Common;
using Server.Domain.Repositories;

namespace Server.Application.Features.Employees.Commands.UpdateEmployee;

internal sealed class UpdateEmployeeCommandHandler(
    IEmployeeQueryRepository queryRepository,
    IEmployeeCommandRepository commandRepository,
    IUnitOfWork unitOfWork) : IRequestHandler<UpdateEmployeeCommand, Result<string>>
{
    public async Task<Result<string>> Handle(UpdateEmployeeCommand request, CancellationToken cancellationToken)
    {
        var employee = await queryRepository
            .GetByAsync(p => p.Id == request.Id, cancellationToken);

        if (employee is null) return Result<string>
                .Failure("Employee not found.");

        if (employee.Email != request.Email)
        {
            bool isEmailExists = await queryRepository
                .IsEmailExists(request.Email, cancellationToken);

            if (isEmailExists) return Result<string>
                    .Failure("Email already exists.");
        }
        else if (employee.PhoneNumber != request.PhoneNumber)
        {
            bool isPhoneNumberExists = await queryRepository
                .IsPhoneNumberExists(request.PhoneNumber, cancellationToken);

            if (isPhoneNumberExists) return Result<string>
                    .Failure("Phone number already exists.");
        }
        else if (employee.FirstName != request.FirstName || employee.LastName != request.LastName)
        {
            bool isNameExists = await queryRepository
                .IsNameExists(request.FirstName, request.LastName, cancellationToken);

            if (isNameExists) return Result<string>
                    .Failure("Employee with the same name already exists.");
        }

        employee.FirstName = request.FirstName;
        employee.LastName = request.LastName;
        employee.Email = request.Email;
        employee.PhoneNumber = request.PhoneNumber;
        employee.City = request.City;
        employee.HireDate = request.HireDate;
        employee.DepartmentId = request.DepartmentId;

        commandRepository
            .Update(employee);

        await unitOfWork
            .SaveChangesAsync(cancellationToken);

        return Result<string>
            .Success("Employee updated successfully.");
    }
}
