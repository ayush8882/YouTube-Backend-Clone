const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");

const corsConfig = require("./config/cors");
const baseRoutes = require("./routes");
const { DBconnection } = require("./config/mongodb");

DBconnection();

const app = express();
app.use(cors());

app.use(cors(corsConfig));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.json());

app.use(
  fileupload({
    createParentPath: true,
  }),
);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`We are live on ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.use("/api", baseRoutes);
