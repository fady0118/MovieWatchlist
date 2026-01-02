import { Router } from "express";
import { addMovie, deleteMovie, getAllMovies, getMovie, updateMovie } from "../../controllers/movieController.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { addMovieSchema, updateMovieSchema } from "../../validators/movieValidators.js";

const router = Router();

// get all movies
router.get("/", getAllMovies);
// add a movie
router.post("/", validateRequest(addMovieSchema), addMovie);
// get a movie by id
router.get("/:id", getMovie);
// update a movie by its id
router.patch("/:id", validateRequest(updateMovieSchema), updateMovie);
// delete a movie by its id
router.delete("/:id", deleteMovie);

export default router;
