import 'zone.js/dist/zone-node';
import 'multer';
import * as parser from "body-parser";
import { ngExpressEngine } from '@nguniversal/express-engine';
import express, {Request, Response, NextFunction, Errback} from 'express';
import * as path from 'path';
import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync} from 'fs';
import * as multer from 'multer';
import { startConnection } from "./db";
import productsRoutes from "./routes-and-controllers/routes/products-routes";
import clientsRoutes from "./routes-and-controllers/routes/clients-routes";
import currencyRoutes from "./routes-and-controllers/routes/currency-routes";
import usersRoutes from "./routes-and-controllers/routes/users-routes";
import categoryRoutes from "./routes-and-controllers/routes/category-routes";
import * as dotenv from "dotenv"
import session from "express-session";
import connectRedis from "connect-redis";
import redis from 'redis';








dotenv.config();


//enviroment set
// export const {
//   NODE_ENV = 'development' } = process.env

// export const IN_PROD = NODE_ENV === 'production'









// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = path.join(process.cwd(), 'dist/refri-data/browser');
  const indexHtml = existsSync(path.join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));






  //Middlewares
  server.set('view engine', 'html');
  server.set('views', distFolder);
  server.use(express.urlencoded({extended: false}));
  server.use(express.json());
  server.use(parser.urlencoded({extended: false}))
  server.use(parser.json());


//  const redisClient = redis.createClient();


//   var redisStore = connectRedis(session)






  
  //Session configuration


  // server.use(session({
  //   secret : "redisSecret",
  //   name: "redis_practice",
  //   resave: false,
  //   saveUninitialized: true,
  //   cookie : {
  //     secure: false,
  //     sameSite: true,},
  //   store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400})
  // }))




  //All routes for the API
  server.use('/api/products', productsRoutes);
  server.use('/api/clients', clientsRoutes);
  server.use('/api/currency-change', currencyRoutes);
  server.use('/api/users', usersRoutes);
  server.use('/api/categories', categoryRoutes)

  //Path for the navigator to access the photos 
  server.use('/uploads', express.static(path.resolve('uploads')));


  //Handleling routes errors and timeouts








  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run() {
  //Node server port
  const port = process.env.PORT || 4000;



  

  //start connection of the server to the database
  startConnection();

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
