using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using RootkitAuth.API.DTOs;
using System.Security.Claims;

namespace RootkitAuth.API.Controllers;

[Route("[controller]")]
[ApiController]
[Authorize(Roles = "Administrator")]
public class RoleController : Controller
{
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<IdentityUser> _userManager;

    public RoleController(RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
    {
        _roleManager = roleManager;
        _userManager = userManager;
    }

    [HttpPost("AddRole")]
    public async Task<IActionResult> AddRole([FromBody] RoleDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.RoleName))
        {
            return BadRequest("Role name cannot be empty.");
        }

        var roleExists = await _roleManager.RoleExistsAsync(dto.RoleName);
        if (roleExists)
        {
            return Conflict("Role already exists.");
        }

        var result = await _roleManager.CreateAsync(new IdentityRole(dto.RoleName));
        if (result.Succeeded)
        {
            return Ok($"Role '{dto.RoleName}' created successfully.");
        }

        return StatusCode(500, "An error occurred while creating the role.");
    }

    [HttpPost("AssignRoleToUser")]
    public async Task<IActionResult> AssignRoleToUser([FromBody] AssignRoleDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.UserEmail) || string.IsNullOrWhiteSpace(dto.RoleName))
        {
            return BadRequest("User email and role name are required.");
        }

        var user = await _userManager.FindByEmailAsync(dto.UserEmail);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        var roleExists = await _roleManager.RoleExistsAsync(dto.RoleName);
        if (!roleExists)
        {
            return NotFound("Role does not exist.");
        }

        var result = await _userManager.AddToRoleAsync(user, dto.RoleName);
        if (result.Succeeded)
        {
            return Ok($"Role '{dto.RoleName}' assigned to user '{dto.UserEmail}'.");
        }

        return StatusCode(500, "An error occurred while assigning the role.");
    }

    [HttpGet("WhoAmI")]
    [AllowAnonymous] // optional: change to [Authorize] if you want it protected
    public IActionResult WhoAmI(ClaimsPrincipal user)
    {
        if (!user.Identity?.IsAuthenticated ?? false)
            return Unauthorized("Not logged in.");

        var email = user.FindFirstValue(ClaimTypes.Email);
        var roles = user.Claims
            .Where(c => c.Type == ClaimTypes.Role)
            .Select(c => c.Value);

        return Ok(new
        {
            Email = email,
            Roles = roles
        });
    }
}