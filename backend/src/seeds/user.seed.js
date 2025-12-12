import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Celebrities / Characters
  {
    email: "hermione.granger@example.com",
    fullName: "Hermione Granger",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/31.jpg",
  },
  {
    email: "daenerys.targaryen@example.com",
    fullName: "Daenerys Targaryen",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    email: "black.widow@example.com",
    fullName: "Natasha Romanoff",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    email: "rey.skywalker@example.com",
    fullName: "Rey Skywalker",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/34.jpg",
  },
  {
    email: "katniss.everdeen@example.com",
    fullName: "Katniss Everdeen",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/35.jpg",
  },
  {
    email: "mulan@example.com",
    fullName: "Mulan",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/36.jpg",
  },
  {
    email: "laracroft@example.com",
    fullName: "Lara Croft",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/37.jpg",
  },
  {
    email: "eleven.strangerthings@example.com",
    fullName: "Eleven",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/38.jpg",
  },

  // Male Celebrities / Characters
  {
    email: "harry.potter@example.com",
    fullName: "Harry Potter",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    email: "tony.stark@example.com",
    fullName: "Tony Stark",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    email: "thor.odinson@example.com",
    fullName: "Thor Odinson",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    email: "steve.rogers@example.com",
    fullName: "Steve Rogers",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    email: "luke.skywalker@example.com",
    fullName: "Luke Skywalker",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/35.jpg",
  },
  {
    email: "katniss.everdeen.partner@example.com",
    fullName: "Peeta Mellark",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    email: "jack.sparrow@example.com",
    fullName: "Jack Sparrow",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/37.jpg",
  },
  {
    email: "sherlock.holmes@example.com",
    fullName: "Sherlock Holmes",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/38.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
