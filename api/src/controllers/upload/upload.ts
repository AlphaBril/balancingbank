import { internalError } from "../../shared/utils";
import { request, response } from "../../express.d";
import fs = require("fs");
import { PdfData, VerbosityLevel } from "pdfdataextract";

export const upload = async (req: request, res: response) => {
  try {
    if (req.file) {
      const dataBuffer = fs.readFileSync(req.file.path);
      PdfData.extract(dataBuffer, {
        sort: true, // sort the text by text coordinates
        verbosity: VerbosityLevel.ERRORS, // set the verbosity level for parsing
        get: {
          // enable or disable data extraction (all are optional and enabled by default)
          pages: true, // get number of pages
          text: true, // get text of each page
        },
      }).then((data) => {
        if (data.text) {
          for (const page of data.text) {
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
