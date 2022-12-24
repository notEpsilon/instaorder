import fs from "fs";
import mssql from "mssql";
import { sleep } from "./sleep.utils";

const readFile = async (filePath: string): Promise<string> => {
  return await new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  });
};

export const autoMigrate = async (filePath: string) => {
  try {
    const fileContent = await readFile(filePath);
    const queries = fileContent.split("\n\n--\n\n");

    for (const query of queries) {
      await mssql.query(query);
      await sleep(50);
    }
  } catch (err) {
    console.log(err);
  }
};
