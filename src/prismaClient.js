import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter, log: process.env.NODE_ENV == "development" ? ["query", "error", "warn"] : ["error"] });



// It is not necessary to explicitly call $connect() thanks to the [lazy connect behavior] ($connect() is called for you under the hood)
// we're doing it to establish an early connection instead of waiting for lazy connection ( OPTIONAL )
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB connected via prisma");
  } catch (error) {
    console.error(`DB connection error: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

export {prisma, connectDB, disconnectDB};
