using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MemberUpdateDTO
    {
        public string Introduction {get; set; } = string.Empty;
        public string LookingFor {get; set; } = string.Empty;
        public string Interests {get; set; } = string.Empty;
        public string City {get; set; } = string.Empty;
        public string Country {get; set; } = string.Empty;
    }
}