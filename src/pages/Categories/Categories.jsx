import NavHeader from "../../components/NavHeader/NavHeader";
import styles from "./Categories.module.css";
import { useCategories } from "../../store";
import { useNavigate } from "react-router-dom";
export default function Categories() {
    const { data: appCategories, setActiveId } = useCategories(); // this is object [Global State]
    const navigate = useNavigate();

    const openCategory = (path, cat_id) => {
        setActiveId(cat_id);
        navigate(path)
    }

    return (
        <div id={styles.caterogriesPage}>
            <NavHeader tabName={"Categories"} />
            <div className="d-flex flex-wrap col-12">
                {
                    appCategories.map((el) => (
                        <div key={el.documentId} className="col-10 col-md-6 col-lg-4 p-3" onClick={() => openCategory(el.path, el.documentId)}>
                            <div className={styles.productCard + " rounded-4 shadow border col-12 p-3"}>
                                <img src={el.imgUrl} alt="" />
                                <p key={el.documentId}>{el.name}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
