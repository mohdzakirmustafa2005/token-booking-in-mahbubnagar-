
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { HOSPITALS, DOCTORS } from '../constants';
import { Star, MapPin, Clock, Calendar, ShieldCheck, ChevronLeft, ArrowRight } from 'lucide-react';

export const HospitalDetail: React.FC = () => {
  const { id } = useParams();
  const hospital = HOSPITALS.find(h => h.id === id);
  const doctors = DOCTORS.filter(d => d.hospitalId === id);

  if (!hospital) return <div className="p-20 text-center">Hospital not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/hospitals" className="inline-flex items-center text-blue-600 font-semibold mb-8 hover:underline">
        <ChevronLeft className="w-5 h-5 mr-1" /> Back to Hospitals
      </Link>

      {/* Hospital Banner */}
      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 mb-12">
        <div className="h-64 md:h-96 relative">
          <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Mahbubnagar Hub</span>
              <div className="flex items-center text-amber-400 bg-black/30 backdrop-blur px-3 py-1 rounded-full text-sm font-bold">
                <Star className="w-4 h-4 fill-amber-400 mr-1" />
                {hospital.rating} Rating
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2">{hospital.name}</h1>
            <div className="flex items-center opacity-90">
              <MapPin className="w-5 h-5 mr-2 text-blue-400" />
              {hospital.address}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100 bg-white border-t border-slate-100">
          {[
            { label: 'Available Doctors', value: doctors.length, icon: ShieldCheck },
            { label: 'OPD Hours', value: '09:00 - 21:00', icon: Clock },
            { label: 'Emergency', value: '24/7 Service', icon: Calendar },
            { label: 'Est. Wait Time', value: '20 Mins', icon: Clock },
          ].map((item, i) => (
            <div key={i} className="p-6 text-center">
              <div className="flex items-center justify-center text-blue-600 mb-2">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="text-lg font-bold text-slate-900">{item.value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Medical Specialists</h2>
        <p className="text-slate-500">Book a token with our experienced practitioners</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="group bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="flex items-start space-x-4 mb-6">
              <div className="relative">
                <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-2xl object-cover" />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-lg">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
                <p className="text-blue-600 font-medium text-sm mb-1">{doctor.specialization}</p>
                <p className="text-slate-400 text-xs">{doctor.experience} Years Experience</p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Consultation Fee</span>
                <span className="font-bold text-slate-900">₹{doctor.fee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Availability</span>
                <span className="font-medium text-green-600">Mon - Sat</span>
              </div>
            </div>

            <Link
              to={`/book/${doctor.id}`}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center group-hover:bg-blue-600 transition-colors"
            >
              Book Token <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
