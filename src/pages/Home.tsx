import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { productos } from '../data/productos';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';

export default function Home() {
  const destacados = productos.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#3D332E] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-start gap-5">
          <span className="text-[#D4D93A] font-semibold text-sm uppercase tracking-wide">
            BCM · Ropa de trabajo
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight max-w-2xl">
            Vestimenta industrial hecha para resistir la jornada completa
          </h1>
          <p className="text-white/60 max-w-xl">
            Pantalones cargo, parkas, chalecos reflectantes y uniformes completos,
            pensados para minería, terreno y construcción.
          </p>
          <Link to="/catalogo">
            <Button variant="primary" size="lg">
              Ver catálogo completo
            </Button>
          </Link>
        </div>
      </section>

      {/* Destacados */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#3D332E]">Productos destacados</h2>
          <Link to="/catalogo" className="text-sm font-medium text-[#6B7A2E] hover:underline">
            Ver todos →
          </Link>
        </div>
        <ProductGrid productos={destacados} />
      </section>

      {/* Quiénes somos */}
      <section className="bg-[#FAFAF8] border-y border-[#3D332E]/8">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <span className="text-[#6B7A2E] font-semibold text-sm uppercase tracking-wide">
            Sobre BCM
          </span>
          <h2 className="text-3xl font-bold text-[#3D332E] mt-2 mb-6 max-w-2xl">
            Más de 20 años vistiendo a las empresas líderes de Chile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-[#3D332E]/5">
              <p className="text-3xl font-bold text-[#6B7A2E]">2005</p>
              <p className="text-sm text-[#3D332E]/60 mt-1">Inicio de operaciones</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-[#3D332E]/5">
              <p className="text-3xl font-bold text-[#6B7A2E]">20+</p>
              <p className="text-sm text-[#3D332E]/60 mt-1">Años de experiencia</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-[#3D332E]/5">
              <p className="text-3xl font-bold text-[#6B7A2E]">N°1</p>
              <p className="text-sm text-[#3D332E]/60 mt-1">
                En uniformes técnicos de telecomunicaciones
              </p>
            </div>
          </div>

          <div className="max-w-3xl space-y-4 text-[#3D332E]/70 leading-relaxed">
            <p>
              BC Marketing inicia formalmente sus operaciones en diciembre de 2005,
              logrando posicionarse como uno de los principales proveedores de uniformes
              técnicos de telecomunicaciones del país.
            </p>
            <p>
              Nos preocupamos de potenciar la imagen de cada empresa que confía en
              nosotros. Contamos con una línea de ropa técnica y corporativa, además de un
              departamento de diseño propio que nos permite un manejo integral en el
              desarrollo de cada requerimiento.
            </p>
            <p>
              Con el paso de los años nos hemos especializado en el área de
              telecomunicaciones, atendiendo a las empresas más importantes de este rubro
              a nivel nacional.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#D4D93A] mb-3" />
              <h3 className="font-semibold text-[#3D332E] mb-1">Diseño propio</h3>
              <p className="text-sm text-[#3D332E]/60">
                Departamento de diseño interno para tu imagen corporativa de principio a
                fin.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#6B7A2E] mb-3" />
              <h3 className="font-semibold text-[#3D332E] mb-1">Especialización técnica</h3>
              <p className="text-sm text-[#3D332E]/60">
                Expertos en telecomunicaciones e industria, con prendas para terreno.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#3D332E] mb-3" />
              <h3 className="font-semibold text-[#3D332E] mb-1">Trato personalizado</h3>
              <p className="text-sm text-[#3D332E]/60">
                Atención responsable y directa, adaptada a cada empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto y ubicación */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <span className="text-[#6B7A2E] font-semibold text-sm uppercase tracking-wide">
          Contacto
        </span>
        <h2 className="text-3xl font-bold text-[#3D332E] mt-2 mb-8">
          Conversemos sobre tu proyecto
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Datos de contacto */}
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-[#6B7A2E]" />
              </div>
              <div>
                <p className="text-sm text-[#3D332E]/50">Teléfono</p>
                <p className="font-medium text-[#3D332E]">+56 9 1234 5678</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-[#6B7A2E]" />
              </div>
              <div>
                <p className="text-sm text-[#3D332E]/50">Correo</p>
                <p className="font-medium text-[#3D332E]">contacto@bcmarketing.cl</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-[#6B7A2E]" />
              </div>
              <div>
                <p className="text-sm text-[#3D332E]/50">Dirección</p>
                <p className="font-medium text-[#3D332E]">
                  Av. Ejemplo 1234, Santiago, Chile
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] flex items-center justify-center flex-shrink-0">
                <Clock size={18} className="text-[#6B7A2E]" />
              </div>
              <div>
                <p className="text-sm text-[#3D332E]/50">Horario</p>
                <p className="font-medium text-[#3D332E]">Lunes a viernes, 9:00 - 18:00</p>
              </div>
            </div>

            <a
              href="https://wa.me/56912345678"
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
          <div className="rounded-2xl overflow-hidden border border-[#3D332E]/10 min-h-[320px]">
            <iframe
              title="Ubicación BCM"
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