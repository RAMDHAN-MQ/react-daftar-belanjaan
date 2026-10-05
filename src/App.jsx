import { useState } from "react";

const lists = [
  {
    id: 1,
    nama: "kopi",
    jumlah: 5,
    checked: true,
  },
  {
    id: 2,
    nama: "gula",
    jumlah: 7,
    checked: false,
  },
  {
    id: 3,
    nama: "garam",
    jumlah: 2,
    checked: false,
  },
];

export default function App() {
  const [keranjang, setKeranjang] = useState(lists);
  const [sort, setSort] = useState("waktu");

  function handleToggleItem(id) {
    setKeranjang((data) =>
      data.map((e) => (e.id === id ? { ...e, checked: !e.checked } : e)),
    );
  }

  function handleAddItem(item) {
    setKeranjang([...keranjang, item]);
  }

  function handleDeleteItem(id) {
    setKeranjang((data) => data.filter((e) => e.id !== id));
  }

  function handleSortItems(type) {
    setSort(type);
  }

  function handleBersihkan() {
    setKeranjang([]);
  }

  return (
    <div className="container">
      <Header />
      <Nav
        onAddItem={handleAddItem}
        onSortItems={handleSortItems}
        onBersihkan={handleBersihkan}
      />
      <Main
        items={keranjang}
        onToggleItem={handleToggleItem}
        onDeleteItem={handleDeleteItem}
        sort={sort}
      />
      <Footer items={keranjang} />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>Daftar Belanjaku</h1>
    </header>
  );
}

function Nav({ onAddItem, onSortItems, onBersihkan }) {
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    const itemBaru = {
      id: Date.now(),
      nama: nama,
      jumlah: jumlah,
      checked: false,
    };

    onAddItem(itemBaru);
    setNama("");
    setJumlah(1);
  }

  return (
    <nav>
      <select onChange={(e) => onSortItems(e.target.value)}>
        <option value="waktu">Urutkan berdasarkan waktu</option>
        <option value="nama">Urutkan berdasarkan nama</option>
        <option value="check">Urutkan berdasarkan check</option>
      </select>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="number"
          value={jumlah}
          onChange={(e) => setJumlah(Number(e.target.value))}
          required
        />
        <input
          type="text"
          placeholder="Masukkan belanjaan..."
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
        <button type="submit">Tambah</button>
      </form>
      <button className="btn-bersihkan" onClick={onBersihkan}>
        Bersihkan
      </button>
    </nav>
  );
}

function Main({ items, onToggleItem, onDeleteItem, sort }) {
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

function Item({ item, onToggleItem, onDeleteItem }) {
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

function Footer({ items }) {
  const terbeli = items.filter((e) => e.checked === true);
  let status;
  if (items.length === 0) {
    status = "Keranjang kosong, Silahkan menambah data dahulu";
  } else {
    status = `Terdapat ${items.length} barang dan sudah terbeli ${terbeli.length} barang`;
  }
  return (
    <footer>
      <p>{status}</p>
    </footer>
  );
}
