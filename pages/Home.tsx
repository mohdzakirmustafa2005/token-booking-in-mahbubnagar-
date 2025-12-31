
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Users, Calendar, ArrowRight, ShieldCheck, Heart, Clock } from 'lucide-react';
import { Department } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Hospitals', value: '45+', icon: ShieldCheck },
    { label: 'Specialists', value: '250+', icon: Users },
    { label: 'Bookings Today', value: '1,200+', icon: Calendar },
    { label: 'Average Wait', value: '15m', icon: Clock },
  ];

  const categories = Object.values(Department).slice(0, 8);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/hospitals?search=${searchTerm}`);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-16 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-6 border border-blue-100">
              Medical Token Booking in Mahbubnagar
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              Book Your Hospital <span className="text-blue-600">Token</span> Online
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Skip the long queues at hospitals in Mahbubnagar. Browse top doctors, check real-time availability, and book your token in seconds.
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-xl border border-slate-100 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center px-4 space-x-2 border-r border-slate-100">
                <Search className="text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Doctor, Hospital or Specialty..."
                  className="w-full py-3 outline-none text-slate-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center px-4 space-x-2 hidden sm:flex">
                <MapPin className="text-slate-400 w-5 h-5" />
                <span className="text-slate-700 font-medium">Mahbubnagar</span>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all whitespace-nowrap">
                Search Now
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto mt-20">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
                <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-xl mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Popular Departments</h2>
            <p className="text-slate-500">Find the right specialist for your health needs</p>
          </div>
          <Link to="/hospitals" className="text-blue-600 font-semibold flex items-center hover:underline group">
            See All <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/hospitals?dept=${cat}`}
              className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center hover:border-blue-400 hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-50 transition-colors">
                <Heart className="w-8 h-8 text-slate-400 group-hover:text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-800">{cat}</h3>
              <p className="text-xs text-slate-400 mt-2">15+ Doctors</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-blue-600 rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden text-center text-white">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Are you a Doctor in Mahbubnagar?</h2>
            <p className="text-blue-100 text-lg mb-10">
              Join our network of healthcare professionals and manage your patients effectively with our smart token system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold shadow-lg hover:bg-slate-50 transition-all">
                Register Hospital
              </button>
              <button className="bg-blue-500 text-white border border-blue-400 px-10 py-4 rounded-2xl font-bold hover:bg-blue-400 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
