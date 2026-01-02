import { prisma } from "../prismaClient.js";

// a user may view a movie or all the movies in the database
const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    if (movies.length == 0) {
      throw new Error("error fetching movies");
    }
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const getMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      return res.status(404).json({ message: "movie not found!" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// a user may add a movie if they have admin role
const addMovie = async (req, res) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "forbidden to add a movie" });
    }
    const { title, overview, genres, runtime, posterUrl, createdBy } = req.body;
    const newMovie = await prisma.movie.create({
      data: {
        title,
        overview,
        genres,
        runtime,
        posterUrl,
        createdBy,
      },
    });
    res.status(200).json({ message: `${newMovie.title} successfully added!`, movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
// a user may update a movie if they have admin role
const updateMovie = async (req, res) => {
  try {
    // check if user is the admin (later we can add an admin table)
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "forbidden to update that movie" });
    }
    const movieId = req.params.id;
    const { title, overview, genres, runtime, posterUrl, createdBy } = req.body;
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      return res.status(404).json({ message: "movie not found!" });
    }
    const updatedMovie = await prisma.movie.update({
      where: {
        id: movie,
      },
      data: { title, overview, genres, runtime, posterUrl, createdBy },
    });
    res.status(200).json({ message: `movie: "${updatedMovie.title}" has been updated!` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
// a user may delete a movie if they have admin role
const deleteMovie = async (req, res) => {
  try {
    // check if user is the admin (later we can add an admin table)
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "forbidden to update that movie" });
    }
    const movieId = req.params.id;
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      return res.status(404).json({ message: "movie not found!" });
    }
    const deletedMovie = await prisma.movie.delete({
      where: {
        id: movie,
      },
    });
    res.status(200).json({ message: `movie: "${deletedMovie.title}" has been updated!` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
export { getAllMovies, getMovie, addMovie, updateMovie, deleteMovie };
