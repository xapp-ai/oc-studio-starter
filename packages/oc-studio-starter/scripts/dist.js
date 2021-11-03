/*! Copyright (c) 2020, XAPP AI */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const process = require("process");
const { execSync } = require("child_process");

fs.copyFileSync("./package.json", "./lib/package.json");

console.log("package.json was copied");

process.chdir("./lib");

console.log(`Installing....`);

execSync("yarn install --production");

// Remove aws-sdk since it is provided by the lambda!
// The || true is incase it already is gone it ignores the error
execSync("rm -R ./node_modules/aws-sdk/ || true");

console.log("Zipping....");

execSync(
  "zip -r oc-studio-starter.zip ./index.js ./package.json ./node_modules",
  {
    stdio: "ignore",
  }
);

const stats = fs.statSync("./oc-studio-starter.zip");
var fileSizeInMegabytes = stats.size / (1024 * 1024);

console.log(`Zipped package is ${fileSizeInMegabytes} MB`);
