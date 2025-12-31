
export enum Department {
  GENERAL = 'General Physician',
  CARDIOLOGY = 'Cardiology',
  ORTHOPEDICS = 'Orthopedics',
  PEDIATRICS = 'Pediatrics',
  GYNECOLOGY = 'Gynecology',
  DERMATOLOGY = 'Dermatology',
  NEUROLOGY = 'Neurology',
  ENT = 'ENT',
  DENTAL = 'Dental',
  EMERGENCY = 'Emergency'
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  departments: Department[];
  isOpen: boolean;
  rating: number;
  image: string;
}

export interface Doctor {
  id: string;
  hospitalId: string;
  name: string;
  specialization: Department;
  experience: number;
  fee: number;
  availableDays: string[];
  slots: string[];
  image: string;
}

export interface Booking {
  id: string;
  tokenNumber: number;
  doctorId: string;
  doctorName: string;
  hospitalName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  waitingTime: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'admin' | 'super-admin';
}
