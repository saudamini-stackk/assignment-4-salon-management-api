const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const salonRoutes = require("./routes/salonRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const logger = require("./middleware/logger");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(logger);

app.use("/", authRoutes);
app.use("/salons", salonRoutes);
app.use("/services", serviceRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Salon APIs"
    });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});