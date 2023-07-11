using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Services.Users
{
    public interface IUsersService
    {
        Task<UserDto> Login (LoginDto loginDto);
    }
}