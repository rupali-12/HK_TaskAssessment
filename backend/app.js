const express = require("express");
const db = require("./config/db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;
// console.log(process.env.PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
