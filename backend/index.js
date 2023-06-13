const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require('stripe')

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


//product section

const schemaProduct = mongoose.Schema({
  name: String,
  category:String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product",schemaProduct)



//save product in data 
//api
app.post("/uploadProduct",async(req,res)=>{
//app.post("/uploadProduct",(req,res)=>{
 //  console.log(req.body)
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({message : "Carga exitosa"})
})

//
app.get("/product",async(req,res)=>{
const data = await productModel.find({})
res.send(JSON.stringify(data))
//res.send("data")
})

/*****payment getWay */
console.log(process.env.STRIPE_SECRET_KEY)


const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session",async(req,res)=>{

     try{
      const params = {
          submit_type : 'pay',
          mode : "payment",
          payment_method_types : ['card'],
          billing_address_collection : "auto",
          shipping_options : [{shipping_rate : "shr_1NHHBqJf6fiPOJ0WpMJztru7"}],

          line_items : req.body.map((item)=>{
            return{
              price_data : {
                currency : "mxn",
                product_data : {
                  name : item.name,
                  // images : [item.image]
                },
                unit_amount : item.price * 100,
              },
              adjustable_quantity : {
                enabled : true,
                minimum : 1,
              },
              quantity : item.qty
            }
          }),

          success_url : `${process.env.FRONTEND_URL}/success`,
          cancel_url : `${process.env.FRONTEND_URL}/cancel`,

      }

      
      const session = await stripe.checkout.sessions.create(params)
      // console.log(session)
      res.status(200).json(session.id)
     }
     catch (err){
        res.status(err.statusCode || 500).json(err.message)
     }

})



//server is ruuning
app.listen(PORT, () => console.log("El servidor esta corriendo en el puerto : " + PORT));