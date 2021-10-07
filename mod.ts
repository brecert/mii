import * as FaceCoreData from "./fcd.ts";
import * as MiiStudio from "./mii_studio.ts";
import * as convert from "./convert.ts";

// aliases, may change functionality in the future
export const formats = {
  MiiStudio,
  FaceCoreData,
  WiiU: FaceCoreData,
  N3DS: FaceCoreData,
};

export const utils = {
  convert,
};
