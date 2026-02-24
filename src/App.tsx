/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Heart, Sparkles, Moon, Star, Laugh, CheckCircle2, Ghost, PartyPopper, Cat, Utensils, Bed, Coffee, Gift, Award, MousePointer2 } from "lucide-react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  key?: React.Key;
}

const FadeIn = ({ children, delay = 0 }: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </motion.div>
);

const TeddyBear = ({ className }: { className?: string }) => (
  <span className={className} role="img" aria-label="teddy bear">🧸</span>
);

const HeartExplosion = ({ x, y }: { x: number, y: number, key?: React.Key }) => (
  <motion.div
    initial={{ scale: 0, x, y }}
    animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0], y: y - 100 }}
    transition={{ duration: 1 }}
    className="fixed pointer-events-none z-[60] text-2xl"
  >
    ❤️
  </motion.div>
);

export default function App() {
  const [pookieCount, setPookieCount] = useState(0);
  const [isPookieMode, setIsPookieMode] = useState(false);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [mood, setMood] = useState("Happy");
  const [explosions, setExplosions] = useState<{ id: number, x: number, y: number }[]>([]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handlePookieClick = (e: React.MouseEvent) => {
    setPookieCount(prev => prev + 1);
    const id = Date.now();
    setExplosions(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => {
      setExplosions(prev => prev.filter(exp => exp.id !== id));
    }, 1000);

    if (pookieCount + 1 >= 15) {
      setIsPookieMode(true);
    }
  };

  const moveButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setButtonPos({ x, y });
  };

  const moods = [
    { name: "Happy", icon: <Sparkles className="w-5 h-5" />, msg: "Yay! Let's celebrate with chocolate! 🍫" },
    { name: "Hungry", icon: <Utensils className="w-5 h-5" />, msg: "Quick! Someone get this girl some pizza! 🍕" },
    { name: "Sleepy", icon: <Bed className="w-5 h-5" />, msg: "Time for a pookie nap... 😴" },
    { name: "Needs Kisses", icon: <Heart className="w-5 h-5" />, msg: "Sending 1,000,000 virtual kisses! 💋" },
    { name: "Grumpy", icon: <Ghost className="w-5 h-5" />, msg: "Warning: Low pookie energy. Deploy snacks! 🥨" },
  ];

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-1000 ${isPookieMode ? 'bg-rose-100' : 'bg-[#fdfcfb]'}`}>
      {/* Love Meter (Scroll Progress) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-rose-400 z-[100] origin-left"
        style={{ scaleX }}
      />
      <div className="fixed top-4 right-4 z-[100] bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-rose-500 border border-rose-100 shadow-sm">
        LOVE METER: {Math.round(scrollYProgress.get() * 100)}%
      </div>

      {/* Heart Explosions */}
      {explosions.map(exp => (
        <HeartExplosion key={exp.id} x={exp.x} y={exp.y} />
      ))}

      {/* Floating Teddy Bears */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "110%",
              rotate: 0 
            }}
            animate={{ 
              y: "-10%",
              rotate: 360,
              x: (Math.random() * 100) + "%"
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              delay: Math.random() * 20,
              ease: "linear"
            }}
            className="absolute text-4xl opacity-20"
          >
            <TeddyBear />
          </motion.div>
        ))}
      </div>

      {/* 1️⃣ Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-100/50 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-50/50 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <FadeIn>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-6 relative"
          >
            <Heart className="w-16 h-16 text-rose-400 fill-rose-400/20" />
            <div className="absolute -top-2 -right-2">
              <TeddyBear className="text-2xl" />
            </div>
          </motion.div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6">
            Aldiana <span className="text-rose-400">🤍</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-500 font-serif italic mb-2">
            (Yes, you’re stuck with me 😜)
          </p>
          <p className="text-xl md:text-2xl font-light text-stone-600 max-w-md mx-auto">
            A tiny website… for a big part of my heart ❤️
          </p>
          
          <div className="mt-8 flex flex-col items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePookieClick}
              className="px-6 py-3 bg-rose-400 text-white rounded-full shadow-lg font-medium flex items-center gap-2 relative overflow-hidden group"
            >
              <span className="relative z-10">Click for Pookie Points: {pookieCount}</span>
              <motion.div 
                className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"
              />
            </motion.button>
            {pookieCount > 0 && (
              <motion.p 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-rose-500 font-serif italic font-bold"
              >
                {pookieCount < 5 ? "More pookie!" : pookieCount < 10 ? "Almost Pookie Mode..." : pookieCount < 15 ? "POOKIE LEVELS CRITICAL!" : "⚠️ POOKIE OVERLOAD ⚠️"}
              </motion.p>
            )}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 flex items-center justify-center gap-2 text-sm text-stone-400 uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4" />
            <span>Warning: May cause excessive smiling and butterflies 🦋</span>
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </FadeIn>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone-300"
        >
          <div className="w-px h-12 bg-current mx-auto" />
        </motion.div>
      </section>

      {/* NEW: Mood Selector Section */}
      <section className="py-24 bg-stone-50">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="font-display text-4xl mb-4 text-stone-800">How is Pookie feeling today? 🧸</h2>
            <p className="text-stone-500 font-serif italic mb-12">Select a mood to deploy emergency pookie protocols</p>
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {moods.map((m) => (
              <motion.button
                key={m.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMood(m.name)}
                className={`px-6 py-3 rounded-2xl flex items-center gap-2 transition-all ${
                  mood === m.name 
                    ? "bg-rose-400 text-white shadow-lg scale-110" 
                    : "bg-white text-stone-600 hover:bg-rose-50 border border-stone-100"
                }`}
              >
                {m.icon}
                <span className="font-medium">{m.name}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mood}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-8 glass rounded-3xl border-rose-200 max-w-lg mx-auto"
            >
              <p className="text-2xl font-serif italic text-rose-600">
                {moods.find(m => m.name === mood)?.msg}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* NEW: Interactive Love Notes */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <FadeIn>
            <h2 className="font-display text-4xl text-center mb-16 text-stone-800">Interactive Love Notes 💌</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Hover for a secret...", secret: "You're the prettiest girl in the world! ✨" },
              { label: "Hover for a joke...", secret: "What do you call a bear with no teeth? A gummy bear! (Like you 😜)" },
              { label: "Hover for a fact...", secret: "I love you more than I love coffee. And that's a lot. ☕" },
              { label: "Hover for a promise...", secret: "I'll always share my fries with you. (Maybe) 🍟" },
              { label: "Hover for a question...", secret: "Why are you so cute? It's actually illegal. 👮‍♀️" },
              { label: "Hover for a hug...", secret: "HUG DEPLOYED! (Check your phone for a text) 🤗" },
            ].map((note, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div 
                  className="relative h-48 group cursor-help"
                  whileHover={{ rotate: [0, -2, 2, 0] }}
                >
                  <div className="absolute inset-0 bg-rose-50 rounded-3xl border-2 border-dashed border-rose-200 flex items-center justify-center p-6 text-center transition-all group-hover:opacity-0">
                    <p className="font-serif italic text-rose-400">{note.label}</p>
                  </div>
                  <div className="absolute inset-0 bg-rose-400 rounded-3xl flex items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <p className="text-white font-medium">{note.secret}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* The Pookie Investigation Section */}
      <section className="py-24 bg-stone-50 overflow-hidden">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl mb-8 text-stone-800">
              The "Pookie" Investigation 🕵️‍♂️
            </h2>
            <div className="flex justify-center gap-4 mb-12">
              <TeddyBear className="text-5xl animate-bounce" />
              <TeddyBear className="text-5xl animate-bounce delay-100" />
              <TeddyBear className="text-5xl animate-bounce delay-200" />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Who is Pookie?", desc: "Apparently, it's me. I have no choice in the matter.", icon: "🤔" },
              { title: "Pookie Level", desc: "Over 9000. Scientifically proven by your daily calls.", icon: "📈" },
              { title: "Pookie Rights", desc: "Unlimited forehead kisses and annoying jokes.", icon: "📜" }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div className="p-8 glass rounded-3xl border-rose-100 hover:scale-105 transition-transform">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-display text-xl mb-2">{item.title}</h3>
                  <p className="text-stone-600 font-serif italic">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 2️⃣ Love + Funny Message Section */}
      <section className="bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-stone-200" />
              <h2 className="font-display text-3xl md:text-4xl text-stone-800 text-center">
                From My Heart… and Slightly Crazy Brain 😅
              </h2>
              <div className="h-px flex-1 bg-stone-200" />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn delay={0.2}>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://picsum.photos/seed/love/800/1000" 
                  alt="Romantic placeholder" 
                  className="object-cover w-full h-full"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white flex items-center gap-2">
                  <TeddyBear className="text-2xl" />
                  <p className="font-serif italic text-xl">My peace & happiness</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="space-y-6 text-lg leading-relaxed text-stone-700">
                <p className="font-serif text-2xl italic text-stone-900">Aldiana,</p>
                <p>
                  I made this website to show you how much I love you — and also to prove I can be productive sometimes 😎
                </p>
                <p>
                  You’re my peace, my happiness, my favorite human, and the only one who laughs at my terrible jokes.
                </p>
                <div className="p-6 glass rounded-2xl border-rose-100 bg-rose-50/30">
                  <p className="flex items-center gap-3">
                    <span className="text-2xl">🙏</span>
                    <span>I thank Allah every day for you… and your patience with me</span>
                  </p>
                </div>
                {/* The Love Button */}
                <div className="pt-4">
                  <p className="text-sm text-stone-400 mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-400" />
                    The "I Love You" Button (Hard to catch, just like my heart was 😉):
                  </p>
                  <motion.button
                    animate={{ x: buttonPos.x, y: buttonPos.y }}
                    onMouseEnter={moveButton}
                    onClick={() => alert("YOU CAUGHT IT! I love you so much! ❤️🧸")}
                    className="px-6 py-2 bg-rose-400 text-white rounded-full text-sm shadow-lg font-bold"
                  >
                    Catch Me!
                  </motion.button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3️⃣ Islamic Du’a Section */}
      <section className="relative py-32 bg-stone-50 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none">
          <Moon className="w-[600px] h-[600px]" />
        </div>
        
        <div className="section-container text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-amber-50 text-amber-600 mb-6">
              <Star className="w-6 h-6 fill-current" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl mb-12 text-stone-800">
              A Du’a for My Favorite Human 🤲
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-8">
              <p className="text-4xl md:text-6xl font-serif leading-relaxed text-stone-900 dir-rtl" lang="ar">
                اللهم احفظها بعينك التي لا تنام،<br />
                واملأ قلبها سكينة،<br />
                وارزقها سعادة لا تنتهي 🤍
              </p>
              
              <div className="max-w-xl mx-auto pt-8 border-t border-stone-100">
                <p className="text-stone-500 font-serif italic text-xl leading-relaxed">
                  "O Allah, protect her with Your never-sleeping eye, fill her heart with peace, and give her endless happiness — because she deserves it… and also because she puts up with me 😅"
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4️⃣ Cute Personal Promise Section */}
      <section className="bg-stone-900 text-stone-100 py-24">
        <div className="section-container">
          <FadeIn>
            <div className="flex flex-col items-center mb-16">
              <Laugh className="w-10 h-10 text-rose-400 mb-4" />
              <h2 className="font-display text-4xl text-center">
                My Totally Serious Promise (Mostly 😎)
              </h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { text: "Make du’a for you every day 🙏", icon: <CheckCircle2 className="w-5 h-5" /> },
              { text: "Try to be better… at least sometimes 😜", icon: <CheckCircle2 className="w-5 h-5" /> },
              { text: "Make you laugh, even when it’s bad jokes 🤣", icon: <CheckCircle2 className="w-5 h-5" /> },
              { text: "Always be your biggest fan ❤️", icon: <CheckCircle2 className="w-5 h-5" /> },
              { text: "Accept the title of Pookie forever 🧸", icon: <Cat className="w-5 h-5" /> },
              { text: "Never run out of memes for you 📱", icon: <PartyPopper className="w-5 h-5" /> },
            ].map((promise, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl border border-stone-800 bg-stone-800/50 hover:border-rose-400/30 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-rose-400 group-hover:scale-110 transition-transform">
                      {promise.icon}
                    </div>
                    <p className="text-xl font-serif italic">{promise.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Pookie Quiz Section */}
      <section className="py-24 bg-rose-50/50">
        <div className="section-container">
          <FadeIn>
            <h2 className="font-display text-4xl text-center mb-12 text-stone-800">The Ultimate Pookie Quiz 🧠</h2>
          </FadeIn>
          
          <div className="max-w-2xl mx-auto space-y-8">
            {[
              { q: "What happens if Aldiana doesn't get her coffee?", a: "The world ends. Briefly. ☕🔥" },
              { q: "Who is the best pookie in the world?", a: "Me. (According to you, 50 times a day) 🧸" },
              { q: "What is the correct response to 'I love you'?", a: "I love you more + 1. (Infinite loop) ♾️" }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div className="p-6 bg-white rounded-3xl shadow-sm border border-rose-100 group cursor-pointer overflow-hidden relative">
                  <p className="font-bold text-stone-800 mb-2">{item.q}</p>
                  <div className="h-0 group-hover:h-12 transition-all duration-500 overflow-hidden">
                    <p className="text-rose-500 font-serif italic">{item.a}</p>
                  </div>
                  <div className="absolute top-4 right-4 text-rose-200 group-hover:text-rose-400 transition-colors">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Pookie Dictionary Section */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <FadeIn>
            <h2 className="font-display text-4xl text-center mb-16 text-stone-800">The Pookie Dictionary 📖</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-8">
            {[
              { word: "Pookie", def: "A term of endearment used 1,440 times per day. Usually refers to me being annoying but cute." },
              { word: "Hungry-iana", def: "A rare state of being where Aldiana needs food immediately or everyone dies." },
              { word: "Sleepy-iana", def: "The cutest version of Aldiana. Usually found wrapped in 5 blankets." },
              { word: "Pookie Points", def: "A currency that can be traded for forehead kisses and extra fries." }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-8 rounded-[2rem] border-2 border-rose-100 hover:bg-rose-50 transition-colors">
                  <h3 className="font-display text-2xl text-rose-500 mb-2">{item.word}</h3>
                  <p className="text-stone-600 font-serif leading-relaxed italic">{item.def}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Teddy Bear Gallery Section */}
      <section className="py-24 bg-stone-50">
        <div className="section-container">
          <FadeIn>
            <h2 className="font-display text-4xl text-center mb-4 text-stone-800">The Pookie Gallery 📸</h2>
            <p className="text-center text-stone-500 font-serif italic mb-16">A collection of things that remind me of you (mostly cute bears)</p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: "https://picsum.photos/seed/teddy1/400/400", cap: "This bear looks as soft as your heart 🧸" },
              { img: "https://picsum.photos/seed/teddy2/400/400", cap: "Me waiting for you to call me Pookie 📞" },
              { img: "https://picsum.photos/seed/teddy3/400/400", cap: "A bear who also loves snacks as much as us 🍕" },
              { img: "https://picsum.photos/seed/teddy4/400/400", cap: "This one is definitely you when you're sleepy 😴" },
              { img: "https://picsum.photos/seed/teddy5/400/400", cap: "Me protecting you from all the bad vibes 🛡️" },
              { img: "https://picsum.photos/seed/teddy6/400/400", cap: "Just a cute bear, like my favorite human 🤍" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-3xl shadow-lg bg-white p-2">
                  <img 
                    src={item.img} 
                    alt={item.cap} 
                    className="w-full aspect-square object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-4">
                    <p className="text-stone-600 font-serif italic text-center">{item.cap}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Pookie Timeline Section */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <FadeIn>
            <h2 className="font-display text-4xl text-center mb-16 text-stone-800">The Pookie Timeline ⏳</h2>
          </FadeIn>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-rose-200 before:to-transparent">
            {[
              { date: "Day 1", event: "We met and I realized I was in trouble. 😍" },
              { date: "Month 1", event: "The first time you called me 'Pookie'. I was confused but liked it. 🧸" },
              { date: "Month 6", event: "I realized I'm officially stuck with you. (Best day ever) ❤️" },
              { date: "Today", event: "I made this website because I'm a simp. 😎" }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-rose-400 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl bg-rose-50 border border-rose-100 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold text-stone-800">{item.date}</div>
                    </div>
                    <div className="text-stone-600 font-serif italic">{item.event}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Pookie Certificate Section */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-2xl mx-auto p-12 border-8 border-double border-rose-200 rounded-[40px] text-center bg-rose-50/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Award className="w-32 h-32" />
              </div>
              <h2 className="font-display text-3xl mb-4 text-stone-800">Official Certificate of Pookieness</h2>
              <div className="w-24 h-1 bg-rose-200 mx-auto mb-8" />
              <p className="font-serif italic text-xl text-stone-600 mb-8">
                This document certifies that <span className="text-rose-500 font-bold underline">Aldiana</span> is officially the most loved human in the universe.
              </p>
              <div className="flex justify-center gap-12 mb-8">
                <div>
                  <div className="font-display text-2xl text-rose-400">∞</div>
                  <div className="text-xs uppercase tracking-widest text-stone-400">Love Level</div>
                </div>
                <div>
                  <div className="font-display text-2xl text-rose-400">100%</div>
                  <div className="text-xs uppercase tracking-widest text-stone-400">Cuteness</div>
                </div>
              </div>
              <p className="text-sm text-stone-400 italic">Signed by: Your Favorite Pookie ❤️</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 5️⃣ Funny + Sweet Ending Section */}
      <section className="py-32 text-center px-6 relative">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-rose-200 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/2 right-1/4 w-64 h-64 bg-amber-100 rounded-full blur-[100px]" />
        </div>

        <FadeIn>
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="font-display text-4xl md:text-6xl leading-tight text-stone-800">
              You are my du’a that came true…
            </h2>
            <p className="text-xl md:text-2xl text-stone-500 font-serif italic">
              and also my favorite reason to scroll through memes 😂
            </p>
            
            <div className="flex flex-col items-center gap-6 mt-12">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <div className="px-10 py-4 rounded-full bg-rose-400 text-white font-medium shadow-lg shadow-rose-200 cursor-default flex items-center gap-2">
                  <TeddyBear /> I Love You, Aldiana ❤️ <TeddyBear />
                </div>
              </motion.div>
              
              <p className="text-stone-400 font-serif italic">
                P.S. You're the best, Pookie! 🧸✨
              </p>
            </div>
          </div>
        </FadeIn>

        <footer className="mt-32 text-stone-400 text-sm tracking-widest uppercase flex items-center justify-center gap-4">
          <TeddyBear /> Made with love & a few bad jokes • 2024 <TeddyBear />
        </footer>
      </section>

      {/* Pookie Mode Overlay */}
      <AnimatePresence>
        {isPookieMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-rose-400/95 flex flex-col items-center justify-center text-white p-6 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-9xl mb-8"
            >
              🧸
            </motion.div>
            <h2 className="text-6xl font-display mb-4">You've Unlocked My Whole Heart! ❤️</h2>
            <p className="text-2xl font-serif italic mb-8">You're officially the most important person in my life, Pookie. I love you more than words can say! ✨</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsPookieMode(false)}
                className="px-8 py-3 bg-white text-rose-400 rounded-full font-bold shadow-xl hover:bg-rose-50 transition-colors"
              >
                Close with a Smile 😊
              </button>
              <button 
                onClick={() => setPookieCount(0)}
                className="px-8 py-3 bg-rose-500 text-white rounded-full font-bold shadow-xl hover:bg-rose-600 transition-colors"
              >
                Reset Love Points
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
