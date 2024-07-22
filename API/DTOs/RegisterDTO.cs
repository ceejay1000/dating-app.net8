
using System.ComponentModel.DataAnnotations;


namespace API.DTOs
{
    public class RegisterDTO
    {
        [Required]
        [MaxLength(100)]
        public string Username {get; set;} = string.Empty;

        [Required]
        public string Password {get; set;} = string.Empty;
    }
}