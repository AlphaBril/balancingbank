import { internalError } from "../../shared/utils";
import { request, response } from "../../express.d";
import fs = require("fs");
import { PdfData, VerbosityLevel } from "pdfdataextract";
import { LCL } from "./upload.d";

const parsePageContent = (pages: readonly string[]) => {
    const result = <LCL[]>[];
    for (const page of pages) {
        // const parsed = page.matchAll(/(\d\d\.\d\d) +(CB.+) {2}([\d ,]+)\n/gm); // match CB one line
        const parsed = page.matchAll(
            /(\d\d\.\d\d) +(.+) {2}([\d ,.]+)(?=\n|.)((.|\n)*?(?=(\d\d\.\d\d)|( {2}Page)))/gm
        ); // monster that match all LCL :D
        if (parsed) {
            for (const line of parsed) {
                const item = <LCL>{};
                item.line = line[0];
                const tmp = line[2].trim();
                const split = tmp.split(" ");
                item.type = split[0];
                if (line[3] !== ".") {
                    item.libelle = tmp.slice(0, tmp.length - 8);
                    item.date = tmp.slice(tmp.length - 8);
                } else {
                    item.value =
                        split[split.length - 3] === ""
                            ? split[split.length - 1]
                            : split[split.length - 3] + split[split.length - 1];
                    const tmp2 = tmp
                        .slice(0, tmp.length - item.value.length)
                        .trim();
                    item.libelle = tmp2.slice(0, tmp2.length - 8);
                    item.date = tmp2.slice(tmp2.length - 8);
                }
                if (item.type === "VIR") {
                    item.type = split[0] + " " + split[1];
                }
                item.value = line[3];
                item.info = line[4] && line[4] !== "\n" ? line[4].trim() : null;
                result.push(item);
            }
        }
    }
    console.log(result);
};

export const upload = async (req: request, res: response) => {
    try {
        if (req.file) {
            const dataBuffer = fs.readFileSync(req.file.path);
            PdfData.extract(dataBuffer, {
                sort: true,
                verbosity: VerbosityLevel.ERRORS,
                get: {
                    pages: true,
                    text: true,
                },
            }).then((data) => {
                if (data.text) {
                    parsePageContent(data.text);
                    // for (const page of data.text) {
                    //     fs.writeFileSync("./public/test", page, {
                    //         encoding: "utf8",
                    //         flag: "a+",
                    //         mode: 0o666,
                    //     });
                    // } write for test purpose
                }
                console.log(data.pages);
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
            });
        }
        return res.json({ message: "success" });
    } catch (e) {
        return internalError(res)(e);
    }
};
