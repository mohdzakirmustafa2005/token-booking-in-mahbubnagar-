
import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { HOSPITALS } from '../constants';
import { Search, Filter, MapPin, Star, ChevronRight, Stethoscope } from 'lucide-react';
import { Department } from '../types';

export const Hospitals: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialDept = searchParams.get('dept') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedDept, setSelectedDept] = useState(initialDept);

  const filteredHospitals = useMemo(() => {
    return HOSPITALS.filter(h => {
      const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           h.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = selectedDept ? h.departments.includes(selectedDept as Department) : true;
      return matchesSearch && matchesDept;
    });
  }, [searchTerm, selectedDept]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Hospitals in Mahbubnagar</h1>
        <p className="text-slate-500">Discover top-rated healthcare facilities near you</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold mb-4 flex items-center">
              <Filter className="w-4 h-4 mr-2" /> Filters
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-3 uppercase tracking-wider">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-3 uppercase tracking-wider">Department</label>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  <button
                    onClick={() => setSelectedDept('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedDept === '' ? 'bg-blue-600 text-white font-medium' : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    All Departments
                  </button>
                  {Object.values(Department).map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setSelectedDept(dept)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedDept === dept ? 'bg-blue-600 text-white font-medium' : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* List */}
        <div className="flex-1 space-y-6">
          {filteredHospitals.length === 0 ? (
            <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-slate-200">
              <Stethoscope className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800">No Hospitals Found</h3>
              <p className="text-slate-500">Try adjusting your search or filters to see more results.</p>
            </div>
          ) : (
            filteredHospitals.map((hospital) => (
              <div key={hospital.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row hover:shadow-xl transition-all">
                <div className="md:w-72 h-48 md:h-auto overflow-hidden">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 p-6 md:p-8 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          hospital.isOpen ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {hospital.isOpen ? 'Open Now' : 'Closed'}
                        </span>
                        <div className="flex items-center text-amber-500 text-sm font-bold">
                          <Star className="w-4 h-4 fill-amber-500 mr-1" />
                          {hospital.rating}
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">{hospital.name}</h2>
                      <div className="flex items-center text-slate-500 text-sm">
                        <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                        {hospital.address}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {hospital.departments.map((dept) => (
                      <span key={dept} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-xs font-medium border border-slate-100">
                        {dept}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex justify-between items-center pt-6 border-t border-slate-50">
                    <span className="text-sm font-medium text-slate-400">Next Available: Today 04:00 PM</span>
                    <Link
                      to={`/hospital/${hospital.id}`}
                      className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center shadow-lg shadow-blue-100"
                    >
                      View Doctors <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
