import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { RegisterRoutes } from "./routes/routes";
import * as path from "path";


export default function (port) {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.get("/api.json", (req, res) => {
        const options = {
            root: path.join(__dirname, "..", "..", "docs"),
            dotfiles: "deny",
            headers: {
                "x-timestamp": Date.now(),
                "x-sent": true,
            },
        };

        res.sendFile("swagger.json", options, function (err) {
            if (err) {

            } else {

            }
        });
    });


    RegisterRoutes(app);

    app.use(
        (
            err: any,
            _req: express.Request,
            res: express.Response,
            next: express.NextFunction,
        ) => {
            const status = err.status || 500;
            const body = {
                fields: err.fields || undefined,
                message: err.message || "An error occurred during the request.",
                name: err.name,
                status,
            };
            res.status(status).json(body);
            next();
        },
    );

    app.listen(port, () => console.log("express listen to ", port));
};
