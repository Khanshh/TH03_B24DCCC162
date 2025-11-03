import { useNavigate, useParams } from 'react-router-dom';
import { useProducts, Product } from '../state/ProductContext';
import ProductForm from '../ui/ProductForm';

export default function EditProductPage() {
  const { id } = useParams();
  const { state, update } = useProducts();
  const navigate = useNavigate();
  const product = state.products.find(p => p.id === Number(id));

  if (!product) return <div>Không tìm thấy sản phẩm.</div>;

  function handleSubmit(data: Omit<Product, 'id'>) {
    update({ ...product, ...data });
    navigate(`/products/${product.id}`);
  }

  return (
    <div className="card">
      <h2>Chỉnh sửa sản phẩm</h2>
      <ProductForm initialValues={product} onSubmit={handleSubmit} />
    </div>
  );
}


