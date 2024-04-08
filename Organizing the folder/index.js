import fs from "fs/promises";
import ofs from "fs";
import fsm from "fs-extra";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const mypath = dirname(fileURLToPath(import.meta.url));
console.log(mypath);
let allfiles = await fs.readdir(mypath);

for (let i = 0; i < allfiles.length; i++) {

    let ext = allfiles[i].split(".")[allfiles[i].split(".").length - 1];
    
    if (ext !== "js" && ext !== "json" && ext !== "node_modules") {
        const destination = path.join(mypath, ext);
        if (ofs.existsSync(destination)) {
            await fsm.move(path.join(mypath, allfiles[i]), path.join(destination, allfiles[i]));
        } else {
            fs.mkdir(ext);
            await fsm.move(path.join(mypath, allfiles[i]), path.join(destination, allfiles[i]));
        }
    }
}