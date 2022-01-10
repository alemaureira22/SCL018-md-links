 import {
  mdLinks,
  mdFile,
  readUserFile,
  searchLinks,
  urlValidate

} from "../index.js";
 const path = 'test/test1.md';
 
 describe("mdFile", () => {
  it('debería ser una true', () => {
    const result =mdFile(path)
    expect(result).toBeTruthy();
  });
  it("debería retornar false", () => {
    const result = mdFile('chao');
    expect(result).toBeFalsy()
  });
});

describe("readUserFile", () => {
  it("deberia retornar un arreglo de objetos", () => {
    const result = [
      {
        text: 'Sitio oficial de GitHub Pages',
        href: 'https://pages.github.com/',
        path: '--coverage',
        line: 1
      },
      {
        text: 'Pixar',
        href: 'https://www.pixar.com/error404',
        path: '--coverage',
        line: 3
      }];
    expect(readUserFile(path)).toEqual(result);
  });
 

});
describe("searchLinks", () => {
  it('debería retornar un array', () => {
    const result = searchLinks(path);
    expect(result).toBeInstanceOf(Array);
  });
  it("debería retornar un objeto", () => {
    const result =  searchLinks(path);
    expect(result).toBeInstanceOf(Array);
  });
});
 describe("urlValidate", () => {
   it('debería mockear', () => {
    expect(typeof urlValidate).toBe('function');
  });
});
   // it("debería retornar un Array", () => {
   // const result = urlValidate(path);c
   // expect(result).toBeInstanceOf('function');
    
 // });
  describe("mdLinks", () => {
    it("deberia retornar una promesa", () => {
      const result = mdLinks(path);
      expect(result).toBeInstanceOf(Promise);
    });
    it("deberia retornar una promesa", () => {
      expect.assertions();
      return mdLinks(path)
    
      .then(res => {
        console.log(res);
       expect(res).toBeInstanceOf(Array);
  
      });
  
  });
  
  });
  