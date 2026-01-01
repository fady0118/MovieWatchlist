import express from "express";
import { prisma, connectDB, disconnectDB } from "./prismaClient.js";
const PORT = process.env.PORT || 8000;
const app = express();

connectDB();

// body parsing middleware
app.use(express.json()); // parse json req body
app.use(express.urlencoded({ extended: true }));
// import middleware
import authMiddleware from './middleware/authmiddleware.js'
// import routes
import movieRouter from "./Routes/crudRoutes/movieRoutes.js";
import userRouter from "./Routes/crudRoutes/userRoutes.js";
import authRouter from "./Routes/authRoutes/authRoutes.js";
// API routes
//Auth
app.use("/auth", authRouter);
//CRUD
app.use("/movies", authMiddleware,movieRouter);
app.use("/users", authMiddleware, userRouter);

app.use('/testPrisma', async(req, res)=>{
const result = await prisma.$queryRaw`SELECT 1`;
console.log(result);
})

app.use("/", (req, res) => {
  res.json({ message: "test test test" });
});

// start server
app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});

// calling disconnect after every request doesn't make sense and will slow things down
// we will call it only in some cases

// handle unhandled promise rejections (e.g database connection errors, )
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
// handle uncaught exceptions
process.on("uncaughtException", async (error) => {
  console.error("Unhandled Exception:", err);
  await disconnectDB();
  process.exit(1);
});
// graceful shutdown
process.on("SIGTERM", () => {
  console.error("SIGTERM recieved, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
