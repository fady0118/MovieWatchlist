import { Router } from "express";
import { addToWatchListController, deleteWatchListItemController, getWatchListController, getWatchlistItemController, updateWatchListItemController } from "../../controllers/watchListController.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { addToWatchListSchema, updateWatchlistSchema } from "../../validators/watchlistValidators.js";

const router = Router();

// get the entire watchlist of a signed user
router.get("/", getWatchListController);
// get one watchlist item of a signed user
router.get("/:id", getWatchlistItemController);
// create new watchlist item
router.post("/", validateRequest(addToWatchListSchema), addToWatchListController);

// update watchlist item
router.patch("/:id", validateRequest(updateWatchlistSchema), updateWatchListItemController);
// // delete watchlist item
router.delete("/:id", deleteWatchListItemController);

export default router;
