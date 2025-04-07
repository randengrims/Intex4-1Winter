using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MovieINTEX.Models
{
    public class MovieUser
    {
        [Key]
        public int user_id { get; set; }
        [Required]
        public string? name { get; set; }
        public string? phone { get; set; }
        public string? email { get; set; }
        public string? age { get; set; }
        public string? gender { get; set; }
        public bool Netflix { get; set; }
        [Column("Amazon Prime")]
        public bool AmazonPrime { get; set; }
        [Column("Disney+")]
        public bool DisneyPlus { get; set; }
        [Column("Paramount+")]
        public bool ParamountPlus { get; set; }
        public bool Max { get; set; }
        public bool Hulu { get; set; }
        [Column("Apple TV+")]
        public bool AppleTVPlus { get; set; }
        public bool Peacock { get; set; }
        public string? city { get; set; }
        public string? state { get; set; }
        public string? zip { get; set; }
    }
}