import { internalError } from "../../shared/utils";
import { request, response } from "../../express.d";
import fs = require("fs");
import { PdfData, VerbosityLevel } from "pdfdataextract";
import { LCL } from "./upload.d";

interface Filtered {
    name: string;
    values: string[];
    dates: string[];
    occurence: number;
}

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
                if (line[3] !== "." && tmp[tmp.length - 1] !== ".") {
                    item.libelle = tmp.slice(0, tmp.length - 8);
                    item.date = tmp.slice(tmp.length - 8);
                    const lastDate = item.libelle.match(/(.*?)\d\d\/\d\d/);
                    item.libelle =
                        lastDate && lastDate[1]
                            ? lastDate[1].trim()
                            : item.libelle;
                } else {
                    item.value =
                        split[split.length - 3] === ""
                            ? split[split.length - 1]
                            : split[split.length - 3] + split[split.length - 1];
                    const tmp2 = tmp
                        .slice(0, tmp.length - item.value.length)
                        .trim();
                    item.libelle = tmp2.slice(0, tmp2.length - 8);
                    const lastDate = item.libelle.match(/(.*?)\d\d\/\d\d/);
                    item.libelle =
                        lastDate && lastDate[1]
                            ? lastDate[1].trim()
                            : item.libelle;
                    item.date = tmp2.slice(tmp2.length - 8);
                }
                if (item.type === "VIR") {
                    item.type = split[0] + " " + split[1];
                }
                item.value = line[3];
                if (
                    line[4] &&
                    (line[4].includes("SOLDE") || line[4].includes("TOTAUX"))
                ) {
                    const newItem = <LCL>{};
                    if (line[4].includes("SOLDE")) {
                        item.info = line[4].slice(0, line[4].indexOf("SOLDE"));
                        item.info = item.info === "\n" ? null : item.info;
                        newItem.line = line[4].slice(line[4].indexOf("SOLDE"));
                        newItem.value = newItem.line.slice(
                            newItem.line.search(/\d/)
                        );
                        newItem.libelle = newItem.line
                            .slice(
                                0,
                                newItem.line.length - newItem.value.length
                            )
                            .trim();
                        newItem.type = "SOLDE";
                    } else {
                        item.info = line[4].slice(0, line[4].indexOf("TOTAUX"));
                        item.info = item.info === "\n" ? null : item.info;
                        newItem.line = line[4].slice(line[4].indexOf("TOTAUX"));
                        newItem.type = "TOTAUX";
                    }
                } else {
                    item.info =
                        line[4] && line[4] !== "\n" ? line[4].trim() : null;
                }
                result.push(item);
            }
        }
    }
    return result;
};

export const upload = async (req: request, res: response) => {
    try {
        const creditCard = <Filtered[]>[];
        const payment = <Filtered[]>[];
        console.log(req.file);
        if (req.file) {
            const dataBuffer = fs.readFileSync(req.file.path);
            const data = await PdfData.extract(dataBuffer, {
                sort: true,
                verbosity: VerbosityLevel.ERRORS,
                get: {
                    pages: true,
                    text: true,
                },
            });
            if (data.text) {
                const results = parsePageContent(data.text);
                for (const result of results.filter((el) => el.type === "CB")) {
                    const exist = creditCard.find(
                        (el) => el.name === result.libelle
                    );
                    if (!exist) {
                        const newInfo = {
                            name: result.libelle,
                            values: [result.value],
                            dates: [result.date],
                            occurence: 1,
                        };
                        creditCard.push(newInfo);
                    } else {
                        exist.values.push(result.value);
                        exist.dates.push(result.date);
                        exist.occurence = exist.occurence + 1;
                    }
                }

                for (const result of results.filter((el) => el.type !== "CB")) {
                    const exist = payment.find(
                        (el) => el.name === result.libelle
                    );
                    if (!exist) {
                        const newInfo = {
                            name: result.libelle,
                            values: [result.value],
                            dates: [result.date],
                            occurence: 1,
                        };
                        payment.push(newInfo);
                    } else {
                        exist.values.push(result.value);
                        exist.dates.push(result.date);
                        exist.occurence = exist.occurence + 1;
                    }
                }
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
            }
        }
        creditCard.sort((a, b) => b.occurence - a.occurence);
        payment.sort((a, b) => b.occurence - a.occurence);
        return res.status(200).json({ creditCard, payment });
    } catch (e) {
        return internalError(res)(e);
    }
};
