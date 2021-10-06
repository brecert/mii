import * as FCD from "./fcd.ts";
import * as MiiStudio from "./mii_studio.ts";

export function intoMiiStudio(data: FCD.MiiStruct): MiiStudio.MiiData {
  const clone = { ...data.toObject() };

  if (clone.hairColor === 0) {
    clone.hairColor = 8;
  }

  if (clone.faceHairColor === 0) {
    clone.faceHairColor = 8;
  }

  if (clone.eyebrowColor === 0) {
    clone.eyebrowColor = 8;
  }

  if (clone.glassesColor === 0) {
    clone.glassesColor = 8;
  } else if (clone.glassesColor < 6) {
    clone.glassesColor += 13;
  }

  clone.eyeColor += 8;
  clone.mouthColor += 19;

  return clone;
}
