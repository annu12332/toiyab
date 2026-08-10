import React, { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Experience from '../components/home/Experience';
import Gallery from '../components/home/Gallery';
import Films from '../components/home/Films';
import Packages from '../components/home/Packages';
import Testimonials from '../components/home/Testimonials';
import Inquire from '../components/home/Inquire';

const Home = () => {
  const [settings, setSettings] = useState(null);
  const [selectedPackageName, setSelectedPackageName] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/portfolio/settings');
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (error) {
        console.log('Using default settings');
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="bg-brand-black min-h-screen">
      <Hero settings={settings} />
      <About settings={settings} />
      <Experience />
      <Gallery />
      <Films />
      <Packages onSelectPackage={(name) => setSelectedPackageName(name)} />
      <Testimonials />
      <Inquire selectedPackageName={selectedPackageName} />
    </div>
  );
};

export default Home;
