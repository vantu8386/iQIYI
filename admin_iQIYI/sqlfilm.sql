CREATE DATABASE clone_iQIYI;

USE clone_iQIYI;

CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    passwords VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    avatarUser VARCHAR(255),
    isBlocked TINYINT(1) NOT NULL DEFAULT 0,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user' 
);

CREATE TABLE category (
    categoryId INT AUTO_INCREMENT PRIMARY KEY,
    categoryName VARCHAR(255) NOT NULL
);

CREATE TABLE movies (
    movieId INT AUTO_INCREMENT PRIMARY KEY,
    movie VARCHAR(255) NOT NULL,
    reviewUrl VARCHAR(255) NOT NULL,
    daoDien VARCHAR(255),
    dienVien TEXT,
    describes TEXT,
    namPhatHanh INT,
    ngayDangTai DATETIME, 
    searchCount INT DEFAULT 0,
    categoryId INT,
    FOREIGN KEY (categoryId) REFERENCES category(categoryId)
);


CREATE TABLE album (
    albumId INT AUTO_INCREMENT PRIMARY KEY,
    episode INT NOT NULL,
    url VARCHAR(255),
    searchCount INT DEFAULT 0,
    movieId INT,
    FOREIGN KEY (movieId) REFERENCES movies(movieId)
);

CREATE TABLE comments (
    commentId INT AUTO_INCREMENT PRIMARY KEY,
    comments TEXT NOT NULL,
	ngayComment DATETIME, 
    userId INT,
    albumId INT,
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (albumId) REFERENCES album(albumId)
);

ALTER TABLE album
ADD COLUMN searchCount INT DEFAULT 0;


ALTER TABLE users
ADD isBlocked TINYINT(1) NOT NULL DEFAULT 0;
