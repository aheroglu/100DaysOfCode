using Server.Domain.Entities;

namespace Server.Domain.Repositories;

public interface IEmployeeQueryRepository : IQueryRepository<Employee>
{
    Task<bool> IsEmailExists(string email, CancellationToken cancellationToken = default);
    Task<bool> IsPhoneNumberExists(string phoneNumber, CancellationToken cancellationToken = default);
    Task<bool> IsNameExists(string firstName, string lastName, CancellationToken cancellationToken = default);
    Task<int> GetEmployeeCount(CancellationToken cancellationToken = default);
    Task<int> HiredThisMonthCount(CancellationToken cancellationToken = default);
    Task<double> AverageOfEmployees(CancellationToken cancellationToken = default);
}

public interface IEmployeeCommandRepository : ICommandRepository<Employee> { }