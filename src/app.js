const express = require("express");
const path = require("path");
const mainRouter = require(path.resolve(__dirname, "./routes/main"));
const productsRouter = require(path.resolve(__dirname, "./routes/products"));
const usersRouter = require(path.resolve(__dirname, "./routes/users"));
const adminRouter = require(path.resolve(__dirname, "./routes/admin"));
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const session = require("express-session");
const cookieParser = require('cookie-parser');
const makeUserSessionVisibleToAllViews = require(path.resolve(__dirname, "./middlewares/makeUserSessionVisibleToAllViews"))


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({secret: "frase secreta", resave: false, saveUninitialized: false})); //uso de sesión
app.use(cookieParser());

app.set("view engine", "ejs"); //motor de renderizado ejs
app.set("views", path.join(__dirname, "views"));
const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

app.use(makeUserSessionVisibleToAllViews);


app.use("/", mainRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));