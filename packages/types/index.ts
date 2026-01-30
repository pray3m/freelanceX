// Shared type definitions for freelanceX monorepo

export interface User {
  id: string;
  email: string;
  username?: string;
  fullName?: string;
  description?: string;
  profileImage?: string;
  isProfileInfoSet: boolean;
  createdAt: Date;
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  category: string;
  deliveryTime: number;
  revisions: number;
  features: string[];
  price: number;
  shortDesc: string;
  createdAt: Date;
  images: string[];
  userId: string;
}

export interface Order {
  id: string;
  createdAt: Date;
  buyerId: string;
  paymentIntent: string;
  isCompleted: boolean;
  gigId: string;
  price: number;
}

export interface Message {
  id: string;
  text: string;
  createdAt: Date;
  isRead: boolean;
  senderId: string;
  receiverId: string;
  orderId: string;
}

export interface Review {
  id: string;
  createdAt: Date;
  rating: number;
  comment?: string;
  gigId: string;
  reviewerId: string;
}
