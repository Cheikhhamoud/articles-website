//  To controll ur website

const express = require("express");
const helmet = require("helmet");
const app = express();
const dotenv = require("dotenv");
dotenv.config()

 

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// To import routes file
const allArticlesRouter = require("./routes/all-articles");

// for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, () => console.log('db conected'));

//helmet
app.use(helmet())

// PORT
const port = process.env.PORT
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//Routes

app.get("/", (req, res) => {
  res.redirect("/all-articles");
});

app.get("/add-new-article", (req, res) => {
  res.render("add-new-article", { mytitle: "create new article" });
});

// all-articles PATH
app.use("/all-articles", allArticlesRouter);

//  404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});
