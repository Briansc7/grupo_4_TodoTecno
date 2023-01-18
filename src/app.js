const express = require("express");
const path = require("path");
const mainRouter = require(path.resolve(__dirname, "./routes/main"));
const productsRouter = require(path.resolve(__dirname, "./routes/products"));

const app = express();

const PORT = 3000;

app.set("view engine", "ejs"); //motor de renderizado ejs
app.set("views", path.join(__dirname, "views"));
const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));


app.get("/register", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/users/register.html"))
})

app.get("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/users/login.html"))
})

app.get("/header", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/partials/header.html"))
})

app.get("/footer", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/partials/footer.html"))
})


app.use("/", mainRouter);
app.use("/products", productsRouter);

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));