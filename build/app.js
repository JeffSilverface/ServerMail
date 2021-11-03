"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sendMail_1 = require("./services/sendMail");
var path = require("path");
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
var cors = require("cors");
exports.app = app;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors());
app.use(express_1.default.static(path.join(__dirname, "client/")));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.post("/mail", function (req, res) {
    console.log("reception ok");
    (0, sendMail_1.sendMail)(req.body)
        .then(function (ok) {
        res.send(true);
    })
        .catch(function (err) {
        res.send(false);
    });
    res.end;
});
app.listen(port, function () {
    console.log("connected successfully on port " + port);
});
