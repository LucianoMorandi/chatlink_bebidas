import type { Product } from "../types/products";
import styles from "./ProductCard.module.css";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const handleBuy = () => {
    const message = `Hola, quiero pedir este producto:\n\n*${product.name}* - $${product.price}`;
    window.open(`https://wa.me/5492616093134?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price}</p>
        <button className={styles.buyButton} onClick={handleBuy}>
          Comprar por WhatsApp
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
