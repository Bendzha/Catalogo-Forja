import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';

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

const STORAGE_KEY = 'arias-carrito-v1';

function cargarCarritoInicial(): ItemCarrito[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>(cargarCarritoInicial);

  // Guardar en localStorage cada vez que el carrito cambia
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Si localStorage falla (modo privado, cuota excedida, etc.) el carrito
      // sigue funcionando en memoria durante la sesión, solo no persiste.
    }
  }, [items]);

  const agregarItem = useCallback((nuevo: Omit<ItemCarrito, 'cantidad'>, cantidad = 1) => {
    setItems((prev) => {
      const existente = prev.find((i) => i.sku === nuevo.sku);
      if (existente) {
        return prev.map((i) =>
          i.sku === nuevo.sku ? { ...i, cantidad: i.cantidad + cantidad } : i
        );
      }
      return [...prev, { ...nuevo, cantidad }];
    });
  }, []);

  const quitarItem = useCallback((sku: string) => {
    setItems((prev) => prev.filter((i) => i.sku !== sku));
  }, []);

  const actualizarCantidad = useCallback((sku: string, cantidad: number) => {
    if (cantidad < 1) return;
    setItems((prev) => prev.map((i) => (i.sku === sku ? { ...i, cantidad } : i)));
  }, []);

  const vaciarCarrito = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.cantidad, 0), [items]);
  const totalPrecio = useMemo(
    () => items.reduce((sum, i) => sum + i.precio * i.cantidad, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      agregarItem,
      quitarItem,
      actualizarCantidad,
      vaciarCarrito,
      totalItems,
      totalPrecio,
    }),
    [items, agregarItem, quitarItem, actualizarCantidad, vaciarCarrito, totalItems, totalPrecio]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}