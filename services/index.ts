export interface Hotel {
    _id: string;
    name: string;
    address: string;
    email: string;
    phone: string;
    price: number;
    currency: string;
    photo: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
    count?: number;
  }