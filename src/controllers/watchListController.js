import { prisma } from "../prismaClient.js";

const getAllWatchListController = async (req, res) => {
  try {
    // we should fetch from watchListItem table all items linked to the user
    // we know the user making the request via his token
    // the middleware verified the token and extracted the userId
    const userId = req.userId;
    const userWatchList = await prisma.watchlistItem.findMany({
      where: {
        userId: userId,
      },
    });
    res.status(200).json({ message: "successful fetch", data: userWatchList });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const addToWatchListController = async (req, res) => {
  // we will create a watchlistItem using the reqbody
  // and attach it the userId of the user making the req
  try {
    const { movieId, status, rating, notes } = req.body;
    const userId = req.userId;
    // verify movie exists in the movie table
    if (!movieId) {
      return res.status(400).json({ message: "no movie selected" });
    }
    const movieExists = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!movieExists) {
      return res.status(404).json({ message: "requested movie not found" });
    }
    // check if already added
    const existingInUserWatchlist = await prisma.watchlistItem.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });
    if (existingInUserWatchlist) {
      return res.status(400).json({ message: "movie already exists in watchlist" });
    }
    const watchListItem = await prisma.watchlistItem.create({
      data: { userId, movieId, status: status || "PLANNED", rating, notes },
    });
    res.status(201).json({ message: "item added to watchlist", watchListItem });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export { getAllWatchListController, addToWatchListController };
