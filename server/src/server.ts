import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import colors from "colors";

const isProduction = process.env.NODE_ENV === 'production';
const routesPath = isProduction
    ? './dist/routes/*.js'
    : './src/routes/*.ts';

// Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Codask Api',
      version: '0.2.0',
    },
  },
  apis: [routesPath],
};

const swaggerSpec = swaggerJSDoc(options)


// Routes imports
import questionRoutes from "./routes/questionRoutes.js";
// import userRoutes from "../routes/userRoutes.ts"
// import answerRoutes from "../routes/answerRoute.ts";
// import cloudinaryConfig from "../config/cloudinaryConfig.ts";


dotenv.config();

const app = express();

const addMiddlewares = () => {
  app.use(express.json());

  app.use(cors({
    origin: [process.env.LOCAL_URL!,
      process.env.SERVICE_NAME!,
      process.env.PUBLIC_URL!,
      process.env.PUBLIC_DNS!,],
  }));
  
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  // cloudinaryConfig();
};

const addRoutes = () => {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.use("/api/questions", questionRoutes);
  // app.use("/api/users", userRoutes);
  // app.use("/api/answers", answerRoutes);
};

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB!);
    console.log("connection to MongoDB successful :>> ".bgCyan);
  } catch (error) {
    console.log("error in DBConnection:>> ".bgRed, error);
  }
};

const startServer = async () => {
  const port = process.env.PORT || 5008;

  app.listen(port, () => {
    console.log("Server running in port:".bgGreen, port);
  });
};

(async function controller() {
  await DBConnection();
  addMiddlewares();
  addRoutes();
  await startServer();
})();
