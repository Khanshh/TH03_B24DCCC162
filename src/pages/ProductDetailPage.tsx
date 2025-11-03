import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../state/ProductContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { state, remove } = useProducts();
  const navigate = useNavigate();

  const product = state.products.find(p => p.id === Number(id));
  if (!product) return <div>Không tìm thấy sản phẩm.</div>;

  function onDelete() {
    if (confirm('Bạn có chắc muốn xóa?')) {
      remove(product.id);
      navigate('/');
    }
  }

  return (
    <div className="card detail">
      <h2>{product.ten}</h2>
      <p><b>Danh mục:</b> {product.danhMuc}</p>
      <p><b>Giá:</b> {product.gia.toLocaleString('vi-VN')} đ</p>
      <p><b>Số lượng:</b> {product.soLuong}</p>
      <p><b>Mô tả:</b> {product.moTa}</p>
      <div className="row gap">
        <button onClick={() => navigate(`/edit/${product.id}`)}>Chỉnh sửa</button>
        <button className="danger" onClick={onDelete}>Xóa</button>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    </div>
  );
}


