const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const dotenv = require("dotenv");
const bookRoutes = require("./routes/bookRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();


const app = express();
// app.use(
//     cors({
//         origin: process.env.ORIGIN || 'http://localhost:3000',
//         credentials: true,
//     })
// );

app.use(cors({ origin: "http://localhost:3000" }));


const MONGO_URI = "mongodb+srv://bookStoreAppServer:eyw1oPKpBpLva7np@bookstoreapp.eqwxrms.mongodb.net/?retryWrites=true&w=majority&appName=bookStoreApp";

// MongoDB client setup
async function run() {
    try {
        await mongoose.connect(MONGO_URI).then((data) => {
            console.log(`Database connected successfully with ${data.connection.host}`);
        });
    } catch (error) {
        console.log(error.message);
        setTimeout(5000);
        // Retry connection after 5 seconds
    }
};

run();

// route 
app.use("/api", bookRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));