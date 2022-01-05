 import {
  mdLinks,
} from "../index.js";


describe("mdLinks", () => {
  it("should be function", () => {
    expect(typeof mdLinks).toBe("function");
  });
  it("should return a promise", () => {
    const path = "testing.md";
    const result = mdLinks(path);
    expect(result).toBeInstanceOf(Promise);

});

});