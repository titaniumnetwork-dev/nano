import { ChemicalBuild } from "chemicaljs";

const build = new ChemicalBuild({
    scramjet: false,
    rammerhead: false,
});

await build.write();
