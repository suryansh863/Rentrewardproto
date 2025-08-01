import type { Reward } from '../types';

export const rewards: Reward[] = [
  {
    id: "rw1",
    name: "Amazon Gift Card",
    description: "AED 180 Amazon Gift Card",
    pointsCost: 500,
    category: "shopping",
    image: "amazon_gift_card.jpg"
  },
  {
    id: "rw2",
    name: "Starbucks Gift Card",
    description: "AED 75 Starbucks Gift Card",
    pointsCost: 200,
    category: "food",
    image: "starbucks_gift_card.jpg"
  },
  {
    id: "rw3",
    name: "Movie Tickets",
    description: "2 Movie Tickets at VOX Cinemas",
    pointsCost: 300,
    category: "entertainment",
    image: "movie_tickets.jpg"
  },
  {
    id: "rw4",
    name: "Careem Ride",
    description: "AED 55 Careem Ride Credit",
    pointsCost: 150,
    category: "travel",
    image: "careem_ride.jpg"
  },
  {
    id: "rw5",
    name: "Talabat Voucher",
    description: "AED 90 Talabat Voucher",
    pointsCost: 250,
    category: "food",
    image: "talabat_voucher.jpg"
  }
]; 