import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface FilterBarProps {
  categorias: string[];
  categoriaActiva: string;
  onCategoriaChange: (categoria: string) => void;
  generoActivo: string;
  onGeneroChange: (genero: string) => void;
  busqueda: string;
  onBusquedaChange: (texto: string) => void;
}

const GENEROS = ['Todos', 'Hombre', 'Mujer', 'Unisex'];

export default function FilterBar({
  categorias,
  categoriaActiva,
  onCategoriaChange,
  generoActivo,
  onGeneroChange,
  busqueda,
  onBusquedaChange,
}: FilterBarProps) {
  const [dropdownAbierto, setDropdownAbierto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickAfuera(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownAbierto(false);
      }
    }
    document.addEventListener('mousedown', handleClickAfuera);
    return () => document.removeEventListener('mousedown', handleClickAfuera);
  }, []);

  function seleccionarCategoria(cat: string) {
    onCategoriaChange(cat);
    setDropdownAbierto(false);
  }

  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Buscador */}
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#112433]/40"
        />
        <input
          type="text"
          value={busqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
          placeholder="Buscar producto por nombre..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#112433]/15 bg-white text-sm
                     focus:outline-none focus:ring-2 focus:ring-[#0098C9] focus:border-transparent
                     placeholder:text-[#112433]/40"
        />
      </div>

      {/* Filtro de género */}
      <div className="flex flex-wrap gap-2">
        {GENEROS.map((genero) => (
          <button
            key={genero}
            onClick={() => onGeneroChange(genero)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors border
              ${
                generoActivo === genero
                  ? 'bg-[#112433] text-white border-[#112433]'
                  : 'bg-white text-[#112433] border-[#112433]/15 hover:border-[#112433]/50'
              }`}
          >
            {genero}
          </button>
        ))}
      </div>

      {/* Filtro de categoría - dropdown */}
      <div className="relative w-fit" ref={dropdownRef}>
        <button
          onClick={() => setDropdownAbierto((prev) => !prev)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors
            ${
              categoriaActiva !== 'Todas'
                ? 'bg-[#0098C9] text-white border-[#0098C9]'
                : 'bg-white text-[#112433] border-[#112433]/15 hover:border-[#0098C9]/50'
            }`}
        >
          {categoriaActiva === 'Todas' ? 'Categoría' : categoriaActiva}
          <ChevronDown
            size={16}
            className={`transition-transform ${dropdownAbierto ? 'rotate-180' : ''}`}
          />
        </button>

        {dropdownAbierto && (
          <div className="absolute left-0 top-full mt-2 w-56 max-h-72 overflow-y-auto bg-white rounded-lg shadow-lg border border-[#112433]/10 z-20 py-1">
            <button
              onClick={() => seleccionarCategoria('Todas')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F5F9FB] transition-colors
                ${categoriaActiva === 'Todas' ? 'text-[#0098C9] font-semibold' : 'text-[#112433]'}`}
            >
              Todas las categorías
            </button>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => seleccionarCategoria(cat)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F5F9FB] transition-colors
                  ${categoriaActiva === cat ? 'text-[#0098C9] font-semibold' : 'text-[#112433]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}