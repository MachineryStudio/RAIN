/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Language {
  JA = 'ja',
  EN = 'en',
  FR = 'fr',
  ES = 'es',
  IT = 'it',
  KO = 'ko',
  ZH = 'zh',
  RU = 'ru',
}

export type MultiLangString = {
  [key in Language]?: string;
} & { [key: string]: string | undefined };

export interface Song {
  id: string;
  singerName: MultiLangString;
  songName: MultiLangString;
  streamUrl: string;
  artistOfficialUrl: string;
  albumArtUrl?: string;
  albumName?: MultiLangString;
  releaseDate: unknown; // Firestore Timestamp
  duration: number; // seconds
  genres: string[];
  tags: string[];
  bpm?: number;
  playCount: number;
  skipCount: number;
  avgListenDuration: number;
  createdAt: unknown;
  updatedAt: unknown;
  isActive: boolean;
}

export interface Genre {
  id: string;
  name: MultiLangString;
  description: MultiLangString;
  icon: string;
  color: string;
  gradient: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  language: Language;
  selectedGenres: string[];
  isAdmin: boolean;
  isPremium: boolean;
  raiTokens: number;
  totalListenMinutes: number;
}

export interface MusicDatabase {
  id: string;
  name: string;
  description: string;
  filterType: 'all' | 'band' | 'genre' | 'none';
  filterValue: string;
  createdAt: string;
}

