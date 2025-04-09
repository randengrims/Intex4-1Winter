export interface Movie {
  show_id: string;
  type: string;
  title: string;
  director: string;
  cast: string;
  country: string;
  release_year: number;
  rating: string;
  duration: string;
  description: string;
  genres: string;
  
  // Boolean fields for genres
  Action: boolean;
  Adventure: boolean;
  AnimeSeriesInternationalTVShows: boolean;
  BritishTVShowsDocuseriesInternationalTVShows: boolean;
  Children: boolean;
  Comedies: boolean;
  ComediesDramasInternationalMovies: boolean;
  ComediesInternationalMovies: boolean;
  ComediesRomanticMovies: boolean;
  CrimeTVShowsDocuseries: boolean;
  Documentaries: boolean;
  DocumentariesInternationalMovies: boolean;
  Docuseries: boolean;
  Dramas: boolean;
  DramasInternationalMovies: boolean;
  DramasRomanticMovies: boolean;
  FamilyMovies: boolean;
  Fantasy: boolean;
  HorrorMovies: boolean;
  InternationalMoviesThrillers: boolean;
  InternationalTVShowsRomanticTVShowsTVDramas: boolean;
  KidsTV: boolean;
  LanguageTVShows: boolean;
  Musicals: boolean;
  NatureTV: boolean;
  RealityTV: boolean;
  Spirituality: boolean;
  TVAction: boolean;
  TVComedies: boolean;
  TVDramas: boolean;
  TalkShowsTVComedies: boolean;
  Thrillers: boolean;
}