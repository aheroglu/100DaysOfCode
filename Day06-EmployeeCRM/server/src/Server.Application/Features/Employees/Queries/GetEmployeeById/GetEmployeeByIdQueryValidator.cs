using FluentValidation;

namespace Server.Application.Features.Employees.Queries.GetEmployeeById;

public sealed class GetEmployeeByIdQueryValidator : AbstractValidator<GetEmployeeByIdQuery>
{
    public GetEmployeeByIdQueryValidator()
    {
        RuleFor(p => p.Id)
            .NotEmpty().WithMessage("Employee ID is required.")
            .NotNull().WithMessage("Employee ID cannot be null.");
    }
}
