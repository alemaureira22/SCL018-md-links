
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import Yargs from "yargs";

/*const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const Yargs = require('yargs');*/


const userPath = process.argv[2];
const option = Yargs(process.argv.slice(2)).argv;
const regEx = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g;//expresion regular

const mdFile = (fileToRead) => {
  const ext = path.extname(fileToRead.toLowerCase());
  if (ext === ".md") {
    return readUserFile(fileToRead);
  } else {
    console.log("Extensión del archivo incorrecto");
  }
};

const readUserFile = (readFile) => {
  try {
    if (fs.existsSync(readFile)) {
      const data = fs.readFileSync(readFile,"utf8")
      return searchLinks(data);
    }
  } catch (err) {
    console.log(err);
  }
};
// funcion para leer los links
const searchLinks = (path) => {
  const lines = path.split("\n");//separa en lineas el documento
  let allLinks = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const links = line.matchAll(regEx);// devuelve arreglo - leer los link
    const match = regEx.test(line);
    if (match) {
      for (const link of links) { // devuelve un iterable
        const data = {
          text: link[1],
          href: link[2],
          path: userPath,
          line: i + 1,
        };
        allLinks.push(data);
      }
    }
  }
  return allLinks;
};
// validar links
const urlValidate = (links) => {
  const validated = links.map((link) =>//calback
    fetch(link.href).then((response) => {
      return {
        text: link.text,
        href: link.href,
        path: link.path,
        line: link.line,
        status: response.status,
        statusText: response.statusText,
      
      };
    })
  );
  return Promise.all(validated);
};

// funcio padre
const mdLinks = (fileToRead) => {
  return new Promise((resolve, reject) => {
    const links = mdFile(fileToRead);
    if (option.validate) {
      resolve(urlValidate(links));
    } else {
      resolve(links);
    }
    reject(err);
    console.log(err)
  });
};

mdLinks(userPath).then((results) => console.log(results));

export { 
  mdLinks,
  searchLinks,
  readUserFile,
  urlValidate, 
  mdFile 
};