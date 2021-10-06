import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import * as MiiStudio from "./mii_studio.ts";

export const encoded =
  "080013030b03043b020d0105060309020a0000040108010804000a0600666604000214021302080d04000a03010a";

export const decoded: MiiStudio.MiiData = {
  faceHairColor: 8,
  goateeType: 0,
  bodyWidth: 19,
  eyeStretch: 3,
  eyeColor: 11,
  eyeRotation: 3,
  eyeSize: 4,
  eyeType: 59,
  eyePosX: 2,
  eyePosY: 13,
  eyebrowStretch: 1,
  eyebrowColor: 5,
  eyebrowRotation: 6,
  eyebrowSize: 3,
  eyebrowType: 9,
  eyebrowPosX: 2,
  eyebrowPosY: 10,
  faceColor: 0,
  faceMakeupType: 0,
  faceShapeType: 4,
  faceWrinklesType: 1,
  favoriteColor: 8,
  miiGender: 1,
  glassesColor: 8,
  glassesSize: 4,
  glassesType: 0,
  glassesPosY: 10,
  hairColor: 6,
  hairFlipped: false,
  hairType: 102,
  bodyHeight: 102,
  moleSize: 4,
  moleEnabled: false,
  molePosX: 2,
  molePosY: 20,
  mouthStretch: 2,
  mouthColor: 19,
  mouthSize: 2,
  mouthType: 8,
  mouthPosY: 13,
  mustacheSize: 4,
  mustacheType: 0,
  mustachePosY: 10,
  noseSize: 3,
  noseType: 1,
  nosePosY: 10,
};

Deno.test("encodes correctly", () => {
  assertEquals(MiiStudio.encode(decoded), encoded);
});

Deno.test("decodes correctly", () => {
  assertEquals(MiiStudio.decode(encoded), decoded);
});
