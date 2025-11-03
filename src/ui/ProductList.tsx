import { Link } from 'react-router-dom';
import { Product } from '../state/ProductContext';

export default function ProductList({ products }: { products: Product[] }) {
  if (products.length === 0) return <div>Không có sản phẩm phù hợp.</div>;
  return (
    <div className="grid">
      {products.map(p => (
        <div key={p.id} className="card">
          <h3 className="truncate">{p.ten}</h3>
          <div className="muted">{p.danhMuc}</div>
          <div className="price">{p.gia.toLocaleString('vi-VN')} đ</div>
          <div className="row">
            <Link to={`/products/${p.id}`} className="link-btn">Chi tiết</Link>
            <Link to={`/edit/${p.id}`} className="link-btn">Sửa</Link>
          </div>
        </div>
      ))}
    </div>
  );
}


