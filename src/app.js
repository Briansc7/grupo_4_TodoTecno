const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));



app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/index.html"))
})

app.get("/productDetail", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/productDetail.html"))
})

app.get("/productCart", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/productCart.html"))
})

app.get("/register", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/register.html"))
})

app.get("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/login.html"))
})

app.get("/header", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/partials/header.html"))
})

app.get("/footer", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/partials/footer.html"))
})




app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));