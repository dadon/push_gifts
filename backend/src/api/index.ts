import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import * as campaign from "./campaign";
import * as user from "./user";


export default function (port) {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.post("/campaign/create", campaign.create);
    app.get("/campaign/:campaignId", campaign.get);
    app.get("/campaign-public/:campaignPublicId", campaign.getPublic);
    app.post("/campaign/:campaignId", campaign.update);

    app.post("/check-phone", user.checkPhone);
    app.post("/user/create", user.create);
    app.post("/user/:userId/spend", user.spend);
    app.get("/user/:userId", user.get);

    app.listen(port, () => console.log("express listen to ", port));
};
