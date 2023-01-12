import { assertEquals } from "https://deno.land/std@0.171.0/testing/asserts.ts";
import {
  Asset,
  EyeColorBasic,
  FavoriteColor,
  Gender,
  GlassesColorBasic,
  HairColorBasic,
  MouthColorBasic,
} from "./asset.ts";

Deno.test("body", () => {
  assertEquals(
    Asset.fromBody({
      gender: Gender.Skirt,
      color: FavoriteColor.LightBlue,
    }).getUrl(),
    "https://mii-studio.akamaized.net/editor/1/png/512/f/5/7/20e676637.png",
  );
});

Deno.test("face", () => {
  assertEquals(
    Asset.fromFace({
      shape: 11,
      features: 11,
      wrinkles: 11,
      color: 9,
    }).getUrl(),
    "https://mii-studio.akamaized.net/editor/1/png/512/b/d/0/9b4e31520.png",
  );
});

Deno.test("eye", () => {
  assertEquals(
    Asset.fromEye({
      type: 0,
      color: EyeColorBasic.Gray,
    }).getUrl(),
    "https://mii-studio.akamaized.net/editor/1/png/512/d/5/2/5e9968967.png",
  );
});

Deno.test("eyebrow", () => {
  assertEquals(
    Asset.fromEyebrow({
      type: 0,
      color: HairColorBasic.Gray,
    }).getUrl(),
    "https://mii-studio.akamaized.net/editor/1/png/512/3/0/f/cafd8423c.png",
  );
});

Deno.test("nose", () => {
  assertEquals(
    Asset.fromNose({
      type: 4,
      color: 8,
    }).getUrl(),
    "https://mii-studio.akamaized.net/editor/1/png/512/3/8/8/a52b670e8.png",
  );
});

Deno.test("mouth", () => {
  assertEquals(
    Asset.fromMouth({
      type: 4,
      color: MouthColorBasic.Peach,
    }).getUrl(),
    "https://mii-studio.akamaized.net/editor/1/png/512/9/c/c/885217396.png",
  );
});

Deno.test("hair", () => {
  assertEquals(
    Asset.fromHair({
      type: 0,
      color: HairColorBasic.Black,
      faceType: 0,
      favoriteColor: 0,
      flipped: true,
    }).getUrl(),
    "https://mii-studio.akamaized.net/editor/1/png/512/a/3/f/68e81ff29.png",
  );
});

Deno.test("beard", () => {
  assertEquals(
    Asset.fromBeard({
      type: 3,
      color: HairColorBasic.Gray,
      faceType: 7,
    }).getUrl(),
    "https://mii-studio.akamaized.net/editor/1/png/512/9/b/f/772f1eea5.png",
  );
});

Deno.test("mustache", () => {
  assertEquals(
    Asset.fromMustache({
      type: 1,
      color: HairColorBasic.Gray,
    }).getUrl(),
    "https://mii-studio.akamaized.net/editor/1/png/512/7/e/a/243fbf867.png",
  );
});

Deno.test("glass", () => {
  assertEquals(
    Asset.fromGlasses({
      type: 2,
      color: GlassesColorBasic.Orange,
    }).getUrl(),
    "https://mii-studio.akamaized.net/editor/1/png/512/1/f/0/7574a3d9d.png",
  );
});

Deno.test("mole", () => {
  assertEquals(
    Asset.fromMole({
      enabled: true,
    }).getUrl(),
    "https://mii-studio.akamaized.net/editor/1/png/512/a/a/f/dc975b0ba.png",
  );
});
