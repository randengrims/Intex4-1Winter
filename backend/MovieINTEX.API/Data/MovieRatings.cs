using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieINTEX.Models
{
    public class MovieRating
    {
        [Key]
        public string user_id { get; set; }

        [ForeignKey("MovieTitle")]
        public string show_id { get; set; }

        public int? rating { get; set; }
    }
}