import { z } from "zod";

const addToWatchListSchema = z.object({
  movieId: z.string().uuid(),
  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
      error: () => {
        message: "Status must be one of PLANNED, WATCHING, COMPLETED, DROPPED";
      },
    })
    .optional(),
  rating: z.coerce.number().int("Rating must be an integer").min(1, "Rating must not be less than 1").max(10, "Rating must not exceed 10").optional(),
  notes: z.string().optional(),
});

const updateWatchlistSchema = z.object({
  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
      error: () => {
        message: "Status must be one of PLANNED, WATCHING, COMPLETED, DROPPED";
      },
    })
    .optional(),
  rating: z.coerce.number().int("Rating must be an integer").min(1, "Rating must not be less than 1").max(10, "Rating must not exceed 10").optional(),
  notes: z.string().optional(),
});
export { addToWatchListSchema, updateWatchlistSchema };
