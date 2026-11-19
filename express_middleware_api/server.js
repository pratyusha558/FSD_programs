
import http from 'http'
import express from "express";
import cors from "cors";
import fs from "fs";
import morgan from "morgan";

const app = express();


// -------------------------
// Application-level middleware
// -------------------------

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// -------------------------
// Custom Logger Middleware
// -------------------------

const logger = (req, res, next) => {

  const start = Date.now();

  res.on("finish", () => {

    const period = Date.now() - start;

    const log = `${req.method} ${req.url} ${res.statusCode} ${period}ms\n`;

    fs.appendFile("./server.log", log, (err) => {

      if (err) {
        console.log(err);
      }

    });

  });

  next();
};

app.use(logger);


// -------------------------
// Validation Middleware
// -------------------------

const validate = (req, res, next) => {

  if (!req.body) {

    const err = new Error("Patient details missing");

    err.statuscode = 400;

    throw err;
  }

  const { name, gender, ward } = req.body;

  if (!name || !gender || !ward) {

    const err = new Error("Patient details missing");

    err.statuscode = 400;

    throw err;
  }

  next();
};


// -------------------------
// GET - Read patients
// -------------------------

app.get("/api/v1/patients", (req, res) => {

  const ward = req.query.ward;

  if (ward) {

    res
      .status(200)
      .send(`Patients in ward ${ward} fetched`);

  } else {

    res
      .status(200)
      .send("All patients fetched");

  }

});


// -------------------------
// GET - Read patient by ID
// -------------------------

app.get("/api/v1/patients/:id", (req, res) => {

  const id = req.params.id;

  res
    .status(200)
    .send(`Patient with ${id} fetched`);

});


// -------------------------
// PUT - Update patient
// -------------------------

app.put("/api/v1/patients/:id", validate, (req, res) => {

  const id = req.params.id;

  res
    .status(200)
    .send(`Patient ${id} updated`);

});


// -------------------------
// DELETE - Delete patient
// -------------------------

app.delete("/api/v1/patients/:id", (req, res) => {

  const id = req.params.id;

  res
    .status(200)
    .send(`Patient ${id} deleted`);

});


// -------------------------
// 404 Handler
// -------------------------

app.use((req, res) => {

  res
    .status(404)
    .send("Not found");

});


// -------------------------
// Error Handler
// -------------------------

app.use((err, req, res, next) => {

  const statuscode = err.statuscode || 500;

  const message = err.message || "Internal server error";

  res
    .status(statuscode)
    .send(message);

});


// -------------------------
// Start Server
// -------------------------
const port = 5000;

app.listen(port, () => {

  console.log(`Server running at http://localhost:${port}`);

});