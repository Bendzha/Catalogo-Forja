import { useMemo, useState } from 'react';
import { productos, categorias } from '../data/productos';
import ProductGrid from '../components/product/ProductGrid';
import FilterBar from '../components/product/FilterBar';

export default function Catalogo() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [generoActivo, setGeneroActivo] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const coincideCategoria = categoriaActiva === 'Todas' || p.categoria === categoriaActiva;
      const coincideGenero = generoActivo === 'Todos' || p.genero === generoActivo;
      const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      return coincideCategoria && coincideGenero && coincideBusqueda;
    });
  }, [categoriaActiva, generoActivo, busqueda]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1C2321]">Catálogo completo</h1>
        <p className="text-[#1C2321]/60 mt-1">
          {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''} disponible
          {productosFiltrados.length !== 1 ? 's' : ''}
        </p>
      </div>

      <FilterBar
        categorias={categorias}
        categoriaActiva={categoriaActiva}
        onCategoriaChange={setCategoriaActiva}
        generoActivo={generoActivo}
        onGeneroChange={setGeneroActivo}
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
      />

      <ProductGrid productos={productosFiltrados} />
    </div>
  );
}