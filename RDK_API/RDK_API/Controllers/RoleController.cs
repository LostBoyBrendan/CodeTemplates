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
    [RoutePrefix("api/Roles")]
    [EnableCors("*", "*", "*")]
    public class RoleController : ApiController
    {
        RoleManager<ApplicationRole> _roleManager = new RoleManager<ApplicationRole>(
        new RoleStore<ApplicationRole>(new DataAccess.Context.DataContext()));

        UserManager<ApplicationUser> _userManager = new UserManager<ApplicationUser>(
            new UserStore<ApplicationUser>(new DataAccess.Context.DataContext()));

        DataAccess.Context.DataContext _db = new DataAccess.Context.DataContext();

        [Authorize]
        [HttpGet]
        [Route("GetAll")]
        public List<ApplicationRole> GetAll()
        {
            try
            {
                var rolesList = new List<ApplicationRole>();

                rolesList = _roleManager.Roles.ToList();

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
        public async Task<IHttpActionResult> Create([FromBody]ApplicationRole request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await _roleManager.CreateAsync(request);

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
        public async Task<IHttpActionResult> Modify([FromBody]ApplicationRole request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                IdentityResult result = await _roleManager.UpdateAsync(request);

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

            ApplicationRole role = _roleManager.Roles.First(m => m.Id == id);

            var result = await _roleManager.DeleteAsync(role);

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