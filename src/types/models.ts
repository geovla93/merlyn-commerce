export interface CartItem {
  _id: string;
  imageUrl: string;
  price: number;
  name: string;
  quantity: number;
  totalPrice: number;
}

export interface Product {
  _id: string;
  imageUrl: string;
  price: number;
  name: string;
  category: string;
  quantity: number;
}

export interface Section {
  _id: string;
  imageUrl: string;
  linkUrl: string;
  title: string;
  size?: string;
}
