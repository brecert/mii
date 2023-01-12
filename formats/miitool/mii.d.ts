type u8 = number;
type u64 = number;
type u32 = number;

export enum RegionLock {
  None = 0b00,
  Japan = 0b01,
  UnitedStates = 0b10,
  EuropeAndAustralia = 0b11,
}

export enum Sex {
  Male = 0,
  Female = 1,
}

export enum Charset {
  JapanUnitedStatesEuropeAndAustralia = 0b00,
  China = 0b01,
  Korea = 0b10,
  Taiwan = 0b11,
}

export enum Platform {
  NintendoWii = 0b0001,
  NintendoDs = 0b0010,
  Nintendo3ds = 0b0011,
  NintendoWiiUAndSwitch = 0b0100,
}

export enum BirthdayMonth {
  None = 0,
  January = 1,
  February = 2,
  March = 3,
  April = 4,
  May = 5,
  June = 6,
  July = 7,
  August = 8,
  September = 9,
  October = 10,
  November = 11,
  December = 12,
}

export interface MiiId {
  creation_time: u32;
  is_valid: boolean;
  is_developer_or_temporary: boolean;
  unknown: boolean;
  is_not_special: boolean;
}

export interface MiiCore {
  creation_method: u8;
  is_copying_enabled: boolean;
  contains_profanity: boolean;
  region_lock: RegionLock;
  charset: Charset;
  page_index: u8;
  slot_index: u8;
  unknown_1: u8;
  minimum_platform: Platform;
  console_id: u64;
  id: MiiId;
  console_mac: u8[];
  sex: Sex;
  birthday_month: BirthdayMonth;
  birthday_day: u8;
  favorite_color: u8;
  is_favorite: boolean;
  unknown_2: boolean;
  name: string;
  height: u8;
  width: u8;
  is_sharing_disabled: boolean;
  face_shape: u8;
  skin_color: u8;
  wrinkles: u8;
  makeup: u8;
  hair_style: u8;
  hair_color: u8;
  is_hair_flipped: boolean;
  eye_style: u8;
  eye_color: u8;
  eye_scale: u8;
  eye_stretch: u8;
  eye_rotation: u8;
  eye_distance: u8;
  eye_height: u8;
  eyebrow_style: u8;
  eyebrow_color: u8;
  eyebrow_scale: u8;
  eyebrow_stretch: u8;
  eyebrow_rotation: u8;
  eyebrow_distance: u8;
  eyebrow_height: u8;
  nose_style: u8;
  nose_scale: u8;
  nose_height: u8;
  mouth_style: u8;
  mouth_color: u8;
  mouth_scale: u8;
  mouth_stretch: u8;
  mouth_height: u8;
  mustache_style: u8;
  beard_style: u8;
  facial_hair_color: u8;
  mustache_scale: u8;
  mustache_height: u8;
  glasses_style: u8;
  glasses_color: u8;
  glasses_scale: u8;
  glasses_height: u8;
  is_mole_present: boolean;
  mole_scale: u8;
  mole_x_position: u8;
  mole_y_position: u8;
}
