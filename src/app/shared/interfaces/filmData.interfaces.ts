export interface IFilm {
  title: string;
  year: string;
  releaseDate: string;
  directors: IDirector[];
  writers: IWriter[];
  runtime: string;
  urlPoster: string;
  countries: [string];
  languages: [string];
  genres: [string];
  plot: string;
  simplePlot: string;
  idIMDB: string;
  urlIMDB: string;
  rating: string;
  metascore: string;
  rated: string;
  votes: string;
  type: string;
  ranking: number;
  favorite?: boolean;
}

export interface IDirector {
  name: string;
  id: string;
}

export interface IWriter {
  name: string;
  id: string;
}

export interface IFilmData {
  data: {
    movies: IFilm [];
  };
  about: {any};
}
