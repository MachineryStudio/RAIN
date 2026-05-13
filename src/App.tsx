/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Search, 
  Radio, 
  Library, 
  Gamepad2, 
  Settings, 
  Play, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  User as UserIcon, 
  LogIn,
  Sparkles,
  Headphones
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import './lib/i18n.ts';
import { useTranslation } from 'react-i18next';
import { AuthProvider, useAuth } from './lib/auth.tsx';
import { dbService } from './services/dbService.ts';
import { Song, Language } from './types.ts';

type View = 'home' | 'search' | 'radio' | 'library' | 'games' | 'settings' | 'admin';

function RaionTextLogo({ size = 'small' }: { size?: 'small' | 'large' }) {
  const containerClass = size === 'large' ? 'gap-2' : 'gap-0.5 scale-[0.35] origin-center';
  const headphonesSize = size === 'large' ? 64 : 36;
  const raionSize = size === 'large' ? 'text-5xl' : 'text-2xl';
  const kanjiSize = size === 'large' ? 'text-4xl' : 'text-xl';

  return (
    <div className={`flex flex-col items-center ${containerClass}`}>
      <Headphones size={headphonesSize} className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
      <div className="text-center leading-none">
        <h1 className={`${raionSize} font-black italic tracking-tighter uppercase neon-blue text-cyan-400`}>RAION</h1>
        <h2 className={`${kanjiSize} font-black italic tracking-tighter uppercase neon-red text-red-500`}>雷音</h2>
      </div>
    </div>
  );
}

function RaionMascot({ size = 200 }: { size?: number }) {
  return (
    <svg viewBox="0 0 200 200" style={{ width: size, height: size }} className="drop-shadow-2xl">
      {/* Eggshell Back */}
      <path d="M40 140 C40 180 160 180 160 140" fill="white" stroke="#E5E7EB" strokeWidth="2" />
      
      {/* Character Body (Blue Cat) */}
      <circle cx="100" cy="100" r="70" fill="#ADE8FF" />
      
      {/* Ears */}
      <path d="M50 50 L75 40 L85 65 Z" fill="#ADE8FF" />
      <path d="M150 50 L125 40 L115 65 Z" fill="#ADE8FF" />
      {/* Inner Ears */}
      <path d="M55 55 L70 48 L75 60 Z" fill="#FFC0DB" />
      <path d="M145 55 L130 48 L125 60 Z" fill="#FFC0DB" />

      {/* Headphones */}
      <path d="M50 100 A 70 70 0 0 1 150 100" fill="none" stroke="#2C9DD1" strokeWidth="12" strokeLinecap="round" />
      <rect x="35" y="85" width="25" height="45" rx="10" fill="#2C9DD1" />
      <rect x="140" y="85" width="25" height="45" rx="10" fill="#2C9DD1" />
      
      {/* Eyes */}
      <circle cx="75" cy="105" r="15" fill="black" />
      <circle cx="125" cy="105" r="15" fill="black" />
      <circle cx="80" cy="100" r="5" fill="white" />
      <circle cx="130" cy="100" r="5" fill="white" />
      <circle cx="72" cy="112" r="3" fill="white" />
      <circle cx="122" cy="112" r="3" fill="white" />
      
      {/* Cheeks */}
      <circle cx="60" cy="125" r="8" fill="#FF83A4" opacity="0.6" />
      <circle cx="140" cy="125" r="8" fill="#FF83A4" opacity="0.6" />
      
      {/* Mouth */}
      <path d="M90 120 C95 125 100 125 100 120 C100 125 105 125 110 120" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />

      {/* Eggshell Front */}
      <path d="M30 140 L50 125 L75 135 L100 120 L125 135 L150 125 L170 140 C170 175 30 175 30 140 Z" fill="#FFF5F8" stroke="#FFD1DC" strokeWidth="4" />
      {/* Hearts on Egg */}
      <path d="M95 160 Q100 155 105 160 Q100 170 95 160" fill="#FF83A4" />
      <path d="M135 155 Q140 150 145 155 Q140 165 135 155" fill="#FF83A4" />
    </svg>
  );
}

