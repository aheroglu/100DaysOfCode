namespace Server.Application.Dtos;

public sealed record AppUserDto(
    string Id,
    string UserName,
    string Email);