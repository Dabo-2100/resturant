import styles from "./SideMenu.module.css";
import { PiCashRegisterDuotone } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";
import { HiDocumentCurrencyDollar } from "react-icons/hi2";
import { VscSettings } from "react-icons/vsc";
import { FaBurger } from "react-icons/fa6";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
export default function SideMenu() {
    const navigate = useNavigate();
    const [links] = useState([
        { id: 1, name: "Dashboard", icon: <MdDashboard />, path: "/" },
        { id: 2, name: "Food and Drinks", icon: <FaBurger />, path: "/orders" },
        { id: 3, name: "Bills", icon: <HiDocumentCurrencyDollar />, path: "/bills" },
        { id: 4, name: "Settings", icon: <VscSettings />, path: "/settings" },
    ]);
    const hanldeLogout = () => { navigate('/login') }

    return (
        <div className="d-flex flex-column border-end px-3 pb-5 justify-content-between" id={styles.SideMenu}>
            <div className="col-12 d-flex flex-column gap-2">
                <div className="col-12 d-flex align-items-center gap-2 py-3">
                    <PiCashRegisterDuotone className={styles.icon} />
                    <p className="m-0 fs-4">Smart<span id={styles.logo}>POS</span></p>
                </div>
                {
                    links.map((el) => {
                        return (
                            <Link to={el.path} key={el.id} className={"col-12 nav-link px-3 d-flex gap-2 align-items-center " + styles.link + " "} >
                                {el.icon}
                                <p className="m-0">{el.name}</p>
                            </Link>
                        )
                    })
                }
            </div>

            <div className="col-12 d-flex flex-column align-items-center">
                <FaUserCircle className="fs-3" />
                <img id={styles.userImg} />
                <h5>User Name</h5>
                <p>User Role</p>
                <button className="btn btn-primary" onClick={hanldeLogout}>Logout</button>
            </div>
        </div>
    )
}
