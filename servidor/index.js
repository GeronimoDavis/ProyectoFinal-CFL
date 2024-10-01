const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const bodyParser = require("body-parser");
const Usuario = require("./modelos/usuario");

mongoose.connect("mongodb://127.0.0.1:27017/blog");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Base de datos conectada!");
});

//cors

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept, Origin, Authorization"
  );
  next();
});

//cors

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//passport y session

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);

      const usuarioEncontrado = await Usuario.findOne({
        googleId: profile.id,
      });

      if (usuarioEncontrado) {
        return done(null, usuarioEncontrado);
      } else {
        const nuevoUsuario = new Usuario({
          nombre: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
        });
        await nuevoUsuario.save();
        return done(null, nuevoUsuario);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  const usuario = Usuario.findById(user._id);
  console.log(user);

  done(null, user);
});

//passport y session

//rutas
const rutasUsuarios = require("./rutas/usuarios");
app.use("/api/usuarios", rutasUsuarios);

const rutasPublicaciones = require("./rutas/publicaciones");
app.use("/api/publicaciones", rutasPublicaciones);

//rutas

app.listen(3000, function () {
  console.log("Servidor abierto en puerto 3000");
});
