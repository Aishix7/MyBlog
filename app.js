const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();
// register view engine
//connect to mongoDB
const dbURI =
  "mongodb+srv://netninja:task1234@nodetuts.ekv1qa6.mongodb.net/?retryWrites=true&w=majority&appName=nodetuts";
mongoose
  .connect(dbURI)
  // listen for requests
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
app.set("view engine", "ejs");
// from local host

//middleware & static
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   console.log("new request made:");
//   console.log("host:", req.hostname);
//   console.log("path:", req.path);
//   console.log("method:", req.method);
//   next();
// });
// app.get("/", (req, res) => {
//   console.log("in the next middleware");
//   next();
// });
app.use(morgan("dev"));

// mongoose and mongo sandbox routes
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "new blog 2",
//     snippet: "about my new blog",
//     body: "more about my new blog",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("66378fd136166495130d0e3e")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.get("/", (req, res) => {
  // res.send("<p>home page</p>");
  // res.sendFile("./views/index.html", { root: __dirname });
  // res.render("index");
  // const blogs = [
  //   {
  //     title: "Yoshi finds eggs",
  //     snippet: "lorem ipsum dolor sit amet consectetur",
  //   },
  //   {
  //     title: "Mario finds stars",
  //     snippet: "lorem ipsum dolor sit amet consectetur",
  //   },
  //   {
  //     title: "How to defeat bowser",
  //     snippet: "lorem ipsum dolor sit amet consectetur",
  //   },
  // ];
  // res.render("index", { title: "Home", blogs });
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  // res.send("<p>about page</p>");
  // res.sendFile("./views/about.html", { root: __dirname });
  // res.render("about");
  res.render("about", { title: "About" });
});
// blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  // res.status(400).sendFile("./views/404.html", { root: __dirname });
  // res.status(404).render("404");
  res.status(404).render("404", { title: "Error 404" });
}); // should always be at the very bottom
