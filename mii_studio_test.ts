import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import * as mii from "./mii_studio.ts";

Deno.test("example", () => {
  const encoded =
    "080013030b03043b020d0105060309020a0000040108010804000a0600666604000214021302080d04000a03010a";

  const decoded = {
    faceHairColor: 8,
    faceGoateeType: 0,
    miiWidth: 19,
    eyeScaleY: 3,
    eyeColor: 11,
    eyeRotation: 3,
    eyeSize: 4,
    eyeType: 59,
    eyePosX: 2,
    eyePosY: 13,
    eyebrowScaleY: 1,
    eyebrowColor: 5,
    eyebrowRotation: 6,
    eyebrowSize: 3,
    eyebrowType: 9,
    eyebrowPosX: 2,
    eyebrowPosY: 10,
    faceColor: 0,
    faceFeaturesType: 0,
    faceShapeType: 4,
    faceWrinklesType: 1,
    favoriteColor: 8,
    miiGender: 1,
    glassesColor: 8,
    glassesSize: 4,
    glassesType: 0,
    glassesPosY: 10,
    hairColor: 6,
    hairFlipped: 0,
    hairType: 102,
    miiHeight: 102,
    moleSize: 4,
    moleEnabled: 0,
    molePosX: 2,
    molePosY: 20,
    mouthScaleY: 2,
    mouthColor: 19,
    mouthSize: 2,
    mouthType: 8,
    mouthPosY: 13,
    mustacheScale: 4,
    mustacheType: 0,
    mustachePosY: 10,
    noseSize: 3,
    noseType: 1,
    nosePosY: 10,
  };

  assertEquals(mii.encode(decoded), encoded);
  assertEquals(mii.decode(encoded), decoded);
});