function MainLayout() {
  const { t, i18n } = useTranslation();
  const { user, profile, signIn, loading } = useAuth();
  const [currentView, setCurrentView] = useState<View>('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const data = await dbService.getSongs();
      setSongs(data);
    };
    fetchSongs();
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: t('home', 'Home') },
    { id: 'radio', icon: Radio, label: t('radio', 'Radio') },
    { id: 'games', icon: Gamepad2, label: t('games', 'Games') },
    { id: 'library', icon: Library, label: t('library', 'Library') },
    { id: 'settings', icon: Settings, label: t('settings', 'Settings') },
  ];

  if (profile?.isAdmin) {
    navItems.push({ id: 'admin', icon: UserIcon, label: 'Admin' });
  }

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    dbService.incrementPlayCount(song.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF0] flex items-center justify-center">
         <motion.div 
           animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
           transition={{ repeat: Infinity, duration: 2 }}
           className="w-12 h-12 bg-cyan-500 rounded-2xl"
         />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF0] text-[#1A1A1A] font-sans selection:bg-cyan-500/30 flex flex-col overflow-hidden">
      {/* Header following kumaGO pattern */}
      <header className="p-6 flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 bg-black rounded-2xl soft-shadow flex items-center justify-center p-1 border border-white/10 overflow-hidden">
             <RaionTextLogo />
          </div>
          <div className="hidden sm:block">
            <p className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase">RAION 雷音 × LIGHTHOUSE 橋</p>
            <h1 className="text-2xl font-black tracking-tight leading-none italic uppercase">RAION <span className="text-cyan-500 italic">雷音</span></h1>
          </div>
        </div>
        <button className="bg-white rounded-full px-4 py-2 soft-shadow flex items-center gap-2 text-[10px] font-black tracking-widest uppercase hover:bg-zinc-50 transition-colors">
          <Sparkles size={14} className="text-cyan-500" /> SLEEP
        </button>
      </header>

      {/* Language Toggle following kumaGO pattern */}
      <div className="px-6 mb-6">
        <div className="bg-[#EAE6D6] p-1 rounded-full inline-flex gap-1">
           <button 
             onClick={() => i18n.changeLanguage('en')}
             className={`px-6 py-1.5 rounded-full text-[10px] font-black transition-all ${i18n.language === 'en' ? 'bg-[#293556] text-white shadow-lg' : 'text-[#293556]'}`}
           >
             EN
           </button>
           <button 
             onClick={() => i18n.changeLanguage('ja')}
             className={`px-6 py-1.5 rounded-full text-[10px] font-black transition-all ${i18n.language === 'ja' ? 'bg-[#293556] text-white shadow-lg' : 'text-[#293556]'}`}
           >
             日本語
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-44 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentView === 'home' && (
              <section className="space-y-10">
                {/* Main Hero Card following kumaGO mascot layout */}
                <div className="bg-[#FFF4E4] rounded-[50px] p-8 soft-shadow relative overflow-hidden group">
                   <div className="absolute top-10 right-10">
                      <p className="text-3xl font-black text-[#A0886F] opacity-30 italic uppercase">Thunder</p>
                   </div>
                   <div className="flex flex-col items-center py-6">
                      <motion.div 
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="relative"
                      >
                        <div className="w-64 h-64 bg-white rounded-full soft-shadow flex items-center justify-center border-[8px] border-white overflow-hidden">
                           <RaionMascot size={220} />
                        </div>
                        <div className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-2xl soft-shadow font-black text-lg italic text-cyan-500">Zzz</div>
                      </motion.div>
                   </div>
                   
                   <div className="bg-white/80 backdrop-blur-md rounded-[30px] p-4 text-center soft-shadow mt-4">
                      <p className="font-bold text-[#A0886F]">{t('appName')} ... Feel the Thunder today ⚡</p>
                   </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-black tracking-tighter">こんにちは、{user?.displayName || 'User'} 先生だよ</h2>
                  <p className="text-zinc-500 font-medium">一緒に日本語ゲームを楽しもう。</p>
                </div>

                <div className="space-y-4">
                   {songs.map(song => (
                     <div 
                       key={song.id}
                       onClick={() => handlePlaySong(song)}
                       className="bg-white rounded-3xl p-5 soft-shadow flex items-center gap-4 group cursor-pointer hover:bg-zinc-50 transition-all border-l-8 border-cyan-500"
                     >
                        <div className="w-14 h-14 bg-zinc-100 rounded-2xl overflow-hidden shadow-sm">
                           <img src={song.albumArtUrl || `https://picsum.photos/seed/${song.id}/400`} alt="art" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                           <h4 className="font-bold text-lg leading-tight">{song.songName[i18n.language as Language] || Object.values(song.songName)[0]}</h4>
                           <p className="text-sm text-zinc-400 font-medium">{song.singerName[i18n.language as Language] || Object.values(song.singerName)[0]}</p>
                        </div>
                        <div className="w-10 h-10 bg-[#293556] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                           <Play size={18} fill="white" className="ml-0.5" />
                        </div>
                     </div>
                   ))}
                </div>
              </section>
            )}

            {currentView === 'radio' && (
               <section className="py-10 text-center">
                  <div className="w-full aspect-square bg-white rounded-[50px] soft-shadow flex items-center justify-center mb-10 overflow-hidden relative">
                     <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-50" />
                     <Radio size={120} className="text-cyan-500 animate-pulse relative z-10" />
                  </div>
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-4">RAION LIVE</h2>
                  <p className="text-zinc-500 font-bold tracking-widest uppercase text-xs">Streaming Worldwide Radio</p>
                  <button className="mt-10 w-full bg-[#293556] text-white font-black p-6 rounded-[30px] uppercase tracking-widest shadow-xl shadow-cyan-900/20">
                     Enter the Pulse
                  </button>
               </section>
            )}

            {currentView === 'settings' && (
              <section className="space-y-10 py-6">
                <h2 className="text-4xl font-black italic tracking-tighter uppercase">Settings</h2>
                <div className="space-y-4">
                  {user && (
                    <div className="bg-white p-6 rounded-[40px] soft-shadow flex items-center gap-4">
                       <img src={user.photoURL || ''} className="w-16 h-16 rounded-3xl soft-shadow" />
                       <div>
                          <p className="font-black text-xl italic uppercase font-noto">{user.displayName}</p>
                          <p className="text-xs text-zinc-400 font-bold">{user.email}</p>
                       </div>
                    </div>
                  )}
                  
                  <div className="bg-white p-8 rounded-[40px] soft-shadow space-y-6">
                     <div>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Account Tier</p>
                        <div className="flex justify-between items-center bg-[#FDFBF0] p-4 rounded-3xl">
                           <span className="font-black italic uppercase">Basic Member</span>
                           <button className="bg-cyan-500 text-black text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">Upgrade</button>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="flex flex-col items-center pt-20">
                   <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center p-3 mb-4 soft-shadow">
                      <div className="w-full h-full bg-cyan-400 rounded-lg" />
                   </div>
                   <p className="font-black text-lg italic uppercase">LIGHTHOUSE 橋</p>
                   <p className="text-[10px] font-black tracking-[0.4em] text-zinc-400">PROTOTYPE SOFTWARE PIPELINE</p>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mini Player following kumaGO card style */}
      <div className="fixed bottom-32 left-6 right-6 z-40">
        <motion.div
           layout
           className="bg-white/95 backdrop-blur-2xl rounded-[35px] p-4 flex items-center gap-4 soft-shadow border border-white"
        >
          <div className="w-16 h-16 bg-[#FDFBF0] rounded-[22px] overflow-hidden flex-shrink-0 soft-shadow p-1">
             {currentSong ? (
               <img src={currentSong.albumArtUrl || `https://picsum.photos/seed/${currentSong.id}/400`} className="w-full h-full object-cover rounded-xl" />
             ) : (
               <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl" />
             )}
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <h4 className="font-black truncate uppercase text-lg italic tracking-tight">
              {currentSong ? (currentSong.songName[i18n.language as Language] || Object.values(currentSong.songName)[0]) : 'Radio Horizon'}
            </h4>
            <p className="text-[11px] font-bold text-cyan-600 truncate uppercase mt-0.5 tracking-widest">
              {currentSong ? (currentSong.singerName[i18n.language as Language] || Object.values(currentSong.singerName)[0]) : 'RAION Selection'}
            </p>
          </div>
          <button
             onClick={() => setIsPlaying(!isPlaying)}
             className="w-14 h-14 bg-[#293556] text-white rounded-[20px] flex items-center justify-center hover:scale-105 active:scale-95 transition-all soft-shadow"
           >
              {isPlaying ? <div className="w-5 h-6 flex gap-1.5 justify-center"><div className="w-2 h-full bg-white rounded-full" /><div className="w-2 h-full bg-white rounded-full" /></div> : <Play size={26} fill="white" className="ml-1" />}
          </button>
        </motion.div>
      </div>

      {/* Bottom Nav following kumaGO theme but refined */}
      <nav className="bg-white/80 backdrop-blur-2xl border-t border-zinc-100 fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center p-3 pb-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              className={`flex flex-col items-center gap-1.5 p-2 transition-all group ${isActive ? 'text-[#293556]' : 'text-zinc-400 hover:text-zinc-600'}`}
            >
              <div className="relative p-2 rounded-2xl group-hover:bg-zinc-50 transition-colors">
                <Icon size={22} strokeWidth={isActive ? 3 : 2} />
                {isActive && (
                  <motion.div 
                    layoutId="nav-bg"
                    className="absolute inset-0 bg-[#293556]/5 rounded-2xl -z-10"
                  />
                )}
              </div>
              {isActive && (
                <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

