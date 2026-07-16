import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll Reveal Hook
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
// State untuk melacak status pengiriman form
  const [formStatus, setFormStatus] = useState("");

  // Fungsi untuk mengirim form tanpa pindah halaman
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setFormStatus("Mengirim pesan...");
    
    const formData = new FormData(event.target);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormStatus(" Pesan berhasil terkirim! Terima kasih.");
        event.target.reset(); // Mengosongkan isian form setelah sukses
      } else {
        setFormStatus(" Gagal mengirim pesan. Silakan coba lagi.");
      }
    } catch (error) {
      setFormStatus(" Terjadi kesalahan jaringan saat mengirim.");
    }
  };
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-700 selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full bg-slate-50/90 backdrop-blur-md z-50 border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center relative">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-slate-900">
              Z
            </div>
            <span className="font-bold tracking-wider text-slate-900 uppercase text-sm">Zacky.Dev</span>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            {['Beranda', 'Keahlian', 'Pendidikan', 'Proyek', 'Pengalaman', 'Kontak'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-emerald-600 transition-colors py-1">
                {item}
              </a>
            ))}
          </div>

          <button 
            className="md:hidden text-slate-700 hover:text-emerald-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>

          <div className={`absolute top-full left-0 w-full bg-slate-50/95 border-b border-slate-200/50 flex flex-col py-4 px-6 gap-4 backdrop-blur-md md:hidden transition-all duration-300 origin-top ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
            {['Beranda', 'Keahlian', 'Pendidikan', 'Proyek', 'Pengalaman', 'Kontak'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)} 
                className="text-slate-700 hover:text-emerald-600 font-medium py-2 border-b border-slate-200/50"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="beranda" className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-12 min-h-[90vh]">
        
        <div className="md:w-3/5 text-center md:text-left reveal from-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Zackyannafi Nashru Romadhoni
          </h1>
          <h2 className="text-xl md:text-2xl font-mono text-emerald-600 mb-4 h-8">
           <span className="gradient-text">Frontend & Database Developer</span><span className="cursor-blink">_</span>
          </h2>
          
          <div className="inline-flex items-center gap-2 bg-[#d1e7dd] text-[#0f5132] px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-6 float">
            ⭐ IPK 3.78/4.0 (Semester 1-5)
          </div>
          
          <p className="text-slate-600 leading-relaxed mb-8 text-base md:text-lg text-justify md:text-left">
            Frontend Developer & Database Specialist yang antusias merancang antarmuka pengguna yang interaktif dan arsitektur data yang tangguh. Memiliki keahlian kuat dalam membangun Single Page Applications (SPA) dengan React.js serta merancang sistem basis data relasional (MySQL) yang efisien. Berkomitmen menghadirkan pengalaman digital (UI/UX) yang memukau sekaligus memastikan keandalan performa pengelolaan data berskala besar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 font-mono text-sm justify-center md:justify-start">
            <a href="#proyek" className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] text-center hover:scale-105 transform">
              &gt; Lihat_Proyek
            </a>
            <a href="/CV_Zackyannafi Nashru R.pdf" target="_blank" rel="noopener noreferrer" download="CV_Zackyannafi Nashru R.pdf" className="bg-transparent border border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-medium hover:border-emerald-500 hover:text-emerald-600 transition-all text-center hover:scale-105 transform flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              Download_CV
            </a>
          </div>
        </div>

        <div className="md:w-2/5 flex justify-center mt-10 md:mt-0 reveal from-right">
          <div className="relative w-56 h-72 md:w-64 md:h-80 group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl transform translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 opacity-50 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 glow-pulse"></div>
            <div className="absolute inset-0 bg-slate-100 rounded-2xl border border-slate-300 overflow-hidden z-10">
              <img 
                src="/file_00000000cd5872088e8e310434ad7ed9.png" 
                alt="Zacky" 
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://ui-avatars.com/api/?name=Zacky&background=10b981&color=f8fafc&size=512";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="keahlian" className="py-16 md:py-24 px-6 bg-white border-y border-slate-200/50">
        <div className="max-w-6xl mx-auto reveal">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 md:mb-12 flex items-center gap-4">
            <span className="text-emerald-500 font-mono text-lg md:text-xl">01.</span> Tech Stack
            <div className="h-px bg-slate-100 flex-grow ml-2 md:ml-4"></div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8 hover:border-emerald-500/50 transition-colors group">
              <div className="text-emerald-600 mb-6 font-mono text-base md:text-lg group-hover:-translate-y-1 transition-transform flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                ./frontend_development
              </div>
              <div className="flex flex-wrap gap-3">
                {['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3 / Tailwind', 'UI/UX Design', 'Responsive Web'].map(skill => (
                  <span key={skill} className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-500/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8 hover:border-cyan-500/50 transition-colors group">
              <div className="text-cyan-600 mb-6 font-mono text-base md:text-lg group-hover:-translate-y-1 transition-transform flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
                ./database_&_backend
              </div>
              <div className="flex flex-wrap gap-3">
                {['MySQL', 'Firebase', 'Relational DB Design', 'Java', 'Python', 'RESTful API', 'Data Architecture'].map(skill => (
                  <span key={skill} className="bg-cyan-50 text-cyan-700 border border-cyan-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-cyan-500/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PENDIDIKAN SECTION --- */}
      <section id="pendidikan" className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto reveal">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 md:mb-12 flex items-center gap-4">
            <span className="text-emerald-500 font-mono text-lg md:text-xl">02.</span> Pendidikan
            <div className="h-px bg-slate-100 flex-grow ml-2 md:ml-4"></div>
          </h2>
          
          <div className="bg-white border border-slate-300 rounded-2xl p-6 md:p-10 shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Universitas Duta Bangsa Surakarta</h3>
                <p className="text-emerald-600 font-medium">S1 - Teknik Informatika</p>
              </div>
              <div className="mt-4 md:mt-0 font-mono text-slate-600 bg-slate-100/50 px-4 py-2 rounded-lg inline-block border border-slate-300">
                2023 — Sekarang
              </div>
            </div>
            
            <p className="text-slate-600 leading-relaxed mb-6">
              Saat ini menempuh pendidikan sarjana di program studi Teknik Informatika dengan fokus pada pengembangan perangkat lunak, sistem basis data, dan kecerdasan buatan. Aktif mengikuti berbagai proyek praktikum untuk mengasah keterampilan coding.
            </p>
            
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-xl w-fit">
              <span className="text-2xl">🎓</span>
              <div>
                <div className="text-xs text-emerald-600 font-mono">Prestasi Akademik</div>
                <div className="text-slate-900 font-bold">IPK Kumulatif: 3.78 / 4.00</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROYEK SECTION --- */}
      <section id="proyek" className="py-16 md:py-24 px-6 bg-white border-y border-slate-200/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 md:mb-12 flex items-center gap-4 reveal">
            <span className="text-emerald-500 font-mono text-lg md:text-xl">03.</span> Build & Deploy
            <div className="h-px bg-slate-100 flex-grow ml-2 md:ml-4"></div>
          </h2>

          <div className="space-y-16 md:space-y-24">


                      {/* Proyek 1 - Sastrow Coffe */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center reveal from-left">
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute inset-0 bg-amber-100/20 group-hover:bg-transparent transition-colors duration-300 rounded-xl z-10 pointer-events-none"></div>
                <img 
                  src="/Projectkopi.png" 
                  alt="Screenshot ProjectKopi" 
                  className="rounded-xl h-48 md:h-72 w-full object-cover border border-slate-300 shadow-lg group-hover:scale-[1.02] transition-transform duration-300"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/600x400/0f172a/a855f7?text=Snake+Eye" }}
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                  <div className="text-purple-600 font-mono text-xs md:text-sm">Featured Project</div>
                  <span className="bg-purple-50 text-purple-700 text-[10px] px-2 py-1 rounded-full border border-purple-200">Web Kopi</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 hover:text-purple-600 transition-colors cursor-pointer">Sastrow Coffee (Web Freelance)</h3>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-slate-600 text-sm leading-relaxed mb-4 shadow-xl relative z-20 text-justify md:text-left">
                  Aplikasi web e-commerce interaktif yang dirancang khusus untuk kedai kopi lokal Sastrow Coffee di Baturetno, Wonogiri. Dilengkapi dengan fitur pencarian produk, kategorisasi menu, dan sistem keranjang belanja (cart) dinamis yang memudahkan pelanggan dalam melakukan pemesanan serta menghitung subtotal secara otomatis.
                </div>
                <div className="flex flex-wrap gap-4 font-mono text-xs text-slate-700 justify-center md:justify-start mb-6">
                  <span>HTML5</span>
                  <span>CSS3</span>
                  <span>JavaScript</span>
                  <span>Vercel</span>
                </div>
                <div className="flex gap-4 justify-center md:justify-start">
                  <a href="https://github.com/Zackynashru/Sastrow-Coffee.git" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-2" title="Source Code">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
  
            {/* Proyek 2 - KalahanNews */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center reveal from-left">
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute inset-0 bg-emerald-500/20 group-hover:bg-transparent transition-colors duration-300 rounded-xl z-10 pointer-events-none"></div>
                <img 
                  src="/WhatsApp Image 2026-05-05 at 00.25.17.jpg" 
                  alt="Screenshot Proyek KalahanNews" 
                  className="rounded-xl h-48 md:h-72 w-full object-cover border border-slate-300 shadow-lg group-hover:scale-[1.02] transition-transform duration-300"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/600x400/0f172a/10b981?text=KalahanNews" }}
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                  <div className="text-emerald-600 font-mono text-xs md:text-sm">Featured Project</div>
                  <span className="bg-blue-50 text-blue-700 text-[10px] px-2 py-1 rounded-full border border-blue-200">Frontend</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 hover:text-emerald-600 transition-colors cursor-pointer">Portal Berita KalahanNews</h3>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-slate-600 text-sm leading-relaxed mb-4 shadow-xl relative z-20 text-justify md:text-left">
                  Website portal berita bergaya profesional dengan antarmuka yang sangat responsif. Dibangun khusus dengan React untuk memamerkan keahlian Frontend Development, menyajikan pengalaman membaca yang mulus, serta menggunakan Firebase sebagai backend sederhana untuk manajemen konten artikel.
                </div>
                <div className="flex flex-wrap gap-4 font-mono text-xs text-slate-700 justify-center md:justify-start mb-6">
                  <span>React</span>
                  <span>TailwindCSS</span>
                  <span>Firebase</span>
                  <span>Vercel</span>
                </div>
                <div className="flex gap-4 justify-center md:justify-start">
                  <a href="https://github.com/Zackynashru/kalahannews-app.git" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-2" title="Source Code">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Proyek 3 - Classic Snake Game */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center reveal from-left">
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute inset-0 bg-purple-500/20 group-hover:bg-transparent transition-colors duration-300 rounded-xl z-10 pointer-events-none"></div>
                <img 
                  src="/WhatsApp Image 2026-06-20 at 21.27.48.jpeg" 
                  alt="Screenshot Proyek Snake Eye" 
                  className="rounded-xl h-48 md:h-72 w-full object-cover border border-slate-300 shadow-lg group-hover:scale-[1.02] transition-transform duration-300"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/600x400/0f172a/a855f7?text=Snake+Eye" }}
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                  <div className="text-purple-600 font-mono text-xs md:text-sm">Featured Project</div>
                  <span className="bg-purple-50 text-purple-700 text-[10px] px-2 py-1 rounded-full border border-purple-200">Web Game</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 hover:text-purple-600 transition-colors cursor-pointer">Classic Snake Game (Snake Eye)</h3>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-slate-600 text-sm leading-relaxed mb-4 shadow-xl relative z-20 text-justify md:text-left">
                  Adaptasi modern dari permainan klasik 'Snake' yang dibangun menggunakan kerangka kerja (framework) Flask. Menggabungkan kontrol keyboard yang responsif dengan sistem penyimpanan skor tertinggi (high score) secara real-time.
                </div>
                <div className="flex flex-wrap gap-4 font-mono text-xs text-slate-700 justify-center md:justify-start mb-6">
                  <span>Python</span>
                  <span>Flask</span>
                  <span>Firebase</span>
                  <span>HTML/CSS/JS</span>
                </div>
                <div className="flex gap-4 justify-center md:justify-start">
                  <a href="https://github.com/awanitucloud/uas_python.git" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-2" title="Source Code">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Proyek 4 - ResepKu */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center reveal from-left">
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute inset-0 bg-purple-500/20 group-hover:bg-transparent transition-colors duration-300 rounded-xl z-10 pointer-events-none"></div>
                <img 
                  src="/Screenshot 2026-07-12 200141.jpg" 
                  alt="Screenshot ResepKu" 
                  className="rounded-xl h-48 md:h-72 w-full object-cover border border-slate-300 shadow-lg group-hover:scale-[1.02] transition-transform duration-300"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/600x400/0f172a/a855f7?text=Nexus-AI" }}
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                  <div className="text-purple-600 font-mono text-xs md:text-sm">Featured Project</div>
                  <span className="bg-purple-50 text-purple-700 text-[10px] px-2 py-1 rounded-full border border-purple-200">AI App</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 hover:text-purple-600 transition-colors cursor-pointer">ResepKu: Smart AI Culinary Assistant</h3>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-slate-600 text-sm leading-relaxed mb-4 shadow-xl relative z-20 text-justify md:text-left">
Asisten koki virtual AI terintegrasi model Llama-3 (Groq API) dan Node.js. Dilengkapi Prompt Engineering khusus (Domain Guardrails) untuk menjaga akurasi konteks dapur, antarmuka estetik yang menenangkan, fitur kalkulasi porsi dinamis, serta sistem simpan riwayat resep via Local Storage.
                </div>
                <div className="flex flex-wrap gap-4 font-mono text-xs text-slate-700 justify-center md:justify-start mb-6">
                  <span>HTML/CSS/JS</span>
                  <span>Node.js</span>
                  <span>Express.js</span>
                  <span>Groq API</span>
                  <span>Prompt Engineering</span>
                  <span>Local Storage</span>
                  <span>Vercel</span>
                </div>
                <div className="flex gap-4 justify-center md:justify-start">
                  <a href="https://github.com/Zackynashru/nexus-AI" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-2" title="Source Code">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                    GitHub
                  </a>
                  <a href="https://nexus-ai-git-main-zackynashrus-projects.vercel.app" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-cyan-600 transition-colors flex items-center gap-2" title="Live Demo">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* --- PENGALAMAN SECTION --- */}
      <section id="pengalaman" className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto reveal">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center justify-center gap-4">
              <span className="text-emerald-500 font-mono text-xl">04.</span> Pengalaman
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative border-l-2 border-slate-300 ml-4 md:ml-auto">
            
            {/* Card Pengalaman 1 */}
            <div className="mb-12 relative pl-8 md:pl-12">
              <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-slate-50 border-2 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
              
              <div className="bg-white border border-slate-300 rounded-2xl p-6 md:p-8 shadow-lg hover:border-emerald-500/30 transition-colors">
                <span className="text-emerald-600 font-mono text-xs md:text-sm font-bold mb-2 block">2024 - Sekarang</span>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Freelance Web Developer & DB Designer</h3>
                <p className="text-slate-600 text-sm mb-6">Proyek Mandiri / Lokal</p>
                
                <ul className="text-slate-600 text-sm md:text-base space-y-4 list-disc pl-5 marker:text-emerald-500 text-justify md:text-left leading-relaxed">
                  <li><strong className="text-slate-800">Frontend UI/UX:</strong> Merancang dan membangun antarmuka web yang responsif dengan React.js untuk berbagai kebutuhan klien lokal.</li>
                  <li><strong className="text-slate-800">Arsitektur Database:</strong> Mengembangkan arsitektur database MySQL untuk aplikasi inventaris UMKM guna memastikan integritas data.</li>
                  <li><strong className="text-slate-800">Optimasi Kueri:</strong> Melakukan optimasi kueri database (SQL indexing & join optimization) untuk mempercepat waktu pemuatan (load) data hingga 30%.</li>
                </ul>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* --- KONTAK SECTION --- */}
      <section id="kontak" className="py-16 md:py-24 px-6 bg-white border-y border-slate-200/50">
        <div className="max-w-3xl mx-auto text-center reveal">
          <div className="text-emerald-500 font-mono text-sm mb-2">05. What's Next?</div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Mari Terhubung</h2>
          
          <p className="text-slate-600 text-base md:text-lg mb-10 max-w-xl mx-auto">
            Saya selalu terbuka untuk peluang kolaborasi baru, pengembangan web (Frontend), atau diskusi terkait Database System. Jangan ragu untuk menyapa!
          </p>
<form onSubmit={handleFormSubmit} className="max-w-md mx-auto mb-12 text-left bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xl relative">
            <input type="hidden" name="access_key" value="e090cdcb-34a5-41b8-a3b6-92e2b4a266c9" />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

            <div className="mb-4">
              <label className="block text-slate-600 text-sm font-medium mb-2" htmlFor="email">Email Anda</label>
              <input type="email" id="email" name="email" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="email@perusahaan.com" required />
            </div>

            <div className="mb-4">
              <label className="block text-slate-600 text-sm font-medium mb-2" htmlFor="subject">Subjek</label>
              <input type="text" id="subject" name="subject" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Peluang Kolaborasi..." required />
            </div>
            
            <div className="mb-6">
              <label className="block text-slate-600 text-sm font-medium mb-2" htmlFor="message">Pesan</label>
              <textarea id="message" name="message" rows="4" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Halo Zacky, saya tertarik untuk..." required></textarea>
            </div>
            
            <button type="submit" className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              Kirim Pesan
            </button>

            {/* Pesan Sukses / Error Muncul di Sini */}
            {formStatus && (
              <div className="mt-4 p-3 bg-white border border-slate-300 rounded-lg text-center font-medium text-emerald-600 text-sm">
                {formStatus}
              </div>
            )}
          </form>

          <div className="flex justify-center gap-4 md:gap-6 flex-wrap">
            <a href="https://wa.me/6285760354467" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#25D366] text-white rounded-2xl flex items-center justify-center hover:-translate-y-2 transition-all shadow-lg" title="WhatsApp">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/zackyannafi-n-b7534928b" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#0a66c2] text-white rounded-2xl flex items-center justify-center hover:-translate-y-2 transition-all shadow-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://github.com/Zackynashru" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-100 border border-slate-300 text-white rounded-2xl flex items-center justify-center hover:-translate-y-2 transition-all shadow-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-slate-50 border-t border-slate-200/50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
        <div className="text-slate-500 font-mono text-[11px] md:text-xs">
          <p className="mb-2">Desain & Pengembangan oleh Zackyannafi Nashru R.</p>
          <p className="flex items-center justify-center gap-1">
            Dibangun dengan <span className="text-emerald-500">React</span> & <span className="text-cyan-500">Tailwind</span>
          </p>
          <p className="mt-4">&copy; {new Date().getFullYear()} — Semua Hak Cipta Dilindungi</p>
        </div>
      </footer>
    </div>
  );
}