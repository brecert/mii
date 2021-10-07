import { assert } from "https://deno.land/std@0.82.0/testing/asserts.ts";

export type MiiName = typeof MII_FIELDS[number];
export type MiiData =
  & Omit<Record<MiiName, number>, "hairFlipped" | "moleEnabled">
  & { hairFlipped: boolean; moleEnabled: boolean };

// For use with compatability testing
export const MII_FIELDS_COMPAT = [
  "$$_1r", // Facial Hair Color
  "$$_1q", // Goatee Type

  "build", // Mii Build ("width")

  "$$_1p", // Eye Stretch Y
  "$$_1o", // Eye Color 0-99
  "$$_1n", // Eye Rotation
  "$$_1m", // Eye Scale
  "$$_1l", // Eye Type 0-52
  "$$_1k", // Eye X
  "$$_1j", // Eye Y

  "$$_1i", // Eyebrow Stretch Y 0-6
  "$$_1h", // Eyebrow Color 0-99
  "$$_1g", // Eyebrow Rotation
  "$$_1f", // Eyebrow Scale 0-8
  "$$_1e", // Eyebrow Type 0-23
  "$$_1d", // Eyebrow X
  "$$_1c", // Eyebrow Y

  "$$_1b", // Face Color
  "$$_1a", // Facial Features / Blush
  "$$_19", // Face Shape
  "$$_18", // Wrinkles

  "$$_17", // Favorite Color

  "gender", // Gender

  "$$_16", // Eyewear Color
  "$$_15", // Eyewear Scale
  "$$_14", // Eyewear Type
  "$$_13", // Eyewear Y

  "$$_12", // Hair Color
  "$$_11", // Hair Direction / Flip
  "$$_10", // Hair Style

  "height", // Mii Height

  "$$_e", // Mole Scale
  "$$_d", // Mole Enabled
  "$$_c", // Mole X
  "$$_b", // Mole Y

  "$$_a", // Mouth Stretch Y
  "$$_9", // Mouth / Lip Color
  "$$_8", // Motuh Scale
  "$$_7", // Mouth Type
  "$$_6", // Mouth Y

  "$$_5", // Mustache Scale
  "$$_4", // Mustache Type
  "$$_3", // Mustache Y

  "$$_2", // Nose Scale
  "$$_1", // Nose Type
  "$$_0", // Nose Y
] as const;

export const MII_FIELDS = [
  "faceHairColor",
  "goateeType",

  "bodyWidth",

  "eyeStretch",
  "eyeColor",
  "eyeRotation",
  "eyeSize",
  "eyeType",
  "eyePosX",
  "eyePosY",

  "eyebrowStretch",
  "eyebrowColor",
  "eyebrowRotation",
  "eyebrowSize",
  "eyebrowType",
  "eyebrowPosX",
  "eyebrowPosY",

  "faceColor",
  "faceMakeupType", // Facial Features / Blush
  "faceShapeType",
  "faceWrinklesType",

  "favoriteColor",

  "miiGender",

  "glassesColor",
  "glassesSize",
  "glassesType",
  "glassesPosY",

  "hairColor",
  "hairFlipped",
  "hairType",

  "bodyHeight",

  "moleSize",
  "moleEnabled",
  "molePosX",
  "molePosY",

  "mouthStretch",
  "mouthColor",
  "mouthSize",
  "mouthType",
  "mouthPosY",

  "mustacheSize",
  "mustacheType",
  "mustachePosY",

  "noseSize",
  "noseType",
  "nosePosY",
] as const;

export function encode(data: MiiData) {
  return MII_FIELDS.map((fieldName) => encodeValue(+data[fieldName])).join("");
}

export function encodeValue(val: number) {
  assert(val < 256, `encoded value ${val} is larger than 0xFF`);
  return val.toString(16).padStart(2, "0");
}

export function decode(encoded: string) {
  const decoded = {} as MiiData;
  for (let i = 0, n = 0; i < MII_FIELDS.length; i++, n += 2) {
    const value = parseInt(encoded.slice(n, n + 2), 16);
    const name = MII_FIELDS[i];
    if (name === "hairFlipped" || name === "moleEnabled") {
      decoded[name] = !!value;
    } else {
      decoded[name] = value;
    }
  }
  return decoded;
}
