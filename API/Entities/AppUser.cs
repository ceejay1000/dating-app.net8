namespace API.Entities;

public class AppUser
{
    public int Id { get; set;}

    // required introduced in C# 11
    public required string UserName { get; set;}


}
