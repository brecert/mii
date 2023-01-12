import { crypto } from "https://deno.land/std@0.171.0/crypto/mod.ts";
import { toHashString } from "https://deno.land/std@0.171.0/crypto/to_hash_string.ts";

type AssetHeight = 512 | 768;
const encoder = new TextEncoder();

export class Asset {
  root = "https://mii-studio.akamaized.net/editor/1";
  format = "png";
  height: AssetHeight = 512;

  constructor(public name: string, public parts: (string | number)[]) {}

  getUrl() {
    return `${this.root}/${this.getPath()}`;
  }

  getPath() {
    return `${this.format}/${this.height}/${this.getHashPath()}.${this.format}`;
  }

  getSubPath() {
    return `${this.name}/${this.parts.join("/")}`;
  }

  getHashPath() {
    const hashed = toHashString(
      crypto.subtle.digestSync("MD5", encoder.encode(this.getSubPath())),
    );
    return `${hashed[0]}/${hashed[1]}/${hashed[2]}/${hashed.slice(3, 12)}`;
  }

  static fromBody(body: Body) {
    return new this("body", [body.gender, body.color]);
  }

  static fromFace(face: Face) {
    return new this("face", [
      face.shape,
      face.wrinkles,
      face.features,
      face.color,
    ]);
  }

  static fromEye(eye: Eye) {
    return new this("eye", [
      eye.type,
      eye.color,
    ]);
  }

  static fromEyebrow(eyebrow: Eyebrow) {
    return new this("eyebrow", [
      eyebrow.type,
      eyebrow.color,
    ]);
  }

  static fromNose(nose: Nose) {
    return new this("nose", [
      nose.type,
      nose.color,
    ]);
  }

  static fromMouth(mouth: Mouth) {
    return new this("mouth", [
      mouth.type,
      mouth.color,
    ]);
  }

  static fromHair(hair: Hair) {
    if (hair.type === 34 || hair.type === 57) {
      return new this("hair", [hair.type, hair.faceType, hair.favoriteColor]);
    } else {
      return new this(hair.flipped ? "hairflip" : "hair", [
        hair.type,
        hair.faceType,
        hair.color,
      ]);
    }
  }

  static fromBeard(beard: Beard) {
    return new this("beard", [beard.type, beard.faceType, beard.color]);
  }

  static fromMustache(mustache: Mustache) {
    return new this("mustache", [mustache.type, mustache.color]);
  }

  static fromGlasses(glasses: Glasses) {
    return new this("glass", [glasses.type, glasses.color]);
  }

  static fromMole(mole: Mole) {
    return new this("mole", [+mole.enabled]);
  }
}

export const ADVANCED_COLOR_PALETTE = [
  // reds
  [2, 24, 10, 23, 15, 20, 21, 25, 26, 27],
  // pinks
  [28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
  // purples
  [38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
  // blues
  [48, 16, 49, 12, 50, 51, 52, 53, 54, 55],
  // blue-greens
  [56, 57, 58, 59, 13, 60, 61, 62, 63, 64],
  // greens
  [65, 66, 67, 68, 69, 70, 71, 72, 73, 74],
  // green-yellows
  [5, 11, 75, 76, 77, 78, 79, 80, 81, 82],
  // yellows
  [14, 83, 6, 17, 7, 84, 85, 86, 87, 88],
  // oranges
  [1, 3, 89, 19, 90, 91, 22, 92, 93, 94],
  // grays
  [8, 0, 95, 9, 18, 4, 96, 97, 98, 99],
] as const;

export const ADVANCED_COLORS = [
  2,
  24,
  10,
  23,
  15,
  20,
  21,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  16,
  49,
  12,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
  13,
  60,
  61,
  62,
  63,
  64,
  65,
  66,
  67,
  68,
  69,
  70,
  71,
  72,
  73,
  74,
  5,
  11,
  75,
  76,
  77,
  78,
  79,
  80,
  81,
  82,
  14,
  83,
  6,
  17,
  7,
  84,
  85,
  86,
  87,
  88,
  1,
  3,
  89,
  19,
  90,
  91,
  22,
  92,
  93,
  94,
  8,
  0,
  95,
  9,
  18,
  4,
  96,
  97,
  98,
  99,
] as const;

export type SkinColor = number;
export type EyeColor = EyeColorBasic | typeof ADVANCED_COLORS[number];
export type HairColor = HairColorBasic | typeof ADVANCED_COLORS[number];
export type MouthColor = MouthColorBasic | typeof ADVANCED_COLORS[number];
export type GlassesColor = GlassesColorBasic | typeof ADVANCED_COLORS[number];

export enum EyeColorBasic {
  Black = 8,
  Gray,
  Brown,
  Hazel,
  Blue,
  Green,
}

export enum HairColorBasic {
  Black = 8,
  Brown = 1,
  DarkBrown,
  LightBrown,
  Gray,
  DarkBlond,
  MediumBlond,
  LightBlond,
}

export enum MouthColorBasic {
  Orange = 19,
  Red,
  Pink,
  Peach,
  Brown,
}

export enum GlassesColorBasic {
  Black = 8,
  Brown = 14,
  Red,
  Blue,
  Orange,
  Gray,
}

export enum Gender {
  NoSkirt,
  Skirt,
}

export enum FavoriteColor {
  Red,
  Orange,
  Yellow,
  Green,
  DarkGreen,
  Blue,
  LightBlue,
  Pink,
  Purple,
  Brown,
  White,
  Black,
}

export type Body = {
  gender: Gender;
  color: FavoriteColor;
};

// 0-11
export enum FaceFeatures {
  None,
  Blush,
  Eyeshadow,
  Blush2,
  Blush3,
  Blush4,
  EyeshadowAndBlush,
  Eyeshadow2AndBlush,
  Eyeshadow3AndBlush3,
  Freckles,
  Beard,
  Beard2,
}

export type Face = {
  // 0-11
  shape: number;

  features: FaceFeatures;

  // 0-11
  wrinkles: number;

  // 0-9
  color: SkinColor;
};

export type Eye = {
  type: number;
  color: EyeColorBasic;
};

export type Eyebrow = {
  type: number;
  color: HairColor;
};

export type Nose = {
  type: number;
  color: SkinColor;
};

export type Mouth = {
  type: number;
  color: MouthColor;
};

export type Hair = {
  type: number;
  color: HairColor;
  faceType: number;
  favoriteColor: FavoriteColor;
  flipped: boolean;
};

export enum BeardType {
  None,
}

export type Beard = {
  type: BeardType | number;
  color: HairColor;
  faceType: number;
};

export enum MustacheType {
  None,
}

export type Mustache = {
  type: MustacheType | number;
  color: HairColor;
};

export type Glasses = {
  type: number;
  color: GlassesColor;
};

export type Mole = {
  enabled: boolean;
};
