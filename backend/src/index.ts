import express from 'express';
import "reflect-metadata";
import {createConnection} from "typeorm";
const app = express();
const PORT = 8003;
import bodyParser from "body-parser";
import cors from "cors";
import {routes} from "./routes";
import { PassportConfigStrategy } from './untils/PassportConfigStrategy';


app.use(cors());
app.use(bodyParser.json());

createConnection().then(async ()=> {
    console.log(`⚡️[server]: Connected to database`)

    PassportConfigStrategy()
    routes(app);
   /* app.get('/test',passport.authenticate('jwt', { session: false }), (req:Request,res:Response) => {
        res.send('Express + TypeScript Server')
    });*/

}).catch(error => console.log(error));






app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});