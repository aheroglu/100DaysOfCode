using FluentValidation;

namespace Server.Application.Features.Departments.Queries.GetDepartmentById;

public sealed class GetDepartmentByIdQueryValidator : AbstractValidator<GetDepartmentByIdQuery>
{
    public GetDepartmentByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Department ID cannot be empty.");
    }
}
