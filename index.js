import { ChemicalServer } from "chemicaljs";
import express from "express";
import { execSync } from "node:child_process";
import fs from "node:fs";

if (!fs.existsSync("dist")) {
    console.log("No build folder found. Building...");
    execSync("pnpm run build");
    console.log("Built!");
}

const chemical = new ChemicalServer({
    scramjet: false,
    rammerhead: false,
});
const port = process.env.PORT || 3000;

chemical.app.disable("x-powered-by");

chemical.use(
    express.static("dist", {
        index: "index.html",
        extensions: ["html"],
    }),
);

chemical.error((req, res) => {
    res.status(404);
    res.sendFile("dist/index.html", { root: "." });
});

chemical.listen(port, () => {
    console.log(`nano is listening on port ${port}`);
});
