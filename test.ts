import { assertExists } from "https://deno.land/std@0.82.0/testing/asserts.ts";
import * as MiiFormats from "./mod.ts";

Deno.test("import resolves", () => {
  assertExists(MiiFormats.WiiU);
  assertExists(MiiFormats.WiiU.from);
});
