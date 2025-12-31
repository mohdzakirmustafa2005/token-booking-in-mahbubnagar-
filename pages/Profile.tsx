
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Settings, 
  LogOut, 
  CheckCircle, 
  AlertCircle, 
  Save, 
  Activity, 
  Pill, 
  ShieldAlert, 
  Droplet, 
  Zap, 
  Phone 
} from 'lucide-react';

interface HealthData {
  bloodType: string;
  allergies: string;
  medications: string;
  emergencyContact: string;
}

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'health'>('appointments');
  const [healthData, setHealthData] = useState<HealthData>({
    bloodType: '',
    allergies: '',
    medications: '',
    emergencyContact: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  // Load health data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('mbnr_health_profile');
    if (savedData) {
      try {
        setHealthData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse health data", e);
      }
    }
  }, []);

  const handleSaveHealthProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    localStorage.setItem('mbnr_health_profile', JSON.stringify(healthData));
    setTimeout(() => {
      setIsSaving(false);
      alert("Health profile updated successfully!");
    }, 600);
  };

  const bookings = [
    {
      id: 'B1',
      doctor: 'Dr. Ramesh Kumar',
      hospital: 'SVS Medical College',
      date: '2024-03-25',
      time: '10:30 AM',
      token: '42',
      status: 'confirmed'
    },
    {
      id: 'B2',
      doctor: 'Dr. Priya Sharma',
      hospital: 'Neo Health Care',
      date: '2024-03-20',
      time: '04:00 PM',
      token: '12',
      status: 'completed'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 text-center border border-slate-100 shadow-sm">
            <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-xl">
              <User className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Sai Teja</h2>
            <p className="text-slate-500 text-sm mb-6">saiteja@example.com</p>
            <div className="flex justify-center space-x-2">
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Active Member</span>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm">
            <nav className="p-4 space-y-1">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`w-full flex items-center space-x-3 p-4 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'appointments' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span>My Appointments</span>
              </button>
              <button
                onClick={() => setActiveTab('health')}
                className={`w-full flex items-center space-x-3 p-4 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'health' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Activity className="w-5 h-5" />
                <span>Health Profile</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-4 rounded-xl text-slate-600 hover:bg-slate-50 text-sm font-bold transition-all">
                <Settings className="w-5 h-5" />
                <span>Account Settings</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-4 rounded-xl text-red-500 hover:bg-red-50 text-sm font-bold transition-all">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
          {activeTab === 'appointments' ? (
            <>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">My Bookings</h1>
                <p className="text-slate-500">Manage and view your upcoming hospital visits</p>
              </div>

              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center justify-center min-w-[80px]">
                          <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Token</span>
                          <span className="text-2xl font-black text-blue-600">#{booking.token}</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-xl font-bold text-slate-900">{booking.doctor}</h3>
                            <span className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {booking.status === 'confirmed' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                              {booking.status}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-slate-500 sm:space-x-4">
                            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-blue-500" /> {booking.hospital}</span>
                            <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-slate-400" /> {booking.date}</span>
                            <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-slate-400" /> {booking.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="flex-1 md:flex-none px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
                          View QR
                        </button>
                        {booking.status === 'confirmed' && (
                          <button className="flex-1 md:flex-none px-6 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Health Profile</h1>
                <p className="text-slate-500">Provide medical details to help doctors understand your health better</p>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm">
                <form onSubmit={handleSaveHealthProfile} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Blood Type */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700">Blood Type</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 group-focus-within:scale-110 transition-transform">
                          <Droplet className="w-5 h-5 fill-red-100" />
                        </div>
                        <select
                          value={healthData.bloodType}
                          onChange={(e) => setHealthData({ ...healthData, bloodType: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-red-400 focus:bg-white outline-none transition-all appearance-none"
                        >
                          <option value="">Select Blood Type</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                           <Clock className="w-4 h-4 rotate-90" /> {/* Just a chevron substitute icon */}
                        </div>
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700">Emergency Contact</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 group-focus-within:scale-110 transition-transform">
                          <Phone className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          placeholder="Name & Phone Number"
                          value={healthData.emergencyContact}
                          onChange={(e) => setHealthData({ ...healthData, emergencyContact: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:bg-white outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Allergies */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">Allergies</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-6 text-amber-500 group-focus-within:scale-110 transition-transform">
                        <Zap className="w-5 h-5 fill-amber-100" />
                      </div>
                      <textarea
                        placeholder="List any drug or food allergies (e.g., Peanuts, Penicillin)"
                        rows={3}
                        value={healthData.allergies}
                        onChange={(e) => setHealthData({ ...healthData, allergies: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-amber-400 focus:bg-white outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Medications */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">Current Medications</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-6 text-indigo-500 group-focus-within:scale-110 transition-transform">
                        <Pill className="w-5 h-5" />
                      </div>
                      <textarea
                        placeholder="List medications you are currently taking"
                        rows={3}
                        value={healthData.medications}
                        onChange={(e) => setHealthData({ ...healthData, medications: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:bg-white outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center disabled:opacity-70"
                    >
                      {isSaving ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      ) : (
                        <Save className="w-5 h-5 mr-2" />
                      )}
                      Save Health Profile
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-slate-50 rounded-3xl p-6 border border-blue-50 flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <ShieldAlert className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Privacy Notice</h4>
                  <p className="text-sm text-slate-500">
                    Your medical information is stored securely on your device. Only authorized medical practitioners will be able to see this data when you present your token QR code.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
