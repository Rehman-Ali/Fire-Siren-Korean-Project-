const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const cloudinary = require('cloudinary');
const user = require("./routes/users");
const device = require("./routes/device");
const organization = require("./routes/organization");
const operator = require("./routes/operator");
const examiner = require("./routes/examiner");
const building = require("./routes/building");
const alarmSound = require("./routes/alarmSound");
require('dotenv').config({path: __dirname + '/.env'})
const cors = require("cors");
app.use(cors());
app.options("*", cors());
const mongoose = require('mongoose');

app.use(express.static("public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json({ extended: false }));

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

let db =`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.j0yuvqu.mongodb.net/?retryWrites=true&w=majority`

//Connect to Mongo
MONGODB_URI = mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));


// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use("/", require("./routes/index"));
app.use("/api/admin", user);
app.use("/api/device", device);
app.use("/api/organization", organization);
app.use("/api/operator", operator);
app.use("/api/operator", operator);
app.use("/api/examiner", examiner);
app.use("/api/building", building);
app.use("/api/alarm-sound", alarmSound);

const PORT = process.env.PORT || 8080;

var server = http.createServer(app);

server.listen(PORT, console.log(`Server started on ${PORT}`));
