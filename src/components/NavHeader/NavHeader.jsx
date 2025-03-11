import { IoIosArrowRoundBack } from 'react-icons/io';
import { FaAngleRight } from "react-icons/fa";
import styles from './NavHeader.module.css';
import { useNavigate } from 'react-router-dom';
import { useCart, useCategories } from '../../store';
import { FaShoppingCart } from "react-icons/fa";

export default function NavHeader({ tabName }) {
    const navigate = useNavigate();
    const { active_cat_id } = useCategories();
    const { openCart, productsInCart } = useCart();
    return (
        <header className="col-12 d-flex p-4 gap-4 align-items-center justify-content-between">
            <div className='d-flex align-items-center gap-4'>
                {active_cat_id != 0 && <IoIosArrowRoundBack className={styles.backBtn} onClick={() => navigate('/orders')} />}
                <div className='d-flex gap-2 align-items-center'>
                    <p className='m-0'>Food & Drinks</p>
                    <FaAngleRight />
                    <p className='m-0'>{tabName}</p>
                </div>
            </div>
            <div className='d-flex align-items-center gap-2'>
                <FaShoppingCart onClick={openCart} />
                <span className='bg-primary p-2 rounded-5'>{
                    productsInCart.reduce((acc, el) => acc + el.qty, 0)
                }</span>
            </div>
        </header>
    )
}
