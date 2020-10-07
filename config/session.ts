import { SessionOptions } from "express-session";



const halfOur = 1000 * 60 * 30

const {
    SESSION_SECRET = "secret",
    SESSION_NAME = 'SID',
    SESSION_TIMEOUT = halfOur

} = process.env

export const SESSION_OPTIONS: SessionOptions = {
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    cookie: {
      maxAge: +SESSION_TIMEOUT,
      secure: false,   //Environment variables implementation
      sameSite: true,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false


}