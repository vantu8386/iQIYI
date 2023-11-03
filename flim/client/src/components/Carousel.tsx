import React, { useState, useEffect } from "react";
import instance from "../api/axios";
import { AllFilm } from "../entities/film.entiti";

const Carousel: React.FC = () => {
  const [images, setImages] = useState<AllFilm[]>([]);
  const [latestImages, setLatestImages] = useState<AllFilm[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    instance
      .get("movies")
      .then((response) => {
        setImages(response.data.movies);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }, []);

  useEffect(() => {
    // Lấy 3 hình ảnh mới nhất từ mảng `images`
    const latestImages = images.slice(Math.max(images.length - 3, 0));
    setLatestImages(latestImages);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % latestImages.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images]);

  return (
    <div className="carousel-container h-screen w-full">
      <img className="w-full h-full" src={latestImages[currentIndex]?.image} />
      <div className="image-title w-96">
        <div className="movie-name font-bold">{latestImages[currentIndex]?.movie}</div>
        <div>
          <p className="line-clamp-3">{latestImages[currentIndex]?.describes}</p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
