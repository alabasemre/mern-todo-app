const express = require("express");
const cors = require("cors");
const path = require("path");
const { mongoConnect } = require("./services/mongo");
const { errorHandler } = require("./middleware/errorMiddleware");

require("dotenv").config();

const userRouter = require("./routes/user/user.router");
const todoRouter = require("./routes/todo/todo.router");

const app = express();

app.use(cors());
app.use(express.json());

async function startServer() {
    await mongoConnect();
    app.listen(process.env.PORT || 8000, () => {
        console.log("Server started on 8000");
    });
}

app.use("/users", userRouter);
app.use("/todos", todoRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "build")));

    app.get("/*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => res.send("Site bakımda!"));
}

app.use(errorHandler);

startServer();
