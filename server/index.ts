import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import next from "next";
import { v4 as uuidv4 } from 'uuid';
const USERS: Record<string, { name: string, balance: number }> = {

}
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
app.prepare();
const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
// server.all("*", (req: Request, res: Response) => {
//     return handle(req, res);
// });
server.get("/user/create", (req, res) => {
    const ID = uuidv4();
    const name = req.query.name;
    const balance = req.query.balance;
    if (typeof name !== 'string' || typeof balance !== 'number') {
        res.send({ status: 400 });
    } else {
        USERS[ID] = {
            name: name,
            balance: balance
        }
        console.log(USERS);
        res.send({ 'result': ID });
    }
})
server.get("/user/:id", (req, res) => {
    const user = USERS[req.params.id];
    res.send(user);
})
server.post("/user", (req, res) => {
    const ID = uuidv4();
    const name = req.body.name;
    const balance = req.body.balance;
    if (typeof name !== 'string' || typeof balance !== 'number') {
        res.send({ status: 400 });
    } else {
        USERS[ID] = {
            name: name,
            balance: balance
        }
        console.log(USERS);
        res.send({ 'result': ID });
    }
})
server.get("/users", (req, res) => {
    const users = Object.values(USERS);
    res.send(users);
})
server.listen(port, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
});
