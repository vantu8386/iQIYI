import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
const app = express();
const port: number = 3000;

import categoryRouter from "./routes/category.routes";
import filmRouter from "./routes/movies.routes";
import usersRouter from "./routes/users.routes";
import commentsRouter from "./routes/comment.routes";
import adminMoviesRouter from "./routes/adminMovies.routes";
import albumRouter from "./routes/album.routes";


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/movies", filmRouter);
app.use("/api/v1/album", albumRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/comments", commentsRouter);
app.use("/api/v1/admin", adminMoviesRouter);


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
