using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieINTEX.Data;
using MovieINTEX.Models;

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
public IActionResult GetMoviesPaged(
    int pageSize = 10, 
    int pageNum = 1, 
    [FromQuery] List<string>? genreList = null, 
    [FromQuery] string? search = null)
{
    var query = _movieContext.movies_titles.AsQueryable();

    // Handle search filter (case-insensitive, null-safe)
    if (!string.IsNullOrWhiteSpace(search))
    {
        var trimmedSearch = search.Trim().ToLower();
        query = query.Where(m => m.title != null && m.title.ToLower().StartsWith(trimmedSearch));
    }

    // Handle genre filters
    if (genreList != null && genreList.Any())
    {
        foreach (var genre in genreList)
        {
            switch (genre)
            {
                case "Action":
                    query = query.Where(p => p.Action);
                    break;
                case "Adventure":
                    query = query.Where(p => p.Adventure);
                    break;
                case "Anime Series International TV Shows":
                    query = query.Where(p => p.AnimeSeriesInternationalTVShows);
                    break;
                case "British TV Shows Docuseries International TV Shows":
                    query = query.Where(p => p.BritishTVShowsDocuseriesInternationalTVShows);
                    break;
                case "Children":
                    query = query.Where(p => p.Children);
                    break;
                case "Comedies":
                    query = query.Where(p => p.Comedies);
                    break;
                case "Comedies Dramas International Movies":
                    query = query.Where(p => p.ComediesDramasInternationalMovies);
                    break;
                case "Comedies International Movies":
                    query = query.Where(p => p.ComediesInternationalMovies);
                    break;
                case "Comedies Romantic Movies":
                    query = query.Where(p => p.ComediesRomanticMovies);
                    break;
                case "Crime TV Shows Docuseries":
                    query = query.Where(p => p.CrimeTVShowsDocuseries);
                    break;
                case "Documentaries":
                    query = query.Where(p => p.Documentaries);
                    break;
                case "Documentaries International Movies":
                    query = query.Where(p => p.DocumentariesInternationalMovies);
                    break;
                case "Docuseries":
                    query = query.Where(p => p.Docuseries);
                    break;
                case "Dramas":
                    query = query.Where(p => p.Dramas);
                    break;
                case "Dramas International Movies":
                    query = query.Where(p => p.DramasInternationalMovies);
                    break;
                case "Dramas Romantic Movies":
                    query = query.Where(p => p.DramasRomanticMovies);
                    break;
                case "Family Movies":
                    query = query.Where(p => p.FamilyMovies);
                    break;
                case "Fantasy":
                    query = query.Where(p => p.Fantasy);
                    break;
                case "Horror Movies":
                    query = query.Where(p => p.HorrorMovies);
                    break;
                case "International Movies Thrillers":
                    query = query.Where(p => p.InternationalMoviesThrillers);
                    break;
                case "International TV Shows Romantic TV Shows TV Dramas":
                    query = query.Where(p => p.InternationalTVShowsRomanticTVShowsTVDramas);
                    break;
                case "Kids' TV":
                    query = query.Where(p => p.KidsTV);
                    break;
                case "Language TV Shows":
                    query = query.Where(p => p.LanguageTVShows);
                    break;
                case "Musicals":
                    query = query.Where(p => p.Musicals);
                    break;
                case "Nature TV":
                    query = query.Where(p => p.NatureTV);
                    break;
                case "Reality TV":
                    query = query.Where(p => p.RealityTV);
                    break;
                case "Spirituality":
                    query = query.Where(p => p.Spirituality);
                    break;
                case "TV Action":
                    query = query.Where(p => p.TVAction);
                    break;
                case "TV Comedies":
                    query = query.Where(p => p.TVComedies);
                    break;
                case "TV Dramas":
                    query = query.Where(p => p.TVDramas);
                    break;
                case "Talk Shows TV Comedies":
                    query = query.Where(p => p.TalkShowsTVComedies);
                    break;
                case "Thrillers":
                    query = query.Where(p => p.Thrillers);
                    break;
                default:
                    break;
            }
        }
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
    // Create a list to hold the genre names
    var genreList = new List<string>();

    // Iterate through each movie title and add genres based on the boolean flags
    foreach (var movie in _movieContext.movies_titles)
    {
        if (movie.Action) genreList.Add("Action");
        if (movie.Adventure) genreList.Add("Adventure");
        if (movie.AnimeSeriesInternationalTVShows) genreList.Add("Anime Series International TV Shows");
        if (movie.BritishTVShowsDocuseriesInternationalTVShows) genreList.Add("British TV Shows Docuseries International TV Shows");
        if (movie.Children) genreList.Add("Children");
        if (movie.Comedies) genreList.Add("Comedies");
        if (movie.ComediesDramasInternationalMovies) genreList.Add("Comedies Dramas International Movies");
        if (movie.ComediesInternationalMovies) genreList.Add("Comedies International Movies");
        if (movie.ComediesRomanticMovies) genreList.Add("Comedies Romantic Movies");
        if (movie.CrimeTVShowsDocuseries) genreList.Add("Crime TV Shows Docuseries");
        if (movie.Documentaries) genreList.Add("Documentaries");
        if (movie.DocumentariesInternationalMovies) genreList.Add("Documentaries International Movies");
        if (movie.Docuseries) genreList.Add("Docuseries");
        if (movie.Dramas) genreList.Add("Dramas");
        if (movie.DramasInternationalMovies) genreList.Add("Dramas International Movies");
        if (movie.DramasRomanticMovies) genreList.Add("Dramas Romantic Movies");
        if (movie.FamilyMovies) genreList.Add("Family Movies");
        if (movie.Fantasy) genreList.Add("Fantasy");
        if (movie.HorrorMovies) genreList.Add("Horror Movies");
        if (movie.InternationalMoviesThrillers) genreList.Add("International Movies Thrillers");
        if (movie.InternationalTVShowsRomanticTVShowsTVDramas) genreList.Add("International TV Shows Romantic TV Shows TV Dramas");
        if (movie.KidsTV) genreList.Add("Kids' TV");
        if (movie.LanguageTVShows) genreList.Add("Language TV Shows");
        if (movie.Musicals) genreList.Add("Musicals");
        if (movie.NatureTV) genreList.Add("Nature TV");
        if (movie.RealityTV) genreList.Add("Reality TV");
        if (movie.Spirituality) genreList.Add("Spirituality");
        if (movie.TVAction) genreList.Add("TV Action");
        if (movie.TVComedies) genreList.Add("TV Comedies");
        if (movie.TVDramas) genreList.Add("TV Dramas");
        if (movie.TalkShowsTVComedies) genreList.Add("Talk Shows TV Comedies");
        if (movie.Thrillers) genreList.Add("Thrillers");
    }

    // Remove duplicates and return the result
    var distinctGenres = genreList.Distinct().ToList();
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
        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] MovieTitle newMovie)
        {
            _movieContext.movies_titles.Add(newMovie);
            _movieContext.SaveChanges();
            return Ok(newMovie);
        }
    }
}
