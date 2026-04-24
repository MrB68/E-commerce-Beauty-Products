export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  sales: number;
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: { productId: string; quantity: number }[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Radiant Glow Serum',
    category: 'Skincare',
    price: 68,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    description: 'A luxurious vitamin C serum that brightens and evens skin tone while reducing fine lines.',
    stock: 45,
    sales: 234
  },
  {
    id: '2',
    name: 'Velvet Matte Lipstick',
    category: 'Makeup',
    price: 32,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80',
    description: 'Long-lasting matte finish with intense color payoff. Available in 12 shades.',
    stock: 89,
    sales: 456
  },
  {
    id: '3',
    name: 'Hydrating Face Mask',
    category: 'Skincare',
    price: 24,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80',
    description: 'Deep hydration sheet mask infused with hyaluronic acid and botanical extracts.',
    stock: 120,
    sales: 678
  },
  {
    id: '4',
    name: 'Luminous Foundation',
    category: 'Makeup',
    price: 52,
    image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800&q=80',
    description: 'Buildable coverage foundation with a natural luminous finish. SPF 30.',
    stock: 67,
    sales: 345
  },
  {
    id: '5',
    name: 'Rose Petal Eye Cream',
    category: 'Skincare',
    price: 78,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80',
    description: 'Lightweight eye cream that reduces puffiness and dark circles with rose extract.',
    stock: 34,
    sales: 189
  },
  {
    id: '6',
    name: 'Precision Eyeliner',
    category: 'Makeup',
    price: 26,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
    description: 'Ultra-fine tip for precise application. Waterproof and smudge-proof formula.',
    stock: 156,
    sales: 567
  },
  {
    id: '7',
    name: 'Gentle Cleansing Oil',
    category: 'Skincare',
    price: 42,
    image: 'https://images.unsplash.com/photo-1571781418606-70265b9cce90?w=800&q=80',
    description: 'Removes makeup and impurities while nourishing skin with natural oils.',
    stock: 78,
    sales: 423
  },
  {
    id: '8',
    name: 'Volumizing Mascara',
    category: 'Makeup',
    price: 28,
    image: 'https://images.unsplash.com/photo-1631730486105-9ead7478a4f9?w=800&q=80',
    description: 'Creates dramatic volume and length without clumping. All-day wear.',
    stock: 145,
    sales: 789
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    customer: 'Sarah Johnson',
    date: '2026-04-20',
    total: 156,
    status: 'delivered',
    items: [{ productId: '1', quantity: 2 }, { productId: '3', quantity: 1 }]
  },
  {
    id: 'ORD-002',
    customer: 'Emily Chen',
    date: '2026-04-21',
    total: 84,
    status: 'processing',
    items: [{ productId: '2', quantity: 1 }, { productId: '4', quantity: 1 }]
  },
  {
    id: 'ORD-003',
    customer: 'Maria Garcia',
    date: '2026-04-21',
    total: 210,
    status: 'pending',
    items: [{ productId: '5', quantity: 1 }, { productId: '7', quantity: 2 }]
  }
];

export const salesData = [
  { id: 1, month: 'Oct', revenue: 4200 },
  { id: 2, month: 'Nov', revenue: 5800 },
  { id: 3, month: 'Dec', revenue: 8900 },
  { id: 4, month: 'Jan', revenue: 6200 },
  { id: 5, month: 'Feb', revenue: 7100 },
  { id: 6, month: 'Mar', revenue: 9400 },
  { id: 7, month: 'Apr', revenue: 11200 }
];
