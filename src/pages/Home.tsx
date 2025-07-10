import { useEffect, useState } from "react";
import type { Product } from "../types/products";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import logo from "../assets/logo_tienda_bebidas.png";
import portada from "../assets/portada_tienda_bebidas.jpg";
import styles from "./Home.module.css";
import Footer from "../components/Footer";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const promos = filteredProducts.filter(
    (p) => p.category.toLowerCase() === "promos"
  );
  const otherCategories = categories
    .filter((cat) => cat.toLowerCase() !== "promos")
    .map((cat) => ({
      category: cat,
      items: filteredProducts.filter((p) => p.category === cat),
    }));

  const allGroups = [
    ...(promos.length ? [{ category: "Promos", items: promos }] : []),
    ...otherCategories,
  ];

  const toggleCategory = (cat: string) => {
    setActiveCategory((prev) => (prev === cat ? null : cat));
  };

  if (loading) return <p className={styles.loading}>Cargando productos...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.portadaWrapper}>
        <img src={portada} alt="portada" className={styles.portada} />
      </div>

      <div className={styles.header}>
        <img src={logo} alt="logo" className={styles.logo} />
        <h1 className={styles.title}>¡Bienvenidos a Tu Tienda de Bebidas!</h1>
        <p className={styles.subtitle}>Elegí una categoría o buscá tu bebida favorita.</p>
      </div>

      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Buscar producto..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {search && filteredProducts.length === 0 && (
        <p className={styles.noProducts}>No se encontraron productos con ese nombre.</p>
      )}

      <div className={styles.categoriesWrapper}>
        {allGroups.map(({ category, items }) => (
          <div key={category} className={styles.categoryCard}>
            <button
              onClick={() => toggleCategory(category)}
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.activeCategory : ""
              }`}
            >
              {category}
            </button>
            {activeCategory === category && (
              <div className={styles.productsGrid}>
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;


