using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieINTEX.API.Data;

public class Recommendations
{
    [Key]
    public string show_id { get; set; }
    public string title { get; set; }
    public string Recommendation_1 { get; set; }
    public string Recommendation_2 { get; set; }
    public string Recommendation_3 { get; set; }
    public string Recommendation_4 { get; set; }
    public string Recommendation_5 { get; set; }
}