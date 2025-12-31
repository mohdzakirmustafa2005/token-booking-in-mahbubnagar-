
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DOCTORS, HOSPITALS } from '../constants';
import { Calendar, Clock, CreditCard, ChevronLeft, CheckCircle2, Info } from 'lucide-react';

export const Booking: React.FC = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const doctor = DOCTORS.find(d => d.id === doctorId);
  const hospital = HOSPITALS.find(h => h.id === doctor?.hospitalId);

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      full: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    };
  });

  const handleBooking = () => {
    if (!selectedSlot) return;
    setIsSuccess(true);
    // In real app, save to DB here
  };

  if (!doctor || !hospital) return <div className="p-20 text-center">Data not found</div>;

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-in zoom-in duration-500">
        <div className="bg-white rounded-[2.5rem] p-12 shadow-2xl border border-blue-50">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Token Confirmed!</h1>
          <p className="text-slate-500 mb-8">Your appointment is scheduled and token generated.</p>
          
          <div className="bg-slate-50 rounded-3xl p-8 mb-10 text-left border border-slate-100">
            <div className="flex justify-between mb-4 pb-4 border-b border-slate-200">
              <span className="text-slate-500 text-sm uppercase font-bold tracking-widest">Token Number</span>
              <span className="text-2xl font-black text-blue-600">#42</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Doctor</span>
                <span className="font-bold text-slate-800">{doctor.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Hospital</span>
                <span className="font-bold text-slate-800">{hospital.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Scheduled Time</span>
                <span className="font-bold text-slate-800">{selectedSlot} • {selectedDate}</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-slate-200">
                <span className="text-slate-500">Estimated Wait Time</span>
                <span className="font-bold text-blue-600">~15 Minutes</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/profile')}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
          >
            Go to My Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side: Summary */}
        <div className="lg:w-1/3 space-y-6">
          <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 font-semibold hover:text-blue-600 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" /> Back
          </button>
          
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
            <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-2xl object-cover mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-1">{doctor.name}</h1>
            <p className="text-blue-600 font-semibold mb-4">{doctor.specialization}</p>
            <div className="pt-4 border-t border-slate-100 flex items-center text-slate-500 text-sm">
              <Calendar className="w-4 h-4 mr-2" /> {hospital.name}
            </div>
          </div>

          <div className="bg-blue-50 rounded-[2rem] p-6 border border-blue-100">
            <div className="flex items-start space-x-3 text-blue-800">
              <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium">Please arrive at least 15 minutes before your scheduled time slot for token verification.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Selection */}
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-blue-600" /> Select Date
            </h2>
            <div className="flex space-x-3 overflow-x-auto pb-4 -mx-1 px-1">
              {dates.map((d) => (
                <button
                  key={d.full}
                  onClick={() => setSelectedDate(d.full)}
                  className={`flex-shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center transition-all border-2 ${
                    selectedDate === d.full
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                      : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold tracking-tighter mb-1">{d.month}</span>
                  <span className="text-xl font-black mb-1">{d.date}</span>
                  <span className="text-xs opacity-80">{d.day}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-3 text-blue-600" /> Available Slots
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {doctor.slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-4 rounded-xl font-bold text-sm transition-all border-2 ${
                    selectedSlot === slot
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                      : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-slate-500 text-sm">Total Payable</span>
                <div className="text-3xl font-black text-slate-900">₹{doctor.fee}</div>
              </div>
              <div className="flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-xl text-slate-500 text-xs font-bold">
                <CreditCard className="w-4 h-4" />
                <span>Pay at Hospital</span>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={!selectedSlot}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-slate-900 transition-all flex items-center justify-center"
            >
              Confirm Booking & Generate Token
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
