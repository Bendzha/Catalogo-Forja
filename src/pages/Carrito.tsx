import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import { formatCLP } from '../utils/format';
import { WHATSAPP_NUMERO, WHATSAPP_MENSAJE_MAX_LARGO } from '../config';

export default function Carrito() {
  const { items, quitarItem, actualizarCantidad, totalItems, totalPrecio } = useCart();

  function generarMensajeWhatsApp() {
    let mensaje = `Hola, quisiera cotizar los siguientes productos:\n\n`;
    items.forEach((item, i) => {
      mensaje += `${i + 1}. ${item.nombre}\n`;
      mensaje += `   Talla: ${item.talla ?? 'Única'} | SKU: ${item.sku}\n`;
      mensaje += `   Cantidad: ${item.cantidad} | Precio unitario: ${formatCLP(item.precio)}\n\n`;
    });
    mensaje += `Total estimado: ${formatCLP(totalPrecio)}\n\n`;
    mensaje += `Quedo atento/a a la confirmación. Gracias.`;

    // Si el mensaje queda demasiado largo (carritos con muchos productos),
    // WhatsApp puede truncar o fallar el link silenciosamente. En ese caso,
    // enviamos un resumen más corto en vez del detalle línea por línea.
    if (mensaje.length > WHATSAPP_MENSAJE_MAX_LARGO) {
      let resumen = `Hola, quisiera cotizar ${totalItems} productos de mi carrito:\n\n`;
      items.forEach((item, i) => {
        resumen += `${i + 1}. ${item.nombre} (Talla ${item.talla ?? 'Única'}, x${item.cantidad})\n`;
      });
      resumen += `\nTotal estimado: ${formatCLP(totalPrecio)}\n\nQuedo atento/a a la confirmación. Gracias.`;
      return encodeURIComponent(resumen);
    }

    return encodeURIComponent(mensaje);
  }

  const linkWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${generarMensajeWhatsApp()}`;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#112433]">Tu carrito está vacío</h1>
        <p className="text-[#112433]/60 mt-2">
          Agrega productos desde el catálogo para cotizarlos aquí.
        </p>
        <Link to="/catalogo" className="inline-block mt-6">
          <Button variant="primary">Ver catálogo</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#112433] mb-1">Carrito de cotización</h1>
      <p className="text-[#112433]/60 mb-8">
        {totalItems} producto{totalItems !== 1 ? 's' : ''} seleccionado
        {totalItems !== 1 ? 's' : ''}
      </p>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.sku}
            className="flex items-center gap-4 bg-white rounded-xl border border-[#112433]/8 p-4"
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#DCE6EC] flex-shrink-0">
              <img
                src={item.imagen}
                alt={item.nombre}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://placehold.co/200x200/112433/F5F9FB?text=Sin+imagen';
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#112433] text-sm leading-snug truncate">
                {item.nombre}
              </p>
              <p className="text-xs text-[#112433]/50 mt-0.5">
                Talla: {item.talla ?? 'Única'} · SKU: {item.sku}
              </p>
              <p className="text-sm font-bold text-[#112433] mt-1">
                {formatCLP(item.precio)}
              </p>
            </div>

            {/* Selector de cantidad */}
            <div className="flex items-center gap-2 border border-[#112433]/15 rounded-lg px-2 py-1">
              <button
                onClick={() => actualizarCantidad(item.sku, item.cantidad - 1)}
                className="text-[#112433]/60 hover:text-[#112433] p-1"
                aria-label="Disminuir cantidad"
              >
                <Minus size={14} />
              </button>
              <span className="text-sm font-medium w-5 text-center">{item.cantidad}</span>
              <button
                onClick={() => actualizarCantidad(item.sku, item.cantidad + 1)}
                className="text-[#112433]/60 hover:text-[#112433] p-1"
                aria-label="Aumentar cantidad"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={() => quitarItem(item.sku)}
              className="text-[#112433]/40 hover:text-red-500 transition-colors p-2"
              aria-label="Quitar del carrito"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Resumen y cotización */}
      <div className="mt-8 bg-[#F5F9FB] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm text-[#112433]/50">Total estimado</p>
          <p className="text-2xl font-bold text-[#112433]">{formatCLP(totalPrecio)}</p>
        </div>
        <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
          <Button variant="primary" size="lg" className="w-full sm:w-auto">
            <MessageCircle size={18} />
            Solicitar cotización por WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
}