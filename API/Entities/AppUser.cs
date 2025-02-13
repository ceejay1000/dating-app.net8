﻿using API.Extensions;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set;}

    // required introduced in C# 11
    public required string UserName { get; set;}

    public byte[] PasswordHash {get; set;} = [];
    public byte[] PasswordSalt {get; set;} = [];
    public DateOnly DateOfBirth { get; set; }
    public required string KnownAs { get; set; }
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public required string Introduction { get; set; }
    public string? Inetrests { get; set; }
    public string? LookingFor { get; set; }

    public required string City { get; set; }
    public required string Country { get; set; }
    public List<Photo> Photos { get; set; } = [];

    // public int GetAge()
    // {
    //     return DateOfBirth.CalculateAge();
    // }

}
