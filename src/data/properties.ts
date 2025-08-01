import type { Property } from '../types';

export const properties: Property[] = [
  {
    id: "p1",
    name: "Marina Heights",
    address: "Dubai Marina, Dubai",
    ownerId: "o1",
    units: 10,
    occupiedUnits: 8,
    tenants: ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"],
    createdDate: "2022-12-05"
  },
  {
    id: "p2",
    name: "Al Reem Residency",
    address: "Al Reem Island, Abu Dhabi",
    ownerId: "o1",
    units: 5,
    occupiedUnits: 3,
    tenants: ["t9", "t10", "t11"],
    createdDate: "2023-01-15"
  },
  {
    id: "p3",
    name: "Sharjah City Centre Towers",
    address: "Al Majaz, Sharjah",
    ownerId: "o2",
    units: 15,
    occupiedUnits: 12,
    tenants: ["t12", "t13", "t14", "t15", "t16", "t17", "t18", "t19", "t20", "t21", "t22", "t23"],
    createdDate: "2023-02-01"
  }
]; 