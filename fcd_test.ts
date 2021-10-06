import { assertEquals } from "https://deno.land/std@0.82.0/testing/asserts.ts";
import * as base64 from "https://deno.land/std@0.82.0/encoding/base64.ts";

import { MiiStruct } from "./fcd.ts";

export const miiData = base64.decode(
  "AwAAQPLA80BEYv7Q1Y1wf7eJ9wEB6QAAi2FCAHIAZQBjAGUAcgB0AAAAAAAAAGJIAhAFBkpoRBoNE0QUQRQIRg0AgEDSAaBwQgByAGUAYwBlAHIAdAAAAAAAAAAAAA3L",
).buffer;

Deno.test("basic", () => {
  const mii = new MiiStruct(miiData);

  assertEquals(mii.toObject(), {
    systemId: Uint8ClampedArray.from([242, 192, 243, 64, 68, 98, 254, 208]),
    avatarId: Uint8ClampedArray.from([213, 141, 112, 127]),
    clientId: Uint8ClampedArray.from([183, 137, 247, 1, 1, 233]),
    isFavorite: true,
    favoriteColor: 8,
    birthDay: 12,
    birthMonth: 5,
    miiGender: 1,
    miiName: "Brecert\u0000\u0000\u0000",
    bodyHeight: 98,
    bodyWidth: 72,
    faceColor: 0,
    faceShapeType: 1,
    canMingle: false,
    faceMakeupType: 1,
    faceWrinklesType: 0,
    hairType: 5,
    hairFlipped: false,
    hairColor: 6,
    eyePosY: 13,
    eyePosX: 2,
    eyeRotation: 4,
    eyeStretch: 3,
    eyeSize: 4,
    eyeColor: 1,
    eyeType: 10,
    eyebrowPosY: 10,
    eyebrowPosX: 2,
    eyebrowRotation: 4,
    eyebrowStretch: 1,
    eyebrowSize: 3,
    eyebrowColor: 0,
    eyebrowType: 13,
    nosePosY: 10,
    noseSize: 2,
    noseType: 1,
    mouthStretch: 2,
    mouthSize: 3,
    mustacheType: 0,
    mouthPosY: 13,
    mouthColor: 0,
    mouthType: 8,
    mustachePosY: 16,
    mustacheSize: 2,
    faceHairColor: 0,
    goateeType: 0,
    glassesPosY: 0,
    glassesSize: 3,
    glassesColor: 5,
    glassesType: 0,
    molePosY: 28,
    molePosX: 5,
    moleSize: 0,
    moleEnabled: false,
    creatorName: "Brecert\u0000\u0000\u0000",
    checksum: 51981,
  } as ReturnType<MiiStruct["toObject"]>);
});
