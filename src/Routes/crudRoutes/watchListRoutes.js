import { Router } from "express";
import { addToWatchListController, getAllWatchListController } from "../../controllers/watchListController.js";

const router = Router();

// get the entire watchlist of a signed user
router.get("/", getAllWatchListController);
// create new watchlist item
router.post("/", addToWatchListController);
// // update watchlist item
// router.patch("/:id",);
// // delete watchlist item
// router.delete("/:id", (req, res) => {});

export default router;
