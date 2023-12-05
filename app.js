import express from "express";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import "dotenv/config";
import session from "express-session";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import cors from "cors";
mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
// mongoose.connect("mongodb+srv://starazi:Milou911@cluster0.pyzc3u1.mongodb.net/");
const app = express();
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
app.use(
    session(sessionOptions)
);  
app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
app.listen(4000);


// // const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
// mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
// const app = express();
// app.use(cors());
// // app.use(
// //     cors({
// //         credentials: true,
// //         origin: process.env.FRONTEND_URL
// //     })
// // );
// // const sessionOptions = {
// //     secret: "any string",
// //     resave: false,
// //     saveUninitialized: false,
// // };
// // if (process.env.NODE_ENV !== "development") {
// //     sessionOptions.proxy = true;
// //     sessionOptions.cookie = {
// //         sameSite: "none",
// //         secure: true,
// //     };
// // };
// // app.use(session(sessionOptions));  
// app.use(express.json());
// UserRoutes(app);
// ModuleRoutes(app);
// CourseRoutes(app);
// Lab5(app);
// app.listen(process.env.PORT || 4000);