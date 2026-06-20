import { Song, UserProfile, Language, MusicDatabase } from '../types.ts';

// Local storage keys
const USERS_KEY = 'app_users';
const SONGS_KEY = 'app_songs';
const DB_LIST_KEY = 'app_music_databases';
const ACTIVE_DB_KEY = 'app_active_database_id';

// Professional Seed Songs for initialization
const SEED_SONGS: Song[] = [
  {
    id: 'seed-yoasobi-yoru',
    songName: { en: 'Yoru ni Kakeru', ja: '夜に駆ける', fr: 'Yoru ni Kakeru', es: 'Yoru ni Kakeru', zh: '夜空巡航', ko: '밤을 달리다', it: 'Yoru ni Kakeru', ru: 'Yoru ni Kakeru' },
    singerName: { en: 'YOASOBI', ja: 'YOASOBI', fr: 'YOASOBI', es: 'YOASOBI', zh: 'YOASOBI', ko: '요아소비', it: 'YOASOBI', ru: 'YOASOBI' },
    streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    artistOfficialUrl: 'https://www.yoasobi-music.jp/',
    albumArtUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=60',
    albumName: { en: 'The Book', ja: 'THE BOOK' },
    releaseDate: '2019-12-15',
    duration: 256,
    genres: ['jpop', 'anime'],
    tags: ['yoasobi', 'viral', 'pop'],
    playCount: 3200,
    skipCount: 52,
    avgListenDuration: 245,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: 'seed-lisa-gurenge',
    songName: { en: 'Gurenge', ja: '紅蓮華', fr: 'Gurenge', es: 'Gurenge', zh: '红链华', ko: '홍련화', it: 'Gurenge', ru: 'Gurenge' },
    singerName: { en: 'LiSA', ja: 'LiSA', fr: 'LiSA', es: 'LiSA', zh: 'LiSA', ko: '리사', it: 'LiSA', ru: 'LiSA' },
    streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    artistOfficialUrl: 'https://www.lxixsxa.com/',
    albumArtUrl: 'https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=400&auto=format&fit=crop&q=60',
    albumName: { en: 'LEO-NiNE', ja: 'LEO-NiNE' },
    releaseDate: '2019-07-03',
    duration: 236,
    genres: ['anime', 'jrock'],
    tags: ['demon slayer', 'lisa', 'rock'],
    playCount: 1250,
    skipCount: 12,
    avgListenDuration: 220,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: 'seed-hige-pretender',
    songName: { en: 'Pretender', ja: 'Pretender', fr: 'Pretender', es: 'Pretender', zh: 'Pretender', ko: '프리텐더', it: 'Pretender', ru: 'Pretender' },
    singerName: { en: 'Official HIGE DANdism', ja: 'Official髭男dism', fr: 'Official HIGE DANdism', es: 'Official HIGE DANdism', zh: 'Official HIGE DANdism', ko: 'Official HIGE DANdism', it: 'Official HIGE DANdism', ru: 'Official HIGE DANdism' },
    streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    artistOfficialUrl: 'https://higedan.com/',
    albumArtUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=60',
    albumName: { en: 'Traveler', ja: 'Traveler' },
    releaseDate: '2019-05-15',
    duration: 326,
    genres: ['jpop', 'jrock'],
    tags: ['hige dan', 'pop', 'melodic'],
    playCount: 980,
    skipCount: 4,
    avgListenDuration: 300,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: 'suno-justine',
    songName: { en: 'Justine (Justineeeee Light)', ja: 'ジュスティーヌ (Justineeeee Light)', fr: 'Justine (Justineeeee Light)', es: 'Justine (Justineeeee Light)', zh: 'Justine (Justineeeee Light)', ko: '저스틴 (Justineeeee Light)', it: 'Justine (Justineeeee Light)', ru: 'Жюстин (Justineeeee Light)' },
    singerName: { en: 'amarataram (Suno AI)', ja: 'amarataram (Suno AI)', fr: 'amarataram (Suno AI)', es: 'amarataram (Suno AI)', zh: 'amarataram (Suno AI)', ko: 'amarataram (Suno AI)', it: 'amarataram (Suno AI)', ru: 'amarataram (Suno AI)' },
    streamUrl: 'https://cdn1.suno.ai/b72b4894-7c2f-48ed-828b-999d08f6dc53.mp3',
    artistOfficialUrl: 'https://suno.com/song/b72b4894-7c2f-48ed-828b-999d08f6dc53?sh=9bwZHiPh0Pcfu0hU',
    albumArtUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=60',
    albumName: { en: 'Suno Generation', ja: 'Suno 世代' },
    releaseDate: '2024-05-01',
    duration: 210,
    genres: ['pop', 'ai'],
    tags: ['suno', 'ai-generated', 'electronic'],
    playCount: 450,
    skipCount: 2,
    avgListenDuration: 198,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: 'suno-invisible',
    songName: { en: 'Invisible', ja: 'インビジブル (Invisible)', fr: 'Invisible', es: 'Invisible', zh: 'Invisible', ko: '인비저블 (Invisible)', it: 'Invisible', ru: 'Invisible' },
    singerName: { en: 'lightyAndrei (Suno AI)', ja: 'lightyAndrei (Suno AI)', fr: 'lightyAndrei (Suno AI)', es: 'lightyAndrei (Suno AI)', zh: 'lightyAndrei (Suno AI)', ko: 'lightyAndrei (Suno AI)', it: 'lightyAndrei (Suno AI)', ru: 'lightyAndrei (Suno AI)' },
    streamUrl: 'https://cdn1.suno.ai/94207216-99ab-48b2-be63-c504379cc6a6.mp3',
    artistOfficialUrl: 'https://suno.com/song/94207216-99ab-48b2-be63-c504379cc6a6?sh=AyHw3E16bPnEcvaO',
    albumArtUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&auto=format&fit=crop&q=60',
    albumName: { en: 'Suno Generation', ja: 'Suno 世代' },
    releaseDate: '2025-12-13',
    duration: 205,
    genres: ['pop', 'ai'],
    tags: ['suno', 'ai-generated', 'electronic', 'invisible'],
    playCount: 520,
    skipCount: 1,
    avgListenDuration: 200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: 'suno-monster',
    songName: { en: 'Monster', ja: 'モンスター (Monster)', fr: 'Monster', es: 'Monster', zh: 'Monster', ko: '몬스터 (Monster)', it: 'Monster', ru: 'Monster' },
    singerName: { en: 'lightyAndrei (Suno AI)', ja: 'lightyAndrei (Suno AI)', fr: 'lightyAndrei (Suno AI)', es: 'lightyAndrei (Suno AI)', zh: 'lightyAndrei (Suno AI)', ko: 'lightyAndrei (Suno AI)', it: 'lightyAndrei (Suno AI)', ru: 'lightyAndrei (Suno AI)' },
    streamUrl: 'https://cdn1.suno.ai/5883a32a-9654-47a5-aec7-30c905774bfe.mp3',
    artistOfficialUrl: 'https://suno.com/song/5883a32a-9654-47a5-aec7-30c905774bfe?sh=pLjzt3FzRoVKwnon',
    albumArtUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=60',
    albumName: { en: 'Suno Generation', ja: 'Suno 世代' },
    releaseDate: '2026-06-07',
    duration: 213,
    genres: ['pop', 'ai'],
    tags: ['suno', 'ai-generated', 'electronic', 'monster'],
    playCount: 610,
    skipCount: 0,
    avgListenDuration: 213,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: 'suno-vagabundo',
    songName: { en: 'Vagabundo', ja: 'ヴァガブンド (Vagabundo)', fr: 'Vagabundo', es: 'Vagabundo', zh: 'Vagabundo', ko: '바가분도 (Vagabundo)', it: 'Vagabundo', ru: 'Vagabundo' },
    singerName: { en: 'lightyAndrei (Suno AI)', ja: 'lightyAndrei (Suno AI)', fr: 'lightyAndrei (Suno AI)', es: 'lightyAndrei (Suno AI)', zh: 'lightyAndrei (Suno AI)', ko: 'lightyAndrei (Suno AI)', it: 'lightyAndrei (Suno AI)', ru: 'lightyAndrei (Suno AI)' },
    streamUrl: 'https://cdn1.suno.ai/38fbf3c2-9200-4108-83b7-e7699f5e6f27.mp3',
    artistOfficialUrl: 'https://suno.com/song/38fbf3c2-9200-4108-83b7-e7699f5e6f27?sh=e7nPgsi65JF7MZMd',
    albumArtUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&auto=format&fit=crop&q=60',
    albumName: { en: 'Suno Generation', ja: 'Suno 世代' },
    releaseDate: '2026-06-07',
    duration: 273,
    genres: ['pop', 'ai'],
    tags: ['suno', 'ai-generated', 'electronic', 'vagabundo'],
    playCount: 730,
    skipCount: 0,
    avgListenDuration: 273,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: 'suno-two-seconds-left',
    songName: { 
      en: '2 Seconds Left', 
      ja: '残り2秒 (2 Seconds Left)', 
      fr: '2 Secondes Restantes', 
      es: '2 Segundos Restantes', 
      zh: '剩余 2 秒 (2 Seconds Left)', 
      ko: '2초 남음 (2 Seconds Left)', 
      it: '2 Secondi Rimasti', 
      ru: 'Осталось 2 секунды' 
    },
    singerName: { 
      en: 'HanaJapato (Suno AI)', 
      ja: 'HanaJapato (Suno AI)', 
      fr: 'HanaJapato (Suno AI)', 
      es: 'HanaJapato (Suno AI)', 
      zh: 'HanaJapato (Suno AI)', 
      ko: 'HanaJapato (Suno AI)', 
      it: 'HanaJapato (Suno AI)', 
      ru: 'HanaJapato (Suno AI)' 
    },
    streamUrl: 'https://cdn1.suno.ai/b1cf5c8a-31c3-4db0-9d4a-2cb5b759001b.mp3',
    artistOfficialUrl: 'https://suno.com/song/b1cf5c8a-31c3-4db0-9d4a-2cb5b759001b?sh=Z7TYCrZb5eJF1UmN',
    albumArtUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&auto=format&fit=crop&q=60',
    albumName: { en: 'Suno Generation', ja: 'Suno 世代' },
    releaseDate: '2025-09-14',
    duration: 177,
    genres: ['pop', 'ai', 'electronic'],
    tags: ['suno', 'ai-generated', 'electronic', '2-seconds-left'],
    playCount: 840,
    skipCount: 0,
    avgListenDuration: 177,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true
  }
];

