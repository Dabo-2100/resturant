import { useEffect, useState } from "react";
import styles from "./Invoices.module.css";
import moment from "moment";
import axios from "axios";
import { useCategories, useInvoiceDetails } from "../../store";
import InvoiceDetails from "../../components/InvoiceDetails/InvoiceDetails";
export default function InvoicesPage() {
    const { domain } = useCategories();
    const [invoices, setInvoices] = useState();
    const { index, openDetails, setActiveId } = useInvoiceDetails()


    const getInvoices = () => {
        let url = domain + "/api/invoices";
        axios.get(url, {
            params: { populate: "*" }
        }).then((res) => {
            setInvoices(res.data.data);
            console.log(res.data.data)
        })
    }

    useEffect(() => {
        getInvoices();
        console.log();
    }, [])

    return (
        <div id={styles.invoicesPage} className="d-flex flex-column p-3">
            {index && <InvoiceDetails />}
            <h3>Invoices</h3>
            <input className="form-control" type="date" defaultValue={moment().format().split('T')[0]} max={moment().format().split('T')[0]} />

            {
                invoices && invoices.map((el) => {
                    return (
                        <div key={el.documentId} onClick={() => { openDetails(), setActiveId(el.documentId) }} className="col-12 col-md-6 col-lg-4 rounded border shadow p-3 bg-white d-flex align-items-center justify-content-between">
                            <div className="d-flex flex-column">
                                <h2>Order #{el.id}</h2>
                                <span>{el.pos_user.user_name}</span>
                            </div>
                            <div className="d-flex flex-column">
                                <h3>{el.invoice_total}</h3>
                                <span>{el.createdAt.slice(11, 16)} </span>
                            </div>
                        </div>
                    )
                })
            }


        </div>
    )
}
