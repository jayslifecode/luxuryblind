"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { generateOrderRef } from "@/lib/utils/price";

export interface OrderItem {
  productId: string;
  productTitle: string;
  widthCm: number;
  heightCm: number;
  sqm: number;
  pricePerSqm: number;
  totalPrice: number;
  delivery: boolean;
}

interface OrderState {
  items: OrderItem[];
  ref: string;
}

type OrderAction =
  | { type: "ADD_ITEM"; payload: OrderItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CLEAR" };

function reducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((_, i) => i !== action.payload),
      };
    case "CLEAR":
      return { items: [], ref: generateOrderRef() };
    default:
      return state;
  }
}

interface OrderContextValue {
  state: OrderState;
  addItem: (item: OrderItem) => void;
  removeItem: (index: number) => void;
  clear: () => void;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

const OrderContext = createContext<OrderContextValue | null>(null);

const STORAGE_KEY = "lb-order";

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], ref: generateOrderRef() });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as OrderState;
        parsed.items.forEach((item) => dispatch({ type: "ADD_ITEM", payload: item }));
      }
    } catch {
      // ignore malformed storage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addItem = (item: OrderItem) => dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (index: number) => dispatch({ type: "REMOVE_ITEM", payload: index });
  const clear = () => dispatch({ type: "CLEAR" });

  const hasDelivery = state.items.some((i) => i.delivery);
  const subtotal = state.items.reduce((sum, i) => sum + i.totalPrice, 0);
  const deliveryFee = hasDelivery ? 10000 : 0;
  const total = subtotal + deliveryFee;

  return (
    <OrderContext.Provider value={{ state, addItem, removeItem, clear, subtotal, deliveryFee, total }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}
