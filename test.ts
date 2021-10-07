import {
  assertExists,
  assertObjectMatch,
} from "https://deno.land/std@0.82.0/testing/asserts.ts";
import * as base64 from "https://deno.land/std@0.82.0/encoding/base64.ts";

import * as MiiFormats from "./mod.ts";

Deno.test("import resolves", () => {
  assertExists(MiiFormats.WiiU);
  assertExists(MiiFormats.WiiU.from);
});

Deno.test("conversion works", () => {
  const miiStudioEncoded =
    "0800400308040402020C0308060406020A0400000004000804000A0800444004000214031304170D04000A040109";

  const miiFCDData = base64.decode(
    "AwEAMAAAAAAAAAAAgAAAAOz/gtIAAAAAABBuAG8AIABuAGEAbQBlAAAAAAAAAEBAgQBEAAJoRBgGNEYUgRIXaA0AACkAUkhQAAAAAAAAAAAAAAAAAAAAAAAAAAAAALQV",
  ).buffer;

  assertObjectMatch(
    MiiFormats.convert.intoMiiStudio(MiiFormats.FaceCoreData.from(miiFCDData)),
    MiiFormats.MiiStudio.decode(miiStudioEncoded),
  );
});
