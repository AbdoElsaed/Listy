const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); // logger
const path = require("path");

const app = express();

// require("dotenv").config();
require("./db/mongoose");

const port = process.env.PORT || 5000;

// admin panel route
const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);

app.use(express.static(path.join(__dirname, "..", "build")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

const userRoutes = require("./routes/user");
const itemRoutes = require("./routes/item");
const listRoutes = require("./routes/list");

const baseRoute = "/api/v1/";
const generateApiRoute = (route) => `${baseRoute}${route}`;

app.use(generateApiRoute("user"), userRoutes);
app.use(generateApiRoute("item"), itemRoutes);
app.use(generateApiRoute("list"), listRoutes);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(port, () => console.log(`server started on port ${port}`));
