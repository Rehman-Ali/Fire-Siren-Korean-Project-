const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
dotenv.config();
const http = require("http");
const user = require("./routes/users");
const device = require("./routes/device");
const organization = require("./routes/organization");
const operator = require("./routes/operator");
const examiner = require("./routes/examiner");
const building = require("./routes/building");
const alarmSound = require("./routes/alarmSound");
const fireAlarm  = require("./routes/fireAlarm");
const appConfig  = require("./routes/appConfig");

// const building = require("./routes/building")
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


let db;
 db ='mongodb+srv://seositesoft17:3WordPress!2K22!@cluster0.j0yuvqu.mongodb.net/?retryWrites=true&w=majority'

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

const adminApiDoc = require('./swagger/UserAPi.doc')
const deviceApiDoc = require('./swagger/DeviceApi.doc')
const organizationApiDoc = require('./swagger/Organization.doc');
const operatorApiDoc = require('./swagger/OperatorApi.doc')
const examinerApiDoc = require('./swagger/ExaminerApi.doc')
const buildingApiDoc = require('./swagger/BuildingApi.doc')
const appConfigApiDoc = require("./swagger/appConfigApi.doc")
const alarmSoundApiDoc = require("./swagger/alarmSoundApi.doc")
const notificationApiDoc = require("./swagger/notificationApi.doc")

//swagger config
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",

    info: {
      title: "Fire Siren Project API",
      version: "1.0.0",
    },
    servers: [
      {
        url: 'https://fire-siren-project.cleverapps.io/'
      },
      {
        url: 'http://localhost:8080/',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-auth-token'
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
    paths: {
      ...adminApiDoc,
      ...deviceApiDoc,
      ...organizationApiDoc,
      ...operatorApiDoc,
      ...examinerApiDoc,
      ...buildingApiDoc,
      ...appConfigApiDoc,
      ...alarmSoundApiDoc,
      ...notificationApiDoc,
    },
  },
  apis: ["./routes*.js"],
  tags: [
    "admin",
    "Device",
    "Organization",
    "organizationRegister",
    "organizationWithId",
    "deleteOrganizationWithId",
    "updateOrganizationWithId",
    "Operator",
    "Examiner",
    "Building",
    "AlarmSound",
    "FireNotification",
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));






app.use(bodyParser.json());
app.use("/", require("./routes/index"));
app.use("/api/admin", user);
app.use("/api/device", device);
app.use("/api/organization", organization);
app.use("/api/operator", operator);
app.use("/api/examiner", examiner);
app.use("/api/building", building);
app.use("/api/alarm-sound", alarmSound);
app.use("/api/fire-alarm", fireAlarm);
app.use("/api/app-config", appConfig);


const PORT = process.env.PORT || 8080;

var server = http.createServer(app);

server.listen(PORT, console.log(`Server started on ${PORT}`));
