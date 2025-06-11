using FluentValidation;

namespace Server.Application.Features.Employees.Commands.DeleteEmployee;

public sealed class DeleteEmployeeCommandValidator : AbstractValidator<DeleteEmployeeCommand>
{
    public DeleteEmployeeCommandValidator()
    {
        RuleFor(p => p.Id)
            .NotEmpty().WithMessage("Employee ID is required.");
    }
}
