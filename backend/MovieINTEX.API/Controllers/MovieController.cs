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

        [HttpGet("GetMovies")]
        public IActionResult GetMoviesPaged(int pageSize = 10, int pageNum = 1)
        {
            var totalNumMovies = _movieContext.movies_titles.Count();

            var movies = _movieContext.movies_titles
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                movies = movies,
                totalNumMovies = totalNumMovies
            });
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