// Fictional visual-rock songs for CLOUD-TEARS to seed!
const CLOUD_TEARS_SEED_SONGS: Song[] = [
  {
    id: 'suno-ct-neon-cry',
    songName: { 
      en: 'Teardrop in Neon Lights', 
      ja: 'ネオンの涙 (Tears of Neon)', 
      fr: 'Larme de Néon', 
      es: 'Lágrima en las Luces de Neón', 
      zh: '霓虹泪', 
      ko: '네온의 눈물', 
      it: 'Lacrima nel Neon', 
      ru: 'Слеза в неоновом свете' 
    },
    singerName: { en: 'CLOUD-TEARS', ja: 'CLOUD-TEARS', fr: 'CLOUD-TEARS', es: 'CLOUD-TEARS', zh: 'CLOUD-TEARS', ko: 'CLOUD-TEARS', it: 'CLOUD-TEARS', ru: 'CLOUD-TEARS' },
    streamUrl: 'https://cdn1.suno.ai/94207216-99ab-48b2-be63-c504379cc6a6.mp3', // Stream actual high quality mp3 (same as Invisible)
    artistOfficialUrl: 'https://suno.com/song/94207216-99ab-48b2-be63-c504379cc6a6?sh=AyHw3E16bPnEcvaO',
    albumArtUrl: 'https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=400&auto=format&fit=crop&q=60',
    albumName: { en: 'Acoustic Horizon', ja: '音響の地平線' },
    releaseDate: '2026-05-15',
    duration: 205,
    genres: ['visual-kei', 'rock'],
    tags: ['cloud-tears', 'visual-kei', 'melodic-rock', 'jrock'],
    playCount: 1540,
    skipCount: 3,
    avgListenDuration: 195,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: 'suno-ct-storm',
    songName: { 
      en: 'Stormy Horizon', 
      ja: '嵐の地平線 (Stormy Horizon)', 
      fr: 'Horizon Tempétueux', 
      es: 'Horizonte Tormentoso', 
      zh: '风暴地平线', 
      ko: '폭풍의 지평선', 
      it: 'Orizzonte Tempestoso', 
      ru: 'Штормовой горизонт' 
    },
    singerName: { en: 'CLOUD-TEARS', ja: 'CLOUD-TEARS', fr: 'CLOUD-TEARS', es: 'CLOUD-TEARS', zh: 'CLOUD-TEARS', ko: 'CLOUD-TEARS', it: 'CLOUD-TEARS', ru: 'CLOUD-TEARS' },
    streamUrl: 'https://cdn1.suno.ai/38fbf3c2-9200-4108-83b7-e7699f5e6f27.mp3', // Stream actual high quality mp3 (same as Vagabundo)
    artistOfficialUrl: 'https://suno.com/song/38fbf3c2-9200-4108-83b7-e7699f5e6f27?sh=e7nPgsi65JF7MZMd',
    albumArtUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&auto=format&fit=crop&q=60',
    albumName: { en: 'Acoustic Horizon', ja: '音響の地平線' },
    releaseDate: '2026-06-01',
    duration: 273,
    genres: ['visual-kei', 'ballad'],
    tags: ['cloud-tears', 'visual-kei', 'ballad', 'heavy-rain'],
    playCount: 1220,
    skipCount: 1,
    avgListenDuration: 270,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true
  }
];

const DEFAULT_DATABASES: MusicDatabase[] = [
  {
    id: 'db-default',
    name: 'Universal Library',
    description: 'The main global database containing all music tracks and AI streams.',
    filterType: 'all',
    filterValue: '',
    createdAt: new Date().toISOString()
  },
  {
    id: 'db-cloud-tears',
    name: 'Band CLOUD-TEARS',
    description: 'Special active database containing only releases and sessions of the visual rock band CLOUD-TEARS.',
    filterType: 'band',
    filterValue: 'CLOUD-TEARS',
    createdAt: new Date().toISOString()
  }
];

// Helper to get data from localStorage
const getLocalData = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Helper to save data to localStorage
const saveLocalData = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const dbService = {
  // --- DATABASE CONTROLS ---
  getSongsKey(): string {
    const activeDbId = this.getActiveDatabaseId();
    if (activeDbId === 'db-default') {
      return SONGS_KEY; // keep old key "app_songs" to not wipe customer's history!
    }
    return `${SONGS_KEY}_${activeDbId}`;
  },

  getActiveDatabaseId(): string {
    return localStorage.getItem(ACTIVE_DB_KEY) || 'db-default';
  },

  setActiveDatabaseId(id: string): void {
    localStorage.setItem(ACTIVE_DB_KEY, id);
  },

  getDatabases(): MusicDatabase[] {
    const dbs = getLocalData<MusicDatabase>(DB_LIST_KEY);
    if (dbs.length === 0) {
      saveLocalData(DB_LIST_KEY, DEFAULT_DATABASES);
      return DEFAULT_DATABASES;
    }
    return dbs;
  },

  createDatabase(name: string, description: string, filterType: 'all' | 'band' | 'genre' | 'none', filterValue: string): string {
    const dbs = this.getDatabases();
    const cleanId = 'db-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = cleanId || 'db-' + Math.random().toString(36).substring(2, 9);
    
    // Check if duplicate ID
    if (dbs.some(d => d.id === id)) {
      throw new Error(`A database with name "${name}" already exists.`);
    }

    const newDb: MusicDatabase = {
      id,
      name,
      description,
      filterType,
      filterValue,
      createdAt: new Date().toISOString()
    };
    
    dbs.push(newDb);
    saveLocalData(DB_LIST_KEY, dbs);

    // Seed appropriate content for this database
    const key = `${SONGS_KEY}_${id}`;
    let initialSongs: Song[] = [];
    
    if (filterType === 'all') {
      // Clone from default
      const defaultSongs = getLocalData<Song>(SONGS_KEY);
      initialSongs = defaultSongs.length > 0 ? defaultSongs : SEED_SONGS;
    } else if (filterType === 'band') {
      const searchVal = filterValue.trim().toLowerCase();
      const combined = [...SEED_SONGS, ...CLOUD_TEARS_SEED_SONGS];
      initialSongs = combined.filter(s => 
        (s.singerName.en && s.singerName.en.toLowerCase().includes(searchVal)) ||
        (s.singerName.ja && s.singerName.ja.toLowerCase().includes(searchVal))
      );
    } else if (filterType === 'genre') {
      const searchVal = filterValue.trim().toLowerCase();
      const combined = [...SEED_SONGS, ...CLOUD_TEARS_SEED_SONGS];
      initialSongs = combined.filter(s => 
        s.genres.some(g => g.toLowerCase().includes(searchVal)) ||
        s.tags.some(t => t.toLowerCase().includes(searchVal))
      );
    }
    
    saveLocalData(key, initialSongs);
    return id;
  },

  deleteDatabase(id: string): void {
    if (id === 'db-default') {
      throw new Error("Cannot delete default database!");
    }
    const dbs = this.getDatabases();
    const filtered = dbs.filter(d => d.id !== id);
    saveLocalData(DB_LIST_KEY, filtered);
    
    // Clean up content key
    localStorage.removeItem(`${SONGS_KEY}_${id}`);
    
    // If active was deleted, switch to default
    if (this.getActiveDatabaseId() === id) {
      this.setActiveDatabaseId('db-default');
    }
  },

  // User Profile
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const users = getLocalData<UserProfile>(USERS_KEY);
    return users.find(u => u.uid === userId) || null;
  },

  async createUserProfile(profile: Partial<UserProfile>): Promise<void> {
    if (!profile.uid) return;
    const users = getLocalData<UserProfile>(USERS_KEY);
    const existingIndex = users.findIndex(u => u.uid === profile.uid);
    
    const newProfile: UserProfile = {
      uid: profile.uid,
      email: profile.email || '',
      displayName: profile.displayName || '',
      photoURL: profile.photoURL || '',
      language: profile.language || Language.EN,
      isAdmin: false,
      isPremium: false,
      raiTokens: 0,
      totalListenMinutes: 0,
      selectedGenres: [],
      ...profile
    } as UserProfile;

    if (existingIndex >= 0) {
      users[existingIndex] = newProfile;
    } else {
      users.push(newProfile);
    }
    saveLocalData(USERS_KEY, users);
  },

  // Songs
  async getSongs(includeInactive = false): Promise<Song[]> {
    const key = this.getSongsKey();
    let songs = getLocalData<Song>(key);
    const activeId = this.getActiveDatabaseId();

    if (songs.length === 0) {
      if (activeId === 'db-cloud-tears') {
        saveLocalData(key, CLOUD_TEARS_SEED_SONGS);
        return includeInactive ? CLOUD_TEARS_SEED_SONGS : CLOUD_TEARS_SEED_SONGS.filter(s => s.isActive);
      } else {
        saveLocalData(key, SEED_SONGS);
        return includeInactive ? SEED_SONGS : SEED_SONGS.filter(s => s.isActive);
      }
    }
    
    // Auto-inject Suno candidates to ensure they show up for the user without having to clear cookies/localStorage
    if (activeId === 'db-default') {
      let updated = false;
      if (!songs.some(s => s.id === 'suno-justine')) {
        const justineSong = SEED_SONGS.find(s => s.id === 'suno-justine');
        if (justineSong) {
          songs = [justineSong, ...songs];
          updated = true;
        }
      }
      if (!songs.some(s => s.id === 'suno-invisible')) {
        const invisibleSong = SEED_SONGS.find(s => s.id === 'suno-invisible');
        if (invisibleSong) {
          songs = [invisibleSong, ...songs];
          updated = true;
        }
      } else {
        // Force correct stream URL and details in case they already have a broken / stubbed version
        const index = songs.findIndex(s => s.id === 'suno-invisible');
        if (index >= 0 && songs[index].streamUrl !== 'https://cdn1.suno.ai/94207216-99ab-48b2-be63-c504379cc6a6.mp3') {
          songs[index].streamUrl = 'https://cdn1.suno.ai/94207216-99ab-48b2-be63-c504379cc6a6.mp3';
          songs[index].artistOfficialUrl = 'https://suno.com/song/94207216-99ab-48b2-be63-c504379cc6a6?sh=AyHw3E16bPnEcvaO';
          songs[index].songName = { en: 'Invisible', ja: 'インビジブル (Invisible)', fr: 'Invisible', es: 'Invisible', zh: 'Invisible', ko: '인비저블 (Invisible)', it: 'Invisible', ru: 'Invisible' };
          updated = true;
        }
      }
      if (!songs.some(s => s.id === 'suno-monster')) {
        const monsterSong = SEED_SONGS.find(s => s.id === 'suno-monster');
        if (monsterSong) {
          songs = [monsterSong, ...songs];
          updated = true;
        }
      } else {
        const index = songs.findIndex(s => s.id === 'suno-monster');
        if (index >= 0 && songs[index].streamUrl !== 'https://cdn1.suno.ai/5883a32a-9654-47a5-aec7-30c905774bfe.mp3') {
          songs[index].streamUrl = 'https://cdn1.suno.ai/5883a32a-9654-47a5-aec7-30c905774bfe.mp3';
          songs[index].artistOfficialUrl = 'https://suno.com/song/5883a32a-9654-47a5-aec7-30c905774bfe?sh=pLjzt3FzRoVKwnon';
          updated = true;
        }
      }
      if (!songs.some(s => s.id === 'suno-vagabundo')) {
        const vagabundoSong = SEED_SONGS.find(s => s.id === 'suno-vagabundo');
        if (vagabundoSong) {
          songs = [vagabundoSong, ...songs];
          updated = true;
        }
      } else {
        const index = songs.findIndex(s => s.id === 'suno-vagabundo');
        if (index >= 0 && songs[index].streamUrl !== 'https://cdn1.suno.ai/38fbf3c2-9200-4108-83b7-e7699f5e6f27.mp3') {
          songs[index].streamUrl = 'https://cdn1.suno.ai/38fbf3c2-9200-4108-83b7-e7699f5e6f27.mp3';
          songs[index].artistOfficialUrl = 'https://suno.com/song/38fbf3c2-9200-4108-83b7-e7699f5e6f27?sh=e7nPgsi65JF7MZMd';
          updated = true;
        }
      }
      if (!songs.some(s => s.id === 'suno-two-seconds-left')) {
        const twoSecSong = SEED_SONGS.find(s => s.id === 'suno-two-seconds-left');
        if (twoSecSong) {
          songs = [twoSecSong, ...songs];
          updated = true;
        }
      } else {
        const index = songs.findIndex(s => s.id === 'suno-two-seconds-left');
        if (index >= 0 && songs[index].streamUrl !== 'https://cdn1.suno.ai/b1cf5c8a-31c3-4db0-9d4a-2cb5b759001b.mp3') {
          songs[index].streamUrl = 'https://cdn1.suno.ai/b1cf5c8a-31c3-4db0-9d4a-2cb5b759001b.mp3';
          songs[index].artistOfficialUrl = 'https://suno.com/song/b1cf5c8a-31c3-4db0-9d4a-2cb5b759001b?sh=Z7TYCrZb5eJF1UmN';
          updated = true;
        }
      }
      if (updated) {
        saveLocalData(key, songs);
      }
    }

    if (includeInactive) return songs;
    return songs.filter(s => s.isActive);
  },

  async addSong(song: Partial<Song>): Promise<string> {
    const key = this.getSongsKey();
    const songs = getLocalData<Song>(key);
    const id = 'song-' + Math.random().toString(36).substring(2, 9);
    const newSong: Song = {
      id,
      ...song,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      playCount: 0,
      skipCount: 0,
      avgListenDuration: 0,
      isActive: true,
    } as Song;
    songs.push(newSong);
    saveLocalData(key, songs);
    return id;
  },

  async updateSong(songId: string, updates: Partial<Song>): Promise<void> {
    const key = this.getSongsKey();
    const songs = getLocalData<Song>(key);
    const index = songs.findIndex(s => s.id === songId);
    if (index >= 0) {
      songs[index] = { 
        ...songs[index], 
        ...updates, 
        updatedAt: new Date().toISOString() 
      };
      saveLocalData(key, songs);
    }
  },

  async deleteSong(songId: string): Promise<void> {
    const key = this.getSongsKey();
    const songs = getLocalData<Song>(key);
    const filtered = songs.filter(s => s.id !== songId);
    saveLocalData(key, filtered);
  },

  async incrementPlayCount(songId: string): Promise<void> {
    const key = this.getSongsKey();
    const songs = getLocalData<Song>(key);
    const index = songs.findIndex(s => s.id === songId);
    if (index >= 0) {
      songs[index].playCount = (songs[index].playCount || 0) + 1;
      saveLocalData(key, songs);
    }
  }
};
