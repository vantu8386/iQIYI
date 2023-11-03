export type AllFilm = {
    movieId: number;
    movie: string;
    reviewUrl: string;
    daoDien: string;
    dienVien: string;
    describes: string;
    namPhatHanh: number;
    ngayDangTai: string;
    categoryId: number;
    categoryName: string;
    tapPhim: string;
    searchCount: number;
    image: string;
  };

  export type AddMovie = {
    movie: string;
    reviewUrl: string;
    image: string;
    daoDien: string;
    dienVien: string;
    describes: string;
    namPhatHanh: number;
    categoryId: number;
  }