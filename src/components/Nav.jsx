import { useState } from "react";

export default function Nav({ onAddItem, onSortItems, onBersihkan }) {
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
