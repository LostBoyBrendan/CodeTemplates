using DataAccess.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RDK_API.Controllers
{
    [Authorize]
    [RoutePrefix("api/Users")]
    [EnableCors("*", "*", "*")]
    public class UserController : ApiController
    {

        UserManager<ApplicationUser> _userManager = new UserManager<ApplicationUser>(
            new UserStore<ApplicationUser>(new DataAccess.Context.DataContext()));

        DataAccess.Context.DataContext _db = new DataAccess.Context.DataContext();

        [Authorize]
        [HttpGet]
        [Route("GetAll")]
        public List<ApplicationUser> GetAll()
        {
            try
            {
                var rolesList = new List<ApplicationUser>();

                rolesList = _userManager.Users.ToList();

                return rolesList;
            }
            catch (Exception exc)
            {
                return null;
            }
        }

        [Authorize]
        [HttpPost]
        [Route("Create")]
        public async Task<IHttpActionResult> Create([FromBody]RegisterBindingModel request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ApplicationUser user = new ApplicationUser();

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.UserName = request.Email;
            user.Email = request.Email;
            user.JoinDate = DateTime.Now;
            user.Level = 1;

            IdentityResult result = await _userManager.CreateAsync(user, request.Password);

            if (result.Succeeded)
            {
                return Ok(result);
            }
            else
            {
                return GetErrorResult(result);
            }
        }

        [Authorize]
        [HttpPut]
        [Route("Update")]
        public async Task<IHttpActionResult> Modify([FromBody]ApplicationUser request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var currentUser = _userManager.FindByEmail(request.Email);
                currentUser.FirstName = request.FirstName;
                currentUser.LastName = request.LastName;
                currentUser.Email = request.Email;

                IdentityResult result = await _userManager.UpdateAsync(currentUser);


                if (result.Succeeded)
                {
                    return Ok(result);
                }
                else
                {
                    return GetErrorResult(result);
                }
            }
            catch (Exception exc)
            {
                return null;
            }
        }

        [Authorize]
        [HttpDelete]
        [Route("Delete")]
        public async Task<IHttpActionResult> Delete(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ApplicationUser role = _userManager.Users.First(m => m.Id == id);

            var result = await _userManager.DeleteAsync(role);

            if (result.Succeeded)
            {
                return Ok(result);
            }
            else
            {
                return GetErrorResult(result);
            }
        }


        #region Helpers

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        #endregion Helpers


    }
}