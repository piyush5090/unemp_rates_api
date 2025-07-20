const express = require('express');
const cors = require("cors");
require("dotenv").config();
const app = express();

const unemployementRoutes = require("./routes/unemployement");

app.use(cors());
app.use(express.json());

app.use("/api/unemployment", unemployementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server working on port 5000");
});