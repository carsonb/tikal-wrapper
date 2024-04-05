"use strict";
import fs from "fs";
import java from "java";

const baseDir = "vendor/tikal/lib";
const dependencies = fs.readdirSync(baseDir);
dependencies.forEach((dependency) => {
  java.classpath.push(`./vendor/tikal/lib/${dependency}`);
});
java.import("net.sf.okapi.applications.tikal.Main");

export function extract(
  sourceFilePath: string,
  targetLanguage: string,
  outputPath: string
) {
  java.callStaticMethodSync("net.sf.okapi.applications.tikal.Main", "main", [
    "-x",
    sourceFilePath,
    "-sl",
    "en",
    "-tl",
    targetLanguage,
    "-od",
    outputPath,
    "-nocopy",
  ]);
}

export function merge(
  xliffFilePath: string,
  targetLanguage: string,
  outputPath: string
) {
  java.callStaticMethodSync("net.sf.okapi.applications.tikal.Main", "main", [
    "-m",
    xliffFilePath,
    "-sl",
    "en",
    "-tl",
    targetLanguage,
    "-od",
    outputPath,
  ]);
}
