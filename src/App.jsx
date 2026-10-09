import { useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Footer from "./components/Footer";

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
