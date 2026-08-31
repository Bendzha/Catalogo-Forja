import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Package, Warehouse, ShieldCheck, Truck, PackageCheck } from 'lucide-react';
import { productos } from '../data/productos';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';
import { WHATSAPP_NUMERO } from '../config';

const CLIENTES = ['Equans', 'Movistar', 'CGE', 'ENEL', 'Minera Escondida', 'Collahuasi', 'El Abra'];

export default function Home() {
  const destacados = productos.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#112433] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Columna texto */}
          <div className="flex flex-col items-start gap-5">
            <span className="text-[#FE8900] font-bold text-sm uppercase tracking-wide">
              15 años abasteciendo a la gran minería y las telecomunicaciones
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              Ahora, a tu servicio
            </h1>
            <p className="text-white/70 leading-relaxed">
              Soy José Antonio Arias, Ingeniero en Logística. Durante más de 15 años
              lideré operaciones logísticas críticas para Equans, Movistar, CGE, ENEL y
              Minera Escondida, Collahuasi y El Abra, gestionando más de $600MM en
              inventario y un Centro de Distribución de 3.000 m².
            </p>
            <p className="text-white font-semibold">
              Sé lo que cuesta una faena parada por falta de stock.
            </p>
            <Link to="/catalogo">
              <Button variant="primary" size="lg">
                Ver catálogo completo
              </Button>
            </Link>
          </div>

          {/* Columna panel de cifras */}
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="group bg-white/5 border border-white/10 hover:border-[#0098C9]/50 hover:bg-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-sm transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#0098C9]/15 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Warehouse size={22} className="text-[#0098C9]" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold">3.000 m²</p>
              <p className="text-xs text-white/60 mt-1">Centro de distribución operado</p>
            </div>
            <div className="group bg-white/5 border border-white/10 hover:border-[#0098C9]/50 hover:bg-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-sm transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#0098C9]/15 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Package size={22} className="text-[#0098C9]" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold">$600MM+</p>
              <p className="text-xs text-white/60 mt-1">En inventario gestionado</p>
            </div>
            <div className="group bg-white/5 border border-white/10 hover:border-[#FE8900]/50 hover:bg-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-sm transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#FE8900]/15 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ShieldCheck size={22} className="text-[#FE8900]" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold">15 años</p>
              <p className="text-xs text-white/60 mt-1">De experiencia en terreno</p>
            </div>
            <div className="group bg-white/5 border border-white/10 hover:border-[#FE8900]/50 hover:bg-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-sm transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#FE8900]/15 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={22} className="text-[#FE8900]" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold">SAP</p>
              <p className="text-xs text-white/60 mt-1">Estándar de trazabilidad</p>
            </div>
          </div>
        </div>

        {/* Fondo tipo plano técnico + manchas de color */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07]"
          aria-hidden="true"
        >
          <defs>
            <pattern id="grid-hero" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-hero)" />
        </svg>
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#0098C9]/15 blur-3xl" />
        <div className="absolute -left-24 -top-24 w-72 h-72 rounded-full bg-[#FE8900]/15 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-[#0098C9]/5 blur-3xl" />
      </section>

      {/* Clientes / credibilidad */}
      <section className="bg-[#0098C9]/5 border-b border-[#112433]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <p className="text-xs text-[#112433]/50 uppercase tracking-wide mb-3 text-center">
            Experiencia liderando operaciones para
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {CLIENTES.map((c) => (
              <span key={c} className="text-sm font-semibold text-[#112433]/60">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Destacados */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#112433]">Productos destacados</h2>
          <Link to="/catalogo" className="text-sm font-medium text-[#0098C9] hover:underline">
            Ver todos →
          </Link>
        </div>
        <ProductGrid productos={destacados} />
      </section>

      {/* Propuesta de valor / servicio logístico */}
      <section className="bg-[#F5F9FB] border-y border-[#112433]/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <span className="text-[#0098C9] font-semibold text-sm uppercase tracking-wide">
            ARIAS Supply &amp; Logistics
          </span>
          <h2 className="text-3xl font-bold text-[#112433] mt-2 mb-6 max-w-2xl">
            EPP certificado, uniformes, herramientas y equipos, con un servicio logístico
            que no falla
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { texto: 'Stock crítico asegurado', icono: PackageCheck, color: '#0098C9' },
              { texto: 'Entrega en terreno y faena', icono: Truck, color: '#FE8900' },
              { texto: 'Trazabilidad total con estándar SAP', icono: ShieldCheck, color: '#0098C9' },
            ].map(({ texto, icono: Icono, color }) => (
              <div
                key={texto}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg p-5 pt-6 border border-[#112433]/5 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: color }}
                />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <Icono size={22} style={{ color }} />
                </div>
                <p className="text-sm font-semibold text-[#112433]">{texto}</p>
              </div>
            ))}
          </div>

          <p className="text-[#112433]/70 leading-relaxed max-w-3xl">
            No somos un vendedor más. Somos tu socio logístico, de logístico a logístico.
            Con más de $600MM en inventario gestionado y experiencia en Centros de
            Distribución de 3.000 m², entendemos lo que realmente cuesta una faena
            detenida por falta de stock — y trabajamos para que eso nunca te pase.
          </p>
        </div>
      </section>

      {/* Contacto y ubicación */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <span className="text-[#0098C9] font-semibold text-sm uppercase tracking-wide">
          Contacto
        </span>
        <h2 className="text-3xl font-bold text-[#112433] mt-2 mb-8">
          Conversemos sobre tu proyecto
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Datos de contacto */}
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F5F9FB] flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-[#0098C9]" />
              </div>
              <div>
                <p className="text-sm text-[#112433]/50">Teléfono</p>
                <p className="font-medium text-[#112433]">+56 9 9733 1565</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F5F9FB] flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-[#0098C9]" />
              </div>
              <div>
                <p className="text-sm text-[#112433]/50">Correo</p>
                <p className="font-medium text-[#112433]">contacto@ariasupplylogistics.cl</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F5F9FB] flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-[#0098C9]" />
              </div>
              <div>
                <p className="text-sm text-[#112433]/50">Dirección</p>
                <p className="font-medium text-[#112433]">
                  Av. Ejemplo 1234, Santiago, Chile
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F5F9FB] flex items-center justify-center flex-shrink-0">
                <Clock size={18} className="text-[#0098C9]" />
              </div>
              <div>
                <p className="text-sm text-[#112433]/50">Horario</p>
                <p className="font-medium text-[#112433]">Lunes a viernes, 9:00 - 18:00</p>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMERO}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2"
            >
              <Button variant="primary" size="md">
                Escribir por WhatsApp
              </Button>
            </a>
          </div>

          {/* Mapa */}
          <div className="rounded-2xl overflow-hidden border border-[#112433]/10 min-h-[320px]">
            <iframe
              title="Ubicación ARIAS Supply & Logistics"
              src="https://www.google.com/maps?q=Santiago,Chile&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 320 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}