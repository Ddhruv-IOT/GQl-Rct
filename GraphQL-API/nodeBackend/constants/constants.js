import dotenv from "dotenv";
dotenv.config();

const constants = {
  PORT: process.env.PORT || 4000,
  FRONTEND_URL: process.env.FRONTEND_URL || "https://localhost:5173",
};

// Export the constants for ES6 syntax
export const { PORT, FRONTEND_URL } = constants;
