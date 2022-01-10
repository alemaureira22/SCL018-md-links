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
const regEx = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g; //expresion regular

const mdFile = (fileToRead) => {
  const ext = path.extname(fileToRead.toLowerCase());
  if (ext === ".md") {
    return true;
  } else {
    console.log("No es un archivo md");
  }
};

const readUserFile = (readFile) => {
  try {
    const data = fs.readFileSync(readFile, "utf8");
    return searchLinks(data);
  } catch (err) {
    console.log(err);
  }
};
// funcion para leer los links
const searchLinks = (path) => {
  const lines = path.split("\n"); //separa en lineas el documento
  let allLinks = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const links = line.matchAll(regEx); // devuelve arreglo - leer los link
    const match = regEx.test(line);
    if (match) {
      for (const link of links) {
        // devuelve la informacion
        const data = {
          text: link[1],
          href: link[2],
          path: userPath,
          line: i + 1,
        };
        allLinks.push(data); // lo agregamos al array vacio y retorna
      }
    }
  }
  return allLinks;
};
// validar links
const urlValidate = (links) => {
  const validated = links.map(
    (
      link //nos devuelve un array/ for e
    ) =>
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
  return Promise.all(validated); // tiene que aprobar todas las promesas
};

// funcio madre
const mdLinks = (readFile,option) => {
  return new Promise((resolve, reject) => {
    const links = readUserFile(readFile); // contiene objeto
    if (option.validate) {
      resolve(urlValidate(links));
    } else {
      resolve(links);
    }
    reject();
  });
};

mdLinks(userPath,option).then((results) => console.table(results));

export { mdLinks, searchLinks, readUserFile, urlValidate, mdFile };
