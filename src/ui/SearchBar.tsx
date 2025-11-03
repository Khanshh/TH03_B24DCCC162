export default function SearchBar({ value, onChange, onTyping }: { value: string; onChange: (v: string) => void; onTyping?: () => void; }) {
  return (
    <input
      className="input"
      placeholder="Tìm theo tên sản phẩm..."
      value={value}
      onChange={(e) => { onChange(e.target.value); onTyping?.(); }}
    />
  );
}


