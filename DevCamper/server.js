const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const cors = require("cors")
const colors = require("colors")
const errorHandler = require("./middleware/error")
const connectDB = require("./config/db")
const app = express()

dotenv.config({
    path: "./config/config.env"
})

connectDB();

// Route Files
const bootcamps = require('./routes/bootcamps')
app.use(errorHandler)
app.use(express.json())
app.use(cors());
// Mount router
app.use('/api/v1/bootcamps', bootcamps)

// Dev logger middleware
if (process.env.NODE_ENV === "development") app.use(morgan("dev"))



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