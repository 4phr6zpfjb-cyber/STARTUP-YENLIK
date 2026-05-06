export type Language = "en" | "ru" | "kz";

export type PetMood = "happy" | "tired" | "sad";

export type CreatureType = "fox" | "bear" | "ghost";

export interface FocusUser {
  uid: string;
  email: string | null;
  fullName: string | null;
}

export interface AppLimit {
  id: string;
  appName: string;
  limitSeconds: number;
  usedSeconds: number;
}
