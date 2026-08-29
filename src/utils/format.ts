export function formatCLP(valor: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(valor);
}

export const ORDEN_TALLAS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;
export type Talla = (typeof ORDEN_TALLAS)[number];

function posicionTalla(talla: string | null): number {
  if (!talla) return 999;
  const idx = ORDEN_TALLAS.indexOf(talla as Talla);
  return idx === -1 ? 999 : idx;
}

export function ordenarPorTalla<T extends { talla: string | null }>(variantes: T[]): T[] {
  return [...variantes].sort((a, b) => posicionTalla(a.talla) - posicionTalla(b.talla));
}