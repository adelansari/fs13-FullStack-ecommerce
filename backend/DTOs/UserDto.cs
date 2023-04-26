using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class UserDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public BasketDto Basket { get; set; }
    }
}
