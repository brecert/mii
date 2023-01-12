import { assertEquals } from "https://deno.land/std@0.127.0/testing/asserts.ts";
import { unzlib } from "https://deno.land/x/denoflate@1.2.1/mod.ts";

export type Pointer = {
  pos: number;
  len: number;
};

export enum CompressionType {
  None,
  ZLib,
}

export type FilePointer = {
  ptr: Pointer;
  compression: CompressionType;
};

export type FileHeader = {
  file: FilePointer;
  size: {
    compressed: number;
    uncompressed: number;
  };
  flags: Uint8Array;
};

export enum TextureFormat {
  // 8 bit
  Grayscale,
  // 16 bit
  GrayscaleAlpha,
  // 32 bit
  RGBA,
}

export type FFLITexture = {
  data: Uint8Array;
  width: number;
  height: number;
  format: TextureFormat;
  mipmap: {
    offset: number;
    count: number;
  };

  bytesize(): number;
  getTextureData(): Uint8Array;
};

export class FFLI {
  view: DataView;

  constructor(public buffer: ArrayBufferLike) {
    this.view = new DataView(buffer);
  }

  get header() {
    const view = this.view;
    const magic = new Uint8Array(view.buffer.slice(0, 4));
    const uncompressedSize = view.getUint32(0xc);

    assertEquals(magic, new Uint8Array([70, 70, 82, 65]));

    return {
      magic,
      uncompressedSize,
    };
  }

  getFileHeader(at: number): FileHeader {
    const view = new DataView(this.buffer, at, 0x10);

    const offset = view.getUint32(0x00);
    const uncompressedSize = view.getUint32(0x04);
    const compressedSize = view.getUint32(0x08);
    const isCompressed = view.getUint8(0x0f) !== 5;

    const flags = new Uint8Array(3);
    for (let i = 0; i < 3; i++) {
      flags[i] = view.getUint8(0x0c + i);
    }

    return {
      file: {
        ptr: {
          pos: offset,
          len: compressedSize,
        },
        compression: isCompressed ? CompressionType.ZLib : CompressionType.None,
      },
      size: {
        uncompressed: uncompressedSize,
        compressed: uncompressedSize,
      },
      flags,
    };
  }

  get maxTextureSizes() {
    const maxSizes = new Uint32Array(10);
    for (let i = 0; i < 10; i++) {
      maxSizes[i] = this.view.getUint32(0x14 + i * 4);
    }

    return maxSizes;
  }

  getTextureHeader(n: number) {
    return this.getFileHeader(0x40 + 0x10 * n);
  }

  getTexture({ ptr, compression }: FilePointer): FFLITexture {
    const rawData = new Uint8Array(this.buffer, ptr.pos, ptr.len);
    const data = compression === CompressionType.ZLib
      ? unzlib(rawData)
      : rawData;

    const view = new DataView(data.buffer, data.length - 12, 12);

    const mipmapOffset = view.getUint32(0x00);
    const width = view.getUint16(0x04);
    const height = view.getUint16(0x06);
    const mipmapCount = view.getUint8(0x08);
    const format: TextureFormat = view.getUint8(0x9);

    return {
      data,
      width,
      height,
      format,
      mipmap: {
        offset: mipmapOffset,
        count: mipmapCount,
      },
      bytesize() {
        // gets the pixels bytesize
        // if the format is 16bit or 32bit we need to account for those extra pieces of data
        return width * height * (format == 0 ? 1 : format * 2);
      },
      getTextureData() {
        return this.data.slice(0, this.bytesize());
      },
    };
  }
}
