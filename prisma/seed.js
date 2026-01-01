import { PrismaClient } from "../src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const christopher_nolan_user_id = "6ae4d188-3a45-4713-9f8d-60293c1bf070";

const movies = [
  {
    "title": "Inception",
    "overview": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    "releaseYear": 2010,
    "genres": ["Action", "Science Fiction", "Thriller"],
    "runtime": 148,
    "posterUrl": "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    "createdBy": christopher_nolan_user_id
  },
  {
    "title": "The Dark Knight",
    "overview": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    "releaseYear": 2008,
    "genres": ["Drama", "Action", "Crime", "Thriller"],
    "runtime": 152,
    "posterUrl": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    "createdBy": christopher_nolan_user_id
  },
  {
    "title": "Interstellar",
    "overview": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    "releaseYear": 2014,
    "genres": ["Adventure", "Drama", "Science Fiction"],
    "runtime": 169,
    "posterUrl": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    "createdBy": christopher_nolan_user_id
  },
  {
    "title": "The Prestige",
    "overview": "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
    "releaseYear": 2006,
    "genres": ["Drama", "Mystery", "Thriller"],
    "runtime": 130,
    "posterUrl": "https://image.tmdb.org/t/p/w500/bdN3gXuIZYaJP7ftKK2sU0nPtEA.jpg",
    "createdBy": christopher_nolan_user_id
  },
  {
    "title": "Memento",
    "overview": "A man with short-term memory loss attempts to track down his wife's murderer.",
    "releaseYear": 2000,
    "genres": ["Mystery", "Thriller"],
    "runtime": 113,
    "posterUrl": "https://image.tmdb.org/t/p/w500/yuNs09hvpHVU1cBTCAk9zxsL2oW.jpg",
    "createdBy": christopher_nolan_user_id
  },
  {
    "title": "The Dark Knight Rises",
    "overview": "Eight years after the Joker's reign of anarchy, Batman is forced from his exile to save Gotham City from the brutal guerrilla terrorist Bane.",
    "releaseYear": 2012,
    "genres": ["Action", "Crime", "Drama", "Thriller"],
    "runtime": 165,
    "posterUrl": "https://image.tmdb.org/t/p/w500/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg",
    "createdBy": christopher_nolan_user_id
  },
  {
    "title": "Batman Begins",
    "overview": "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
    "releaseYear": 2005,
    "genres": ["Action", "Crime", "Drama"],
    "runtime": 140,
    "posterUrl": "https://image.tmdb.org/t/p/w500/4MpN4kIEqUjW8OPtOQJXlTdHiJV.jpg",
    "createdBy": christopher_nolan_user_id
  },
  {
    "title": "Dunkirk",
    "overview": "Allied soldiers from Belgium, the British Commonwealth and Empire, and France are surrounded by the German Army and evacuated during a fierce battle in World War II.",
    "releaseYear": 2017,
    "genres": ["War", "Action", "Drama", "History"],
    "runtime": 106,
    "posterUrl": "https://image.tmdb.org/t/p/w500/ebSnODDg9lbsMIaWg2uAbjn7TO5.jpg",
    "createdBy": christopher_nolan_user_id
  },
  {
    "title": "Tenet",
    "overview": "Armed with only one word and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
    "releaseYear": 2020,
    "genres": ["Action", "Thriller", "Science Fiction"],
    "runtime": 150,
    "posterUrl": "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
    "createdBy": christopher_nolan_user_id
  },
  {
    "title": "Oppenheimer",
    "overview": "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    "releaseYear": 2023,
    "genres": ["Drama", "History"],
    "runtime": 180,
    "posterUrl": "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    "createdBy": christopher_nolan_user_id
  }
]

async function seedMovies() {
  // Test the connection first
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
  console.log("seeding movies...");
  for (let item of movies) {
    const createdMovie = await prisma.movie.create({
      data: item,
    });
    console.log(`added movie: ${item.title} to db`);
  }
  console.log("seeding complete");
}
seedMovies()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
