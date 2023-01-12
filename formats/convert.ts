import * as FCD from "./fcd/fcd.ts";
import * as MiiStudio from "./mii_studio/mii_studio.ts";
import * as Miitool from "./miitool/mii.d.ts";

// temporary until the common mii format is finished
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

export function fromMiitool(data: Miitool.MiiCore): MiiStudio.MiiData {
  const clone = {
    miiGender: data.sex,
    favoriteColor: data.favorite_color,
    bodyHeight: data.height,
    bodyWidth: data.width,
    faceShapeType: data.face_shape,
    faceColor: data.skin_color,
    faceWrinklesType: data.wrinkles,
    faceMakeupType: data.makeup,
    hairType: data.hair_style,
    hairColor: data.hair_color,
    hairFlipped: data.is_hair_flipped,
    eyeType: data.eye_style,
    eyeColor: data.eye_color,
    eyeSize: data.eye_scale,
    eyeStretch: data.eye_stretch,
    eyeRotation: data.eye_rotation,
    eyePosX: data.eye_distance,
    eyePosY: data.eye_height,
    eyebrowType: data.eyebrow_style,
    eyebrowColor: data.eyebrow_color,
    eyebrowSize: data.eyebrow_scale,
    eyebrowStretch: data.eyebrow_stretch,
    eyebrowRotation: data.eyebrow_rotation,
    eyebrowPosX: data.eyebrow_distance,
    eyebrowPosY: data.eyebrow_height,
    noseType: data.nose_style,
    noseSize: data.nose_scale,
    nosePosY: data.nose_height,
    mouthType: data.mouth_style,
    mouthColor: data.mouth_color,
    mouthSize: data.mouth_scale,
    mouthStretch: data.mouth_stretch,
    mouthPosY: data.mouth_height,
    mustacheType: data.mustache_style,
    mustacheSize: data.mustache_scale,
    mustachePosY: data.mustache_height,
    beardType: data.beard_style,
    faceHairColor: data.facial_hair_color,
    glassesType: data.glasses_style,
    glassesColor: data.glasses_color,
    glassesSize: data.glasses_scale,
    glassesPosY: data.glasses_height,
    moleEnabled: data.is_mole_present,
    moleSize: data.mole_scale,
    molePosX: data.mole_x_position,
    molePosY: data.mole_y_position,
  };

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
