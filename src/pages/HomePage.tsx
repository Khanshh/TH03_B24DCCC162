import { useMemo, useState } from 'react';
import { useProducts } from '../state/ProductContext';
import ProductList from '../ui/ProductList';
import SearchBar from '../ui/SearchBar';
import FilterBar from '../ui/FilterBar';
import Pagination from '../ui/Pagination';

const PAGE_SIZE = 6;

export default function HomePage() {
  const { state } = useProducts();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = minPrice ? Number(minPrice) : -Infinity;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    return state.products.filter(p => {
      const byName = q === '' || p.ten.toLowerCase().includes(q);
      const byCat = category === '' || p.danhMuc === category;
      const byPrice = p.gia >= min && p.gia <= max;
      return byName && byCat && byPrice;
    });
  }, [state.products, query, category, minPrice, maxPrice]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paged = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="stack">
      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} onTyping={() => setPage(1)} />
        <FilterBar
          category={category}
          onCategoryChange={(c) => { setCategory(c); setPage(1); }}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={(v) => { setMinPrice(v); setPage(1); }}
          onMaxPriceChange={(v) => { setMaxPrice(v); setPage(1); }}
        />
      </div>
      <div className="meta">Tổng: {total} sản phẩm • Trang {currentPage}/{totalPages}</div>
      <ProductList products={paged} />
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}


