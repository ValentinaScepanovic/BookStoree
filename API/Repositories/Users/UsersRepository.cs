using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DataBase;
using API.DataBase.Entities;
using API.DTOs;

namespace API.Repositories.Users
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DBContext _context;

        public UsersRepository(DBContext context){
            _context=context;
        }
        public async Task<UserDto> Login(LoginDto loginDto)
        {
            var user = _context.Users.Where(s=>s.UserName== loginDto.UserName).First();
            if(user.Password==loginDto.Password){
                var userRes= new UserDto();
                userRes.Email=user.Email;
                userRes.Name=user.Name;
                userRes.UserName=user.UserName;
                userRes.Password=user.Password;
                return userRes;
            } else {
                throw new Exception("Invalid password.");
            }

        }
    }
}