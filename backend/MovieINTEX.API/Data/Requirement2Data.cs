using System.ComponentModel.DataAnnotations;

namespace MovieINTEX.API.Data;

public class Requirement2Data
{
    [Key]
    public string Genre { get; set; }
    public string Recommendation_1 { get; set; }
    public string Recommendation_2 { get; set; }
    public string Recommendation_3 { get; set; }
    public string Recommendation_4 { get; set; }
    public string Recommendation_5 { get; set; }
    public string Recommendation_6 { get; set; }
    public string Recommendation_7 { get; set; }
    public string Recommendation_8 { get; set; }
    public string Recommendation_9 { get; set; }
    public string Recommendation_10 { get; set; }
}