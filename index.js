const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const user = require("./routes/users");
const device = require("./routes/device");
const cors = require("cors");
app.use(cors());
app.options("*", cors());
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json({ extended: false }));


//Passport Config


let db;
 db ='mongodb+srv://seositesoft17:3WordPress!2K22!@cluster0.j0yuvqu.mongodb.net/?retryWrites=true&w=majority'

//DB config
// const environment = require("./config/keys").ENVIRONMENT;
// if (environment == "live")
// db = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@eplaza-vpoui.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true`;
// } else {
//db = require("./config/keys").MongoUri;
// }
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

//Body Parser

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use("/", require("./routes/index"));
app.use("/api/user", user);
app.use("/api/device", device);

const PORT = process.env.PORT || 3000;

var server = http.createServer(app);

server.listen(PORT, console.log(`Server started on ${PORT}`));
