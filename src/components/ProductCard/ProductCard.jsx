import { useCart } from "../../store";
import styles from "./ProductCard.module.css"
export default function ProductCard({ name, price, imgUrl, product }) {

    const { addToCart } = useCart();

    const handleAdd = () => {
        let obj = {
            documentId: product.documentId,
            product_name: product.product_name,
            product_price: product.product_price,
            qty: 1,
            product_img: imgUrl
        };
        addToCart(obj);
        // console.log(obj);

    }
    return (
        <div className="col-12 col-md-6 col-lg-3 p-3">
            <div className={` col-12 shadow rounded border p-3 col-12 d-flex flex-column ${styles.card}`}>
                <img src={imgUrl} />
                <h2>{name}</h2>
                <p>$ {price}</p>
                <button className="btn btn-primary" onClick={handleAdd}>Add To Cart</button>
            </div>
        </div>
    )
}

// Tables
// App User ( Cashier )
// Strapi User ( Admins ) Super , Admin ,
// API