export type AllFilm = {
  movieId: number;
  movie: string;
  reviewUrl: string;
  image: string;
  daoDien: string;
  dienVien: string;
  describes: string;
  namPhatHanh: number;
  ngayDangTai: string;
  categoryId: number;
};

export type Album = {
  daoDien: string;
  dienVien: string;
  describes: string;
  namPhatHanh: number;
  ngayDangTai: string;
  reviewUrl: string;
  albumId: number;
  movie: string;
  episode: number;
  url: string;
};
export type PlayOne = {
  albumId: number;
  episode: number;
  url: string;
  movie: string;
  daoDien: string;
  dienVien: string;
  moTa: string;
  namPhatHanh: number;
  ngayDangTai: string;
};

export type SearchMovie = {
  message: string;
  categoryName: string;
  daoDien: string;
  dienVien: string;
  movie: string;
  movieId: number;
  namPhatHanh: number;
  reviewUrl: string;
  image: string;
};

export interface SearchState {
  searchMessage: string;
}

export interface Rankes {
  movieId: number;
  searchCount: number;
  movie: string;
}
