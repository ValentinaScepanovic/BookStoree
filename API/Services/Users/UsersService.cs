using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Repositories.Users;

namespace API.Services.Users
{
    public class UsersService : IUsersService
    {
        private readonly IUsersRepository _usersRepository;
        public UsersService(IUsersRepository usersRepository)
        {
            _usersRepository=usersRepository;
        }
        public async Task<UserDto> Login(LoginDto loginDto)
        {
            try
            {
                return await _usersRepository.Login(loginDto);
            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }
    }
}