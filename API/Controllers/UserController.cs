using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Services.Users;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class UserController : BaseAPIController
    {
        private readonly IUsersService _usersService;
        public UserController(IUsersService usersService)
        {
            _usersService=usersService;
        }

        [HttpGet ("login")]
        public async Task<ActionResult<UserDto>> Login ([FromQuery]LoginDto loginDto){
             try
             {
                var result= await _usersService.Login(loginDto);
                return Ok(result);
             }
             catch (System.Exception ex)
             {
                return BadRequest(ex.Message);
             }
        }
    }
}