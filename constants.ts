
import { Hospital, Doctor, Department } from './types';

export const HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: 'SVS Medical College & Hospital',
    address: 'Yenugonda, Mahbubnagar',
    departments: [Department.GENERAL, Department.CARDIOLOGY, Department.EMERGENCY, Department.ORTHOPEDICS],
    isOpen: true,
    rating: 4.5,
    image: 'https://picsum.photos/seed/svs/600/400'
  },
  {
    id: 'h2',
    name: 'District Government Hospital',
    address: 'Near Clock Tower, Mahbubnagar',
    departments: [Department.GENERAL, Department.PEDIATRICS, Department.GYNECOLOGY, Department.EMERGENCY],
    isOpen: true,
    rating: 4.2,
    image: 'https://picsum.photos/seed/ghmbnr/600/400'
  },
  {
    id: 'h3',
    name: 'Neo Health Care Hospital',
    address: 'Boyapally, Mahbubnagar',
    departments: [Department.DENTAL, Department.DERMATOLOGY, Department.NEUROLOGY],
    isOpen: true,
    rating: 4.8,
    image: 'https://picsum.photos/seed/neo/600/400'
  },
  {
    id: 'h4',
    name: 'Sushruta Multi-Speciality',
    address: 'Padmavathi Colony, Mahbubnagar',
    departments: [Department.CARDIOLOGY, Department.ENT, Department.GENERAL],
    isOpen: true,
    rating: 4.6,
    image: 'https://picsum.photos/seed/sush/600/400'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'd1',
    hospitalId: 'h1',
    name: 'Dr. Ramesh Kumar',
    specialization: Department.CARDIOLOGY,
    experience: 15,
    fee: 500,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    slots: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM'],
    image: 'https://picsum.photos/seed/dr1/200/200'
  },
  {
    id: 'd2',
    hospitalId: 'h1',
    name: 'Dr. Priya Sharma',
    specialization: Department.GENERAL,
    experience: 8,
    fee: 300,
    availableDays: ['Mon', 'Wed', 'Fri'],
    slots: ['04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'],
    image: 'https://picsum.photos/seed/dr2/200/200'
  },
  {
    id: 'd3',
    hospitalId: 'h2',
    name: 'Dr. Srinivas Rao',
    specialization: Department.PEDIATRICS,
    experience: 12,
    fee: 250,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    slots: ['10:00 AM', '11:00 AM', '12:00 PM'],
    image: 'https://picsum.photos/seed/dr3/200/200'
  }
];
