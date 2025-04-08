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

        // Get movies with pagination
        [HttpGet("GetMovies")]
        public IActionResult GetMoviesPaged(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? genreList = null)
        {
            var query = _movieContext.movies_titles.AsQueryable();
    
            // If genres are provided, filter by them
            if (genreList != null && genreList.Any())
            {
                query = query.Where(p => genreList.Any(genre => p.genres.Contains(genre)));  // Use Contains for partial genre matches
            } 
            
            var totalNumMovies = query.Count();

            var movies = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                movies = movies,
                totalNumMovies = totalNumMovies
            });
        }
        
        [HttpGet("GetGenres")]
        public IActionResult GetGenres()
        {
            // First, retrieve the genres as a list of strings from the database.
            var genreList = _movieContext.movies_titles
                .Select(g => g.genres)
                .ToList();  // Execute the query to retrieve the raw data

            // Split the genres, trim spaces, remove duplicates, and filter out empty strings.
            var distinctGenres = genreList
                .SelectMany(g => g.Split(','))  // Split genres by comma (or another delimiter)
                .Select(g => g.Trim())  // Trim spaces
                .Where(g => !string.IsNullOrEmpty(g))  // Filter out empty strings
                .Distinct()  // Ensure uniqueness
                .ToList();

            return Ok(distinctGenres);
        }


        // Get all ratings
        [HttpGet("GetRatings")]
        public IActionResult GetRatings()
        {
            var ratings = _movieContext.movies_ratings.ToList();
            return Ok(ratings);
        }

        // Get all users
        [HttpGet("GetUsers")]
        public IActionResult GetUsers()
        {
            var users = _movieContext.movies_users.ToList();
            return Ok(users);
        }

        // Get a single movie by show_id
        [HttpGet("GetMovie/{id}")]
        public IActionResult GetMovie(string id)
        {
            var movie = _movieContext.movies_titles.FirstOrDefault(m => m.show_id == id);
            if (movie == null)
            {
                return NotFound();
            }
            return Ok(movie);
        }
    }
}
