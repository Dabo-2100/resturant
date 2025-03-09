import styles from "./ProductCard.module.css"
export default function ProductCard() {
    return (
        <div className="col-12 col-md-6 col-lg-4 p-3">
            <div className={`shadow rounded border p-3 col-12 d-flex flex-column ${styles.card}`}>
                <img />
                <h2>Product Name</h2>
                <span>Product weight</span>
                <p>$ Product Price</p>
                <button className="btn btn-primary">Add To Cart</button>
            </div>
        </div>
    )
}

// Tables 
// App User ( Cashier ) 
// Strapi User ( Admins ) Super , Admin , 
// API