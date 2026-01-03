import { Router } from "express";
import { addMovie, deleteMovie, getAllMovies, getMovie, updateMovie } from "../../controllers/movieController.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { addMovieSchema, updateMovieSchema } from "../../validators/movieValidators.js";
import authMiddleware from "../../middleware/authmiddleware.js";

const router = Router();

// get all movies
router.get("/", getAllMovies);
// get a movie by id
router.get("/:id", getMovie);
// add a movie
router.post("/", authMiddleware, validateRequest(addMovieSchema), addMovie);
// update a movie by its id
router.patch("/:id", authMiddleware, validateRequest(updateMovieSchema), updateMovie);
// delete a movie by its id
router.delete("/:id", authMiddleware, deleteMovie);

export default router;
