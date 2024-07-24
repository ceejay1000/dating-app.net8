namespace API.DTOs;

public class MemberDTO
{
    public int Id { get; set;}

    // required introduced in C# 11
    public string UserName { get; set;}
    public string? PhotoUrl { get; set;}
    public int Age { get; set; }
    public string? KnownAs { get; set; }
    public string? Gender { get; set; }
    public DateTime LastActive { get; set; }
    public DateTime Created { get; set; }
    public required string Introduction { get; set; }
    public string? Inetrests { get; set; }
    public string? LookingFor { get; set; }

    public string? City { get; set; }
    public string? Country { get; set; }
    public List<PhotoDTO?> Photos { get; set; }
}
