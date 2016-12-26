"use strict";

import chaiHttp = require("chai-http");
import * as chai from "chai";

import app from "./app";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Application", () => {
    it("respond", () =>
        chai.request(app)
            .get("/")
            .then((res) => {
                expect(res.status).to.eql(200);
                expect(res.type).to.eql("application/json");
            }));
});
