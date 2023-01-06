import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRouter";
import reviewRoutes from "./src/routes/reviewRouter";
import recordRoutes from "./src/routes/recordsRouter";
import morgan from "morgan";
import jwt from "jsonwebtoken";
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers-Origin, Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);
app.use("/records", recordRoutes);

app.get("/", (req, res) => {
  res.json("Welcome to API remixUp");
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});
