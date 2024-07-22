using API.Controllers;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API;

public class BuggyController(DataContext context): BaseApiController
{
    [Authorize]
    [HttpGet("auth")]
    public ActionResult<string> GetAuth()
    {
        return "";
    }

    [HttpGet("not-found")]
    public ActionResult<AppUser?> GetNotFound()
    {
        var notfound = context.Users.Find(1000000000);
        if (notfound == null) return NotFound();
        return notfound;
    }

    [HttpGet("server-error")]
    public ActionResult<AppUser> GetServerError()
    {
        var notfound = context.Users.Find(1000000000) ?? throw new Exception("A server error created");
        
        return notfound;

    }
    [HttpGet("bad-request")]
    public ActionResult<string> GetBadRequest()
    {
        return BadRequest();
    }
}
