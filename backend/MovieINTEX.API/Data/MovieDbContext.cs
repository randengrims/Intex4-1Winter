using Microsoft.EntityFrameworkCore;
using MovieINTEX.Models;

namespace MovieINTEX.Data
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options) { }

        public DbSet<MovieTitle> movies_titles { get; set; }
        public DbSet<MovieRating> movies_ratings { get; set; }
        public DbSet<MovieUser> movies_users { get; set; }

    }
}