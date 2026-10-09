export default function Item({ item, onToggleItem, onDeleteItem }) {
  return (
    <li>
      <input
        type="checkbox"
        onChange={() => onToggleItem(item.id)}
        checked={item.checked}
      />
      <p style={item.checked ? { textDecoration: "line-through" } : {}}>
        {item.nama} {item.jumlah}
      </p>
      <button onClick={() => onDeleteItem(item.id)}>X</button>
    </li>
  );
}
