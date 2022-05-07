import express from "express";
import cors from "cors";
import morganLogger from "morgan";

import userRoute from "./routes/user.route.js";
import roomRoute from "./routes/room.route.js";
import deviceRoute from "./routes/device.route.js";
import recordRoute from "./routes/record.route.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morganLogger("dev"));
//setup duong truyen cc

app.use("/user", userRoute);
app.use("/room", roomRoute);
app.use("/device", deviceRoute);
app.use("/record", recordRoute);

export default app;
