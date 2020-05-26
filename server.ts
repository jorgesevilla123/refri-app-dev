import 'zone.js/dist/zone-node';

import { ngExpressEngine } from "@nguniversal/express-engine";
import * as express from "express";
import { join } from "path";

import { AppServerModule } from "./src/main.server";

import { APP_BASE_HREF } from "@angular/common";
import { existsSync } from "fs";