const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()


const app = express();
app.use(cors());
app.use(express.json({limit : "10mb"}));

const PORT = process.env.PORT || 8080;

//mongodb connection
// console.log(process.env.MONGODB_URL)
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Conectarse a la Base de Datos"))
  .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    maidenName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
  });

//
const userModel = mongoose.model("user", userSchema);

//api
app.get("/",(req, res) => {
    res.send("El Servidor esta corriendo");
});

//sign up
app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;

    const result = await userModel.findOne({ email: email });

    console.log(result);
      //  console.log(err);
        if (result) {
          res.send({ message: "El correo ya esta registrado", alert: false });
        } else {
          const data = userModel(req.body);
          const save = data.save();
          res.send({ message: "Registro exitoso", alert: true });
        }
      })

//api login
app.post("/login", async (req, res) => {
  // console.log(req.body);
  const { email } = req.body;

  //  userModel.findOne({ email: email }, (err, result) => {
              const result = await userModel.findOne({ email: email });

               console.log(result);

  if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        maidenName: result.maidenName,
        email: result.email,
        image: result.image,
      };
      console.log(dataSend);
      res.send({
        message: "Login exitoso",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: "Correo no esta disponible, por favor registrese",
        alert: false,
      });
    }
  });
//});

//server is ruuning
app.listen(PORT, () => console.log("El servidor esta corriendo en el puerto : " + PORT));