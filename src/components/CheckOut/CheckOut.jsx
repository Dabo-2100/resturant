import { useState } from "react";
import { useCart, useCategories } from "../../store";
import styles from "./CheckOut.module.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function CheckOut() {
    const { closeCheckOut, productsInCart, resetCart, closeCart } = useCart();
    const { domain } = useCategories();

    const getTotal = () => {
        return productsInCart.reduce((acc, el) => acc + (el.qty * el.product_price), 0);
    }

    const [customerAmount, setCustomerAmount] = useState();
    const [remain, setRemain] = useState();

    const handleChange = (e) => {
        setCustomerAmount(e.target.value);
        setRemain(+e.target.value - getTotal());
    }

    const handleClose = (e) => {
        e.stopPropagation();
        closeCheckOut();
    }

    const createRecords = (invoiceId) => {

        productsInCart.forEach((el) => {
            let url = domain + "/api/invoices-details";
            let data = {
                product_qty: el.qty,
                invoice: {
                    connect: [invoiceId]
                },
                product: {
                    connect: [el.documentId]
                }
            }
            axios.post(url, { data: data }).then(() => {
                console.log('Record Saved to DB');
            })
        });

        Swal.fire({
            icon: 'success',
            title: "Invoice Sucssfully Saved !",
            timer: 1500
        }).then(() => {
            closeCheckOut();
            resetCart();
            closeCart();

        })

    }

    const createNewInvoice = (total) => {
        let endPoint = "/api/invoices";
        let data = {
            invoice_total: total,
            pos_user: {
                connect: ['i43of042igq83dqpoofe9zid'],
            }
        }
        let url = domain + endPoint;
        axios.post(url,
            { data: data }
        ).then((res) => {
            let newInvoiceId = res.data.data.documentId;
            createRecords(newInvoiceId);
        }).catch((err) => {
            console.log(err);
        })
    }



    const saveInvoice = () => {
        // add fatora to the system with the total
        let total = getTotal();
        createNewInvoice(total);
        // i will user the id of the current user
    }

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div onClick={e => e.stopPropagation()} className="bg-white col-10 col-md-6 col-lg-4 p-3 rounded mt-5 shadow animate__animated animate__fadeInDown" id={styles.content}>
                <p>Checkout</p>
                <h3>Total is : ${getTotal()}</h3>
                <h4>Customer amount :{<input value={customerAmount} onChange={handleChange} className="form-control" type="number" placeholder="Enter Amount Here" />}</h4>
                <h4>Remain : {remain}</h4>
                <button onClick={saveInvoice} className="btn btn-primary col-12" disabled={remain < 0 ? true : false}>Save & Print</button>
            </div>
        </div>
    )
}

