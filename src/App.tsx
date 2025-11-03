import { Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          <span className="logo-dot" />
          <span>Quản lý sản phẩm</span>
        </div>
        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            end
          >
            Trang chủ
          </NavLink>
          <NavLink to="/add" className="btn-primary">+ Thêm sản phẩm</NavLink>
        </nav>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/add" element={<AddProductPage />} />
          <Route path="/edit/:id" element={<EditProductPage />} />
        </Routes>
      </main>
    </div>
  );
}


