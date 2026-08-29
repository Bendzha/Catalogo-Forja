import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';

export interface ItemCarrito {
  productoId: string;
  nombre: string;
  categoria: string;
  imagen: string;
  sku: string;
  talla: string | null;
  precio: number;
  cantidad: number;
}

interface CartContextValue {
  items: ItemCarrito[];
  agregarItem: (item: Omit<ItemCarrito, 'cantidad'>, cantidad?: number) => void;
  quitarItem: (sku: string) => void;
  actualizarCantidad: (sku: string, cantidad: number) => void;
  vaciarCarrito: () => void;
  totalItems: number;
  totalPrecio: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  function agregarItem(nuevo: Omit<ItemCarrito, 'cantidad'>, cantidad = 1) {
    setItems((prev) => {
      const existente = prev.find((i) => i.sku === nuevo.sku);
      if (existente) {
        return prev.map((i) =>
          i.sku === nuevo.sku ? { ...i, cantidad: i.cantidad + cantidad } : i
        );
      }
      return [...prev, { ...nuevo, cantidad }];
    });
  }

  function quitarItem(sku: string) {
    setItems((prev) => prev.filter((i) => i.sku !== sku));
  }

  function actualizarCantidad(sku: string, cantidad: number) {
    if (cantidad < 1) return;
    setItems((prev) => prev.map((i) => (i.sku === sku ? { ...i, cantidad } : i)));
  }

  function vaciarCarrito() {
    setItems([]);
  }

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.cantidad, 0), [items]);
  const totalPrecio = useMemo(
    () => items.reduce((sum, i) => sum + i.precio * i.cantidad, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, agregarItem, quitarItem, actualizarCantidad, vaciarCarrito, totalItems, totalPrecio }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}