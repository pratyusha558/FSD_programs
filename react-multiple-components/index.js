import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from Express!");
});

app.get("/api/v1/students", (req, res) => {
    res.json([
        { id: 1, name: "Pratyusha", course: "B.Tech" },
        { id: 2, name: "Rahul", course: "B.Tech" }
    ]);
});

app.listen(5000, () => {
    console.log("Server running on port http://localhost:5000");
});