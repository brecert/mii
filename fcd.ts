const utf16 = new TextDecoder("utf-16le");

// Memoize `get` methods
function memo<T>(
  _target: unknown,
  _propertyName: string,
  descriptor: PropertyDescriptor,
) {
  let cache: T;
  const method = descriptor.get!;
  descriptor.get = function () {
    return (cache ??= method.apply(this, []));
  };
}

const getBitNum = (size: number, bytes: number, at: number, len: number) =>
  (bytes >> (size - at - len)) & ((1 << len) - 1);

export class MiiStruct {
  view: DataView;

  constructor(public buffer: ArrayBufferLike) {
    this.view = new DataView(buffer);
  }

  @memo
  get systemId() {
    return new Uint8ClampedArray(this.buffer, 0x4, 8);
  }

  @memo
  get avatarId() {
    return new Uint8ClampedArray(this.buffer, 0xc, 4);
  }

  @memo
  get clientId() {
    return new Uint8ClampedArray(this.buffer, 0x10, 6);
  }

  // 0x02 bytes of padding

  // [12+4] isFavorite  favoriteColor birthDay  birthMonth  gender
  // [12+4] 0           0000          00000     0000        0
  // [b1]   1           1000          01100     0101        1
  getPackedMiiinfo() {
    return this.view.getUint16(0x18, true);
  }

  @memo
  get isFavorite() {
    return !!getBitNum(15, this.getPackedMiiinfo(), 0, 1);
  }

  @memo
  get favoriteColor() {
    return getBitNum(15, this.getPackedMiiinfo(), 1, 4);
  }

  @memo
  get birthDay() {
    return getBitNum(15, this.getPackedMiiinfo(), 5, 5);
  }

  @memo
  get birthMonth() {
    return getBitNum(15, this.getPackedMiiinfo(), 10, 4);
  }

  @memo
  get gender() {
    return getBitNum(15, this.getPackedMiiinfo(), 14, 1);
  }

  @memo
  get miiName() {
    return utf16.decode(this.buffer.slice(0x1a, 0x1a + 20));
  }

  @memo
  get bodyHeight() {
    return this.view.getUint8(0x2e);
  }

  @memo
  get bodyWidth() {
    return this.view.getUint8(0x2f);
  }

  // [16] faceColor  faceType  mingle  faceMakeup  faceWrinkles
  // [b1] 000        0001      0       0001        0000
  getPackedFaceData() {
    return (this.view.getUint8(0x30) << 8) | this.view.getUint8(0x31);
  }

  @memo
  get faceColor() {
    return getBitNum(16, this.getPackedFaceData(), 0, 3);
  }

  @memo
  get faceType() {
    return getBitNum(16, this.getPackedFaceData(), 3, 4);
  }

  @memo
  get canMingle() {
    return !!getBitNum(16, this.getPackedFaceData(), 7, 1);
  }

  @memo
  get faceMakeup() {
    return getBitNum(16, this.getPackedFaceData(), 8, 4);
  }

  @memo
  get faceWrinkles() {
    return getBitNum(16, this.getPackedFaceData(), 12, 4);
  }

  @memo
  get hairType() {
    return this.view.getUint8(0x32);
  }

  // [8]  unk  hairFlip  hairColor
  // [8]  0000 0         000
  // [b1] 0000 0         110
  getPackedHairData() {
    return this.view.getUint8(0x33);
  }

  @memo
  get hairFlip() {
    return !!getBitNum(8, this.getPackedHairData(), 4, 1);
  }

  @memo
  get hairColor() {
    return getBitNum(8, this.getPackedHairData(), 5, 3);
  }

  // [32] [2]  eyePosY eyePosX eyeRotation eyeStretch [1]  eyeSize eyeColor  eyeType
  // [32] 00   00000   0000    00000       000        0    000     000       000000
  // [b1] 00   01101   0010    00100       011        0    100     001       001010
  getPackedEyeData() {
    return this.view.getUint32(0x34, true);
  }

  // [2] bits of padding

  @memo
  get eyePosY() {
    return getBitNum(32, this.getPackedEyeData(), 2, 5);
  }

  @memo
  get eyePosX() {
    return getBitNum(32, this.getPackedEyeData(), 7, 4);
  }

  @memo
  get eyeRotation() {
    return getBitNum(32, this.getPackedEyeData(), 11, 5);
  }

  @memo
  get eyeStretch() {
    return getBitNum(32, this.getPackedEyeData(), 16, 3);
  }

  // [1] bit of padding

  @memo
  get eyeSize() {
    return getBitNum(32, this.getPackedEyeData(), 20, 3);
  }

  @memo
  get eyeColor() {
    return getBitNum(32, this.getPackedEyeData(), 23, 3);
  }

  @memo
  get eyeType() {
    return getBitNum(32, this.getPackedEyeData(), 26, 6);
  }

  // [32] [2] eyebrowPosY eyebrowPosX [1] eyebrowRotation [1] eyebrowStretch  eyebrowSize eyebrowColor  eyebrowType
  // [b1] ..  .1010       0110        0   0100           0    001             0011        000           01101
  getPackedEyebrowData() {
    return this.view.getUint32(0x38, true);
  }

  // [2] bits of padding

  @memo
  get eyebrowPosY() {
    return getBitNum(32, this.getPackedEyebrowData(), 2, 5);
  }

  @memo
  get eyebrowPosX() {
    return getBitNum(32, this.getPackedEyebrowData(), 7, 4);
  }

  // [1] bit of padding

  @memo
  get eyebrowRotation() {
    return getBitNum(32, this.getPackedEyebrowData(), 12, 4);
  }

  // [1] bit of padding

  @memo
  get eyebrowStretch() {
    return getBitNum(32, this.getPackedEyebrowData(), 17, 3);
  }

  @memo
  get eyebrowSize() {
    return getBitNum(32, this.getPackedEyebrowData(), 20, 4);
  }

  @memo
  get eyebrowColor() {
    return getBitNum(32, this.getPackedEyebrowData(), 24, 3);
  }

  @memo
  get eyebrowType() {
    return getBitNum(32, this.getPackedEyebrowData(), 27, 5);
  }

  // [16] [2] nosePosY  noseSize  noseType
  // [b1] ..  .1010     0010      00001
  getPackedNoseData() {
    return this.view.getUint16(0x3c, true);
  }

  @memo
  get nosePosY() {
    return getBitNum(16, this.getPackedNoseData(), 2, 5);
  }

  @memo
  get noseSize() {
    return getBitNum(16, this.getPackedNoseData(), 7, 4);
  }

  @memo
  get noseType() {
    return getBitNum(16, this.getPackedNoseData(), 11, 5);
  }

  // [16] mouthStretch  mouthSize mouthColor  mouthType [8]       mustacheType  mouthPosY
  // [1b] .10           0011      000         001000    ........  ...           .1101
  getPackedMouthData() {
    return (
      (this.view.getUint16(0x3e, true) << 16) | this.view.getUint16(0x40, true)
    );
  }

  @memo
  get mouthStretch() {
    return getBitNum(32, this.getPackedMouthData(), 0, 3);
  }

  @memo
  get mouthSize() {
    return getBitNum(32, this.getPackedMouthData(), 3, 4);
  }

  @memo
  get mouthColor() {
    return getBitNum(32, this.getPackedMouthData(), 7, 3);
  }

  @memo
  get mouthType() {
    return getBitNum(32, this.getPackedMouthData(), 10, 6);
  }

  @memo
  get mustacheType() {
    return getBitNum(32, this.getPackedMouthData(), 24, 3);
  }

  @memo
  get mouthPosY() {
    return getBitNum(32, this.getPackedMouthData(), 27, 5);
  }

  getPackedFaceHairData() {
    return this.view.getUint16(0x42, true);
  }

  @memo
  get mustachePosY() {
    return getBitNum(16, this.getPackedFaceHairData(), 1, 5);
  }

  @memo
  get mustacheSize() {
    return getBitNum(16, this.getPackedFaceHairData(), 6, 4);
  }

  @memo
  get faceHairColor() {
    return getBitNum(16, this.getPackedFaceHairData(), 10, 3);
  }

  @memo
  get goateeType() {
    return getBitNum(16, this.getPackedFaceHairData(), 13, 3);
  }

  // .......111010010
  getPackedGlassesData() {
    return this.view.getUint16(0x44, true);
  }

  @memo
  get glassesPosY() {
    return getBitNum(16, this.getPackedGlassesData(), 1, 4);
  }

  @memo
  get glassesSize() {
    return getBitNum(16, this.getPackedGlassesData(), 5, 4);
  }

  @memo
  get glassesColor() {
    return getBitNum(16, this.getPackedGlassesData(), 9, 3);
  }

  @memo
  // glasses.feature
  get glassesType() {
    return this.getPackedGlassesData() & 0b100;
  }

  // [16] enabled pos.y  pos.x   size  [1]
  // [b1] .       11100  00101   0000  0
  getPackedMoleData() {
    return this.view.getUint16(0x46, true);
  }

  @memo
  get molePosY() {
    return getBitNum(16, this.getPackedMoleData(), 1, 5);
  }

  @memo
  get molePosX() {
    return getBitNum(16, this.getPackedMoleData(), 6, 5);
  }

  @memo
  get moleSize() {
    return getBitNum(16, this.getPackedMoleData(), 11, 4);
  }

  @memo
  get moleEnabled() {
    return !!getBitNum(16, this.getPackedMoleData(), 0, 1);
  }

  @memo
  // @json
  get creatorName() {
    return utf16.decode(this.buffer.slice(0x48, 0x48 + 20));
  }

  // 0x02 bytes of padding

  @memo
  get checksum() {
    return this.view.getUint16(0x5e, true);
  }

  toObject() {
    return {
      systemId: this.systemId,
      avatarId: this.avatarId,
      clientId: this.clientId,
      isFavorite: this.isFavorite,
      favoriteColor: this.favoriteColor,
      birthDay: this.birthDay,
      birthMonth: this.birthMonth,
      gender: this.gender,
      miiName: this.miiName,
      bodyHeight: this.bodyHeight,
      bodyWidth: this.bodyWidth,
      faceColor: this.faceColor,
      faceType: this.faceType,
      canMingle: this.canMingle,
      faceMakeup: this.faceMakeup,
      faceWrinkles: this.faceWrinkles,
      hairType: this.hairType,
      hairFlip: this.hairFlip,
      hairColor: this.hairColor,
      eyePosY: this.eyePosY,
      eyePosX: this.eyePosX,
      eyeRotation: this.eyeRotation,
      eyeStretch: this.eyeStretch,
      eyeSize: this.eyeSize,
      eyeColor: this.eyeColor,
      eyeType: this.eyeType,
      eyebrowPosY: this.eyebrowPosY,
      eyebrowPosX: this.eyebrowPosX,
      eyebrowRotation: this.eyebrowRotation,
      eyebrowStretch: this.eyebrowStretch,
      eyebrowSize: this.eyebrowSize,
      eyebrowColor: this.eyebrowColor,
      eyebrowType: this.eyebrowType,
      nosePosY: this.nosePosY,
      noseSize: this.noseSize,
      noseType: this.noseType,
      mouthStretch: this.mouthStretch,
      mouthSize: this.mouthSize,
      mouthColor: this.mouthColor,
      mouthType: this.mouthType,
      mustacheType: this.mustacheType,
      mouthPosY: this.mouthPosY,
      mustachePosY: this.mustachePosY,
      mustacheSize: this.mustacheSize,
      faceHairColor: this.faceHairColor,
      goateeType: this.goateeType,
      glassesPosY: this.glassesPosY,
      glassesSize: this.glassesSize,
      glassesColor: this.glassesColor,
      glassesType: this.glassesType,
      molePosY: this.molePosY,
      molePosX: this.molePosX,
      moleSize: this.moleSize,
      moleEnabled: this.moleEnabled,
      creatorName: this.creatorName,
      checksum: this.checksum,
    } as const;
  }
}

export const from = (data: ArrayBufferLike) => new MiiStruct(data);
