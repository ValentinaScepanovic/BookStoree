using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Repositories.Users
{
    public interface IUsersRepository
    {
        Task<UserDto> Login (LoginDto loginDto);
    }
}