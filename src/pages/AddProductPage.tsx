import { useNavigate } from 'react-router-dom';
import { useProducts, Product } from '../state/ProductContext';
import ProductForm from '../ui/ProductForm';

export default function AddProductPage() {
  const { add } = useProducts();
  const navigate = useNavigate();

  function handleSubmit(data: Omit<Product, 'id'>) {
    add(data);
    navigate('/');
  }

  return (
    <div className="card">
      <h2>Thêm sản phẩm</h2>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}


