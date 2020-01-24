using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace RDK.Controllers
{

    [Route("api/[controller]")]
    [EnableCors("AllowOrigin")]
    public class AccountController : Controller
    {
        private UserManager<DataAccess.Models.ApplicationUser> _userManager = null;
        private SignInManager<DataAccess.Models.ApplicationUser> _signInManager = null;

        public AccountController(
            UserManager<DataAccess.Models.ApplicationUser> userManager,
            SignInManager<DataAccess.Models.ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // <summary>
        // Registers a new user in identity
        // </summary>
        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult> Register(DataAccess.Models.AccountBindingModel.RegisterBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DataAccess.Models.ApplicationUser user = new DataAccess.Models.ApplicationUser();

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.UserName = model.Email;
            user.Email = model.Email;
            user.JoinDate = DateTime.Now;
            user.Level = 1;

            IdentityResult result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest();
            }

            var adminUser = _userManager.FindByEmailAsync(model.Email);

            if (!string.IsNullOrEmpty(adminUser.Result.Id))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [Route("login")]
        [HttpPost]
        public async Task<ActionResult> Login([FromBody] DataAccess.Models.AccountModel.LoginViewModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null)
            {
                if (await _userManager.CheckPasswordAsync(user, model.Password) && await _userManager.IsLockedOutAsync(user) == false)
                {
                }
            }

            return Unauthorized();
        }
    }
}