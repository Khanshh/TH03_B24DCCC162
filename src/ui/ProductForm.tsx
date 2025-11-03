import { useEffect, useMemo, useState } from 'react';
import { Category, Product } from '../state/ProductContext';

const categories: Category[] = ['Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

type Values = Omit<Product, 'id'>;

export default function ProductForm({ initialValues, onSubmit }: { initialValues?: Product; onSubmit: (values: Values) => void; }) {
  const [ten, setTen] = useState(initialValues?.ten ?? '');
  const [danhMuc, setDanhMuc] = useState<Category | ''>(initialValues?.danhMuc ?? '');
  const [gia, setGia] = useState<string>(initialValues ? String(initialValues.gia) : '');
  const [soLuong, setSoLuong] = useState<string>(initialValues ? String(initialValues.soLuong) : '');
  const [moTa, setMoTa] = useState(initialValues?.moTa ?? '');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!initialValues) return;
    setTen(initialValues.ten);
    setDanhMuc(initialValues.danhMuc);
    setGia(String(initialValues.gia));
    setSoLuong(String(initialValues.soLuong));
    setMoTa(initialValues.moTa);
  }, [initialValues]);

  const errors = useMemo(() => {
    const errs: Record<string, string> = {};
    if (!ten.trim()) errs.ten = 'Tên sản phẩm bắt buộc';
    else if (ten.trim().length < 3) errs.ten = 'Tên tối thiểu 3 ký tự';

    const price = Number(gia);
    if (gia === '') errs.gia = 'Giá bắt buộc';
    else if (!Number.isFinite(price) || price <= 0) errs.gia = 'Giá phải là số dương';

    const qty = Number(soLuong);
    if (soLuong === '') errs.soLuong = 'Số lượng bắt buộc';
    else if (!Number.isInteger(qty) || qty <= 0) errs.soLuong = 'Số lượng phải là số nguyên dương';

    if (!danhMuc) errs.danhMuc = 'Vui lòng chọn danh mục';
    return errs;
  }, [ten, gia, soLuong, danhMuc]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ ten: true, gia: true, soLuong: true, danhMuc: true });
    if (Object.keys(errors).length > 0) return;
    onSubmit({ ten: ten.trim(), danhMuc: danhMuc as Category, gia: Number(gia), soLuong: Number(soLuong), moTa: moTa.trim() });
  }

  function showError(name: string) {
    return touched[name] && errors[name];
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Tên sản phẩm
        <input className="input" value={ten} onChange={e => setTen(e.target.value)} onBlur={() => setTouched(t => ({ ...t, ten: true }))} />
        {showError('ten') && <span className="error">{errors.ten}</span>}
      </label>
      <label>
        Danh mục
        <select className="input" value={danhMuc} onChange={e => setDanhMuc(e.target.value as Category | '')} onBlur={() => setTouched(t => ({ ...t, danhMuc: true }))}>
          <option value="">-- Chọn danh mục --</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {showError('danhMuc') && <span className="error">{errors.danhMuc}</span>}
      </label>
      <div className="row gap">
        <label className="grow">
          Giá (đ)
          <input className="input" type="number" value={gia} onChange={e => setGia(e.target.value)} onBlur={() => setTouched(t => ({ ...t, gia: true }))} />
          {showError('gia') && <span className="error">{errors.gia}</span>}
        </label>
        <label className="grow">
          Số lượng
          <input className="input" type="number" value={soLuong} onChange={e => setSoLuong(e.target.value)} onBlur={() => setTouched(t => ({ ...t, soLuong: true }))} />
          {showError('soLuong') && <span className="error">{errors.soLuong}</span>}
        </label>
      </div>
      <label>
        Mô tả
        <textarea className="input" value={moTa} onChange={e => setMoTa(e.target.value)} rows={4} />
      </label>
      <div className="row gap">
        <button type="submit">Lưu</button>
      </div>
    </form>
  );
}


