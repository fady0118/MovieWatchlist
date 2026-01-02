import { Router } from "express";
import { addMovie, deleteMovie, getAllMovies, getMovie, updateMovie } from "../../controllers/movieController.js";

const router = Router();

// get all movies
router.get("/", getAllMovies);
// add a movie
router.post("/", addMovie);
// get a movie by id
router.get("/:id", getMovie);
// update a movie by its id
router.patch("/:id", updateMovie);
// delete a movie by its id
router.delete("/:id", deleteMovie);

export default router;
