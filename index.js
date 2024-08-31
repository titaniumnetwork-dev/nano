import { ChemicalServer } from "chemicaljs";
import express from "express";
import { execSync } from "node:child_process";
import fs from "node:fs";

if (!fs.existsSync("dist")) {
    console.log("No build folder found. Building...");
    execSync("pnpm run build");
    console.log("Built!");
}

const [app, listen] = new ChemicalServer({
    scramjet: false,
    rammerhead: false,
});
const port = process.env.PORT || 3000;

app.disable("x-powered-by");

app.use(
    express.static("dist", {
        index: "index.html",
        extensions: ["html"],
    }),
);

app.serveChemical();

app.use((req, res) => {
    res.status(404);
    res.sendFile("dist/index.html", { root: "." });
});

listen(port, () => {
    console.log(`nano is listening on port ${port}`);
});
