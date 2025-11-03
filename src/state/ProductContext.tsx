import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { initialProducts } from '../data/initialProducts';

export type Category = 'Điện tử' | 'Quần áo' | 'Đồ ăn' | 'Sách' | 'Khác';

export interface Product {
  id: number;
  ten: string;
  danhMuc: Category;
  gia: number;
  soLuong: number;
  moTa: string;
  anh?: string;
}

type State = {
  products: Product[];
};

type AddAction = { type: 'add'; payload: Omit<Product, 'id'> };
type UpdateAction = { type: 'update'; payload: Product };
type DeleteAction = { type: 'delete'; payload: { id: number } };
type Action = AddAction | UpdateAction | DeleteAction;

function productReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      const nextId = state.products.reduce((m, p) => Math.max(m, p.id), 0) + 1;
      const newProduct: Product = { id: nextId, ...action.payload };
      return { products: [newProduct, ...state.products] };
    }
    case 'update': {
      return {
        products: state.products.map(p => (p.id === action.payload.id ? action.payload : p)),
      };
    }
    case 'delete': {
      return { products: state.products.filter(p => p.id !== action.payload.id) };
    }
    default:
      return state;
  }
}

type ProductContextValue = {
  state: State;
  add: (product: Omit<Product, 'id'>) => void;
  update: (product: Product) => void;
  remove: (id: number) => void;
};

const ProductContext = createContext<ProductContextValue | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(productReducer, { products: initialProducts });

  const value = useMemo<ProductContextValue>(() => ({
    state,
    add: (product) => dispatch({ type: 'add', payload: product }),
    update: (product) => dispatch({ type: 'update', payload: product }),
    remove: (id) => dispatch({ type: 'delete', payload: { id } }),
  }), [state]);

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
}


