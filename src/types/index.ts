export interface Sticker {
  id: string;
  full_name: string;
  age: number;
  height: string;
  weight: string;
  country: string;
  photo_url: string;
  generated_image_url?: string;
  status: 'pending' | 'paid' | 'generated';
  created_at: string;
}

export interface Payment {
  id: string;
  sticker_id: string;
  mercadopago_id?: string;
  status: 'pending' | 'approved' | 'cancelled';
  qr_code?: string;
  qr_code_base64?: string;
  pix_code?: string;
  created_at: string;
}

export interface FormData {
  fullName: string;
  age: string;
  height: string;
  weight: string;
  country: string;
  photo: File | null;
}

export interface MockSticker {
  id: string;
  name: string;
  age: number;
  country: string;
  flag: string;
  image: string;
}
