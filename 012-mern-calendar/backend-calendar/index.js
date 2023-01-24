import express from "express";
import { createServer } from "http";

import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { dbConnection } from "./database/config.js";
import AuthRouter from "./routes/auth.js";
import EventRouter from "./routes/event.js";
import bodyParserErrorHandler from "express-body-parser-error-handler";
import { fileURLToPath } from "url";
import path from "path";
const bootstrap = async () => {
  await dbConnection();
  const app = express();
  // CORS
  app.use(cors());
  // Directorio Público
  app.use(express.static("public"));

  // Lectura y parseo del body
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParserErrorHandler());

  app.use("/api/auth", AuthRouter);
  app.use("/api/events", EventRouter);

  // para un spa
  // priemra solucion
  app.use("*", (req, res) => {
    // https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope
    // __dirname no funciona cuando se pone type:module en package
    // res.sendFile(__dirname + "/public/index.html");

    const __filename = fileURLToPath(import.meta.url);

    const __dirname = path.dirname(__filename);
    res.sendFile(__dirname + "/public/index.html");
  });

  const httpServer = createServer(app);

  // https://stackoverflow.com/questions/14934452/how-to-get-all-registered-routes-in-express/49152014#49152014
  // https://github.com/expressjs/express/issues/3308#issuecomment-300957572

  function print(path, layer) {
    if (layer.route) {
      layer.route.stack.forEach(
        print.bind(null, path.concat(split(layer.route.path)))
      );
    } else if (layer.name === "router" && layer.handle.stack) {
      layer.handle.stack.forEach(
        print.bind(null, path.concat(split(layer.regexp)))
      );
    } else if (layer.method) {
      console.log(
        "%s /%s",
        layer.method.toUpperCase(),
        path.concat(split(layer.regexp)).filter(Boolean).join("/")
      );
    }
  }

  function split(thing) {
    if (typeof thing === "string") {
      return thing.split("/");
    } else if (thing.fast_slash) {
      return "";
    } else {
      var match = thing
        .toString()
        .replace("\\/?", "")
        .replace("(?=\\/|$)", "$")
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
      return match
        ? match[1].replace(/\\(.)/g, "$1").split("/")
        : "<complex:" + thing.toString() + ">";
    }
  }

  app._router.stack.forEach(print.bind(null, []));

  httpServer.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};

bootstrap();
// https://github.com/Klerith/MERN-Calendar-Backend
