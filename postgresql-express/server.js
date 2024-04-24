require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
// const pool = require("./src/db/db.js");
const auth = require("./src/routers/auth.js");
const users = require("./src/routers/users.js");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000000,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const getProducts = (req, res) => {
//   pool.query("SELECT * FROM products", (error, products) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(products.rows);
//   });
// };

// app.get("/products", getProducts);

app.use("/auth", auth);
app.use("/users", users);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
