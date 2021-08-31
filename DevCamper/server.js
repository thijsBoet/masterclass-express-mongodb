const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const cors = require("cors")
const colors = require("colors")
const connectDB = require("./config/db")

dotenv.config({
    path: "./config/config.env"
})

connectDB();
const bootcamps = require('./routes/bootcamps')

const app = express();
app.use(cors());

// Dev logger middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// Mount router
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    server.close(() => process.exit(1))
})