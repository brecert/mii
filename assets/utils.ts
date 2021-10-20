import * as png from "https://deno.land/x/pngs@0.1.1/mod.ts";
import { TextureFormat, FFLITexture } from "./ffli.ts";

export const FORMAT_MAP = {
  [TextureFormat.Grayscale]: png.ColorType.Grayscale,
  [TextureFormat.GrayscaleAlpha]: png.ColorType.GrayscaleAlpha,
  [TextureFormat.RGBA]: png.ColorType.RGBA,
};

// const OFFSET = {
//   eye: 135,
//   eyebrow: 215,
//   mouth: 278,
// };

/** Encodes an FFLITexture to a PNG */
export function pngEncodeTexture(texture: FFLITexture) {
  const data = texture.getTextureData()
  
  if(texture.format === TextureFormat.GrayscaleAlpha) {
    // swap alpha and grayscale value to correct amount
    for (let i = 0; i < data.length; i += 2) {
      [data[i], data[i + 1]] = [data[i + 1], data[i]];
    }
  }

  return png.encode(data, texture.width, texture.height, {
    color: FORMAT_MAP[texture.format],
  });
}
