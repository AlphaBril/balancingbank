import { internalError } from "../../shared/utils";
import { request, response } from "../../express.d";
import fs = require("fs");
import { PdfData, VerbosityLevel } from "pdfdataextract";
import { LCL } from "./upload.d";

const parsePageContent = (page: string) => {
    const result = <LCL[]>[];
    const parsed = page.matchAll(/(\d\d\.\d\d) +(CB.+) {2}([\d ,]+)\n/gm);
    if (parsed) {
        for (const line of parsed) {
            const item = <LCL>{};
            item.line = line[0];
            item.date = line[1];
            item.libelle = line[2];
            const checkCredit = item.libelle
                .split(" ")
                .filter((el) => el !== "");
            if (checkCredit[checkCredit.length - 1] === ".") {
                item.credit = line[3];
            } else {
                item.debit = line[3];
            }
            result.push(item);
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
                    for (const page of data.text) {
                        parsePageContent(page);
                        fs.writeFileSync("./public/test", page, {
                            encoding: "utf8",
                            flag: "a+",
                            mode: 0o666,
                        });
                    }
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
