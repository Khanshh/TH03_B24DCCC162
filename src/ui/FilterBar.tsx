import { Category } from '../state/ProductContext';

const categories: Category[] = ['Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

export default function FilterBar({
  category,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: {
  category: string;
  onCategoryChange: (c: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (v: string) => void;
  onMaxPriceChange: (v: string) => void;
}) {
  return (
    <div className="row gap">
      <select className="input" value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">Tất cả danh mục</option>
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input className="input" type="number" placeholder="Giá min" value={minPrice} onChange={(e) => onMinPriceChange(e.target.value)} />
      <input className="input" type="number" placeholder="Giá max" value={maxPrice} onChange={(e) => onMaxPriceChange(e.target.value)} />
    </div>
  );
}


