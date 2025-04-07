using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieINTEX.Models
{
    public class MovieTitle
    {
        [Key]
        public string show_id { get; set; }
        [Required]
        public string? type { get; set; }
        public string? title { get; set; }
        public string? director { get; set; }
        public string? cast { get; set; }
        public string? country { get; set; }
        public int release_year { get; set; }
        public string? rating { get; set; }
        public string? duration { get; set; }
        public string? description { get; set; }

        // Genre/flag booleans
        public bool Action { get; set; }
        public bool Adventure { get; set; }


        [Column("Anime Series International TV Shows")]
        public bool AnimeSeriesInternationalTVShows { get; set; }

        [Column("British TV Shows Docuseries International TV Shows")]
        public bool BritishTVShowsDocuseriesInternationalTVShows { get; set; }
        public bool Children { get; set; }
        public bool Comedies { get; set; }

        [Column("Comedies Dramas International Movies")]
        public bool ComediesDramasInternationalMovies { get; set; }

        [Column("Comedies International Movies")]
        public bool ComediesInternationalMovies { get; set; }

        [Column("Comedies Romantic Movies")]
        public bool ComediesRomanticMovies { get; set; }

        [Column("Crime TV Shows Docuseries")]
        public bool CrimeTVShowsDocuseries { get; set; }
        public bool Documentaries { get; set; }

        [Column("Documentaries International Movies")]
        public bool DocumentariesInternationalMovies { get; set; }
        public bool Docuseries { get; set; }
        public bool Dramas { get; set; }

        [Column("Dramas International Movies")]
        public bool DramasInternationalMovies { get; set; }

        [Column("Dramas Romantic Movies")]
        public bool DramasRomanticMovies { get; set; }

        [Column("Family Movies")]
        public bool FamilyMovies { get; set; }
        public bool Fantasy { get; set; }

        [Column("Horror Movies")]
        public bool HorrorMovies { get; set; }

        [Column("International Movies Thrillers")]
        public bool InternationalMoviesThrillers { get; set; }

        [Column("International TV Shows Romantic TV Shows TV Dramas")]
        public bool InternationalTVShowsRomanticTVShowsTVDramas { get; set; }

        [Column("Kids' TV")]
        public bool KidsTV { get; set; }

        [Column("Language TV Shows")]
        public bool LanguageTVShows { get; set; }
        public bool Musicals { get; set; }

        [Column("Nature TV")]
        public bool NatureTV { get; set; }

        [Column("Reality TV")]
        public bool RealityTV { get; set; }
        public bool Spirituality { get; set; }

        [Column("TV Action")]
        public bool TVAction { get; set; }

        [Column("TV Comedies")]
        public bool TVComedies { get; set; }
         
        [Column("TV Dramas")]
        public bool TVDramas { get; set; }

        [Column("Talk Shows TV Comedies")]
        public bool TalkShowsTVComedies { get; set; }
        public bool Thrillers { get; set; }
    }
}