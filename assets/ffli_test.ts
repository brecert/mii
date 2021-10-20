import { crypto } from "https://deno.land/std@0.112.0/crypto/mod.ts";
import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";

import { FFLI } from "./ffli.ts";
import * as utils from "./utils.ts";

const ffliBuffer = Deno.readFileSync("./.data/AFLResHigh.dat").buffer;
const ffli = new FFLI(ffliBuffer);

const hex16 = (arr: ArrayBufferLike) =>
  Array.from(new Uint8Array(arr))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

Deno.test("(8 bit) grayscale image exporting", async () => {
  const texHeader = ffli.getTextureHeader(2);
  const texture = ffli.getTexture(texHeader.file);

  assertEquals(
    await crypto.subtle.digest("SHA-1", utils.pngEncodeTexture(texture)).then(hex16),
    "0b8d04065048f7e0d5dd7b4498a595a6874cd5eb"
  );
}); 

Deno.test("(16 bit) grayscale + alpha image exporting", async () => {
  const texHeader = ffli.getTextureHeader(273);
  const texture = ffli.getTexture(texHeader.file);

  assertEquals(
    await crypto.subtle.digest("SHA-1", utils.pngEncodeTexture(texture)).then(hex16),
    "6ecc4cb19b00bc13147d79c2050a235599fde206"
  );
}); 

Deno.test("(32 bit) RGBA image exporting", async () => {
  const texHeader = ffli.getTextureHeader(135);
  const texture = ffli.getTexture(texHeader.file);

  assertEquals(
    await crypto.subtle.digest("SHA-1", utils.pngEncodeTexture(texture)).then(hex16),
    "ac54b10cd0db549da3cfe34f5fb00cab2df1d9a3"
  );
});
