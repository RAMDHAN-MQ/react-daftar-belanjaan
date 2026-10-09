export default function Footer({ items }) {
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
