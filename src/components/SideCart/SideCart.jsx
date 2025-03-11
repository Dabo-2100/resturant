import { useEffect, useState } from "react";
import { useCart } from "../../store";
import styles from "./SideCart.module.css";
import Swal from "sweetalert2";
import CheckOut from "../CheckOut/CheckOut";
export default function SideCart() {
    const { closeCart, productsInCart, decrementQty, incrementQty, resetCart, checkOutIndex, openCheckOut } = useCart();
    const [total, setTotal] = useState(0);
    const handleReset = () => {
        Swal.fire({
            icon: "question",
            title: "Are you Sure ?",
            text: "You are going to delete all products in cart",
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonText: "Yes Reset"
        }).then((res) => {
            if (res.isConfirmed) {
                resetCart();
            }
        })
    }

    useEffect(() => {
        let newTotal = productsInCart.reduce((acc, el) => acc + (el.qty * el.product_price), 0);
        setTotal(newTotal);
    }, [productsInCart]);


    return (
        <div className={styles.overlay} onClick={closeCart}>

            <div onClick={(e) => e.stopPropagation()} id={styles.content} className="p-3 d-flex flex-column animate__animated animate__fadeInRight">
                {
                    productsInCart.length > 0 ? (<div className="d-flex flex-column">
                        <p>Your Cart</p>
                        <table className="table table-dark table-bordered">
                            <thead>
                                <tr>
                                    <th>-</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsInCart.map((el, index) => {
                                    return (
                                        <tr key={el.documentId}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <img src={el.product_img} alt="" />
                                                    <p className="m-0">{el.product_name}</p>
                                                </div>
                                            </td>
                                            <td> $ {el.product_price}</td>
                                            <td>
                                                <div className="d-flex align-items-center justify-content-center gap-2">
                                                    <button className="btn btn-danger" onClick={() => decrementQty(el.documentId)}>-</button>
                                                    <p className="m-0">{el.qty}</p>
                                                    <button className="btn btn-success" onClick={() => incrementQty(el.documentId)}>+</button>
                                                </div>
                                            </td>
                                            <td>$ {el.qty * el.product_price}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={4}>Total</td>
                                    <td colSpan={1}>$ {total}</td>
                                </tr>
                            </tfoot>
                        </table>
                        <button className="btn btn-danger" onClick={handleReset}>Reset Cart</button>
                        <button className="btn btn-primary" onClick={openCheckOut}>CheckOut</button>

                    </div>) : <p>There are No Products in Cart</p>
                }



            </div>

            {checkOutIndex && <CheckOut />}
        </div>
    )
}
