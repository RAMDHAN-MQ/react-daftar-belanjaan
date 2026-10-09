import Item from "./Item";

export default function Main({ items, onToggleItem, onDeleteItem, sort }) {
  let sortedItems;
  if (sort === "nama") {
    sortedItems = items.slice().sort((a, b) => a.nama.localeCompare(b.nama));
  } else if (sort === "check") {
    sortedItems = items.slice().sort((a, b) => a.checked - b.checked);
  } else {
    sortedItems = items;
  }

  return (
    <main>
      <ul>
        {sortedItems.map((e) => (
          <Item
            key={e.id}
            item={e}
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>
    </main>
  );
}
