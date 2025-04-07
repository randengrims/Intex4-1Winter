using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieINTEX.Data;

namespace MovieINTEX.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class MovieController : ControllerBase
    {
        private MovieDbContext _movieContext;
        public MovieController(MovieDbContext temp)
        {
            _movieContext = temp;
        }

        // Get Movies (Distinct titles)
        [HttpGet("GetMovies")]
        public IActionResult GetMovies()
        {
            // Return distinct genre types as a list of strings
            var movies = _movieContext.movies_titles.ToList();

            return Ok(movies);
        }

        // Get Ratings
        [HttpGet("GetRatings")]
        public IActionResult GetRatings()
        {
            var ratings = _movieContext.movies_ratings.ToList();

            return Ok(ratings);
        }

        // Get Users
        [HttpGet("GetUsers")]
        public IActionResult GetUsers()
        {
            // Return distinct user names
            var users = _movieContext.movies_users.ToList();

            return Ok(users);
        }
    }
}