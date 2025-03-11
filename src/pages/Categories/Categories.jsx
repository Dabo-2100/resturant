import NavHeader from "../../components/NavHeader/NavHeader";
import styles from "./Categories.module.css";
import { useCategories } from "../../store";
import { useNavigate } from "react-router-dom";


export default function Categories() {


    const { setActiveId, data: appCategories, domain } = useCategories(); // this is object [Global State]
    const navigate = useNavigate();
    const openCategory = (documentId) => {
        setActiveId(documentId);
        navigate(documentId)
    }

    return (
        <div id={styles.caterogriesPage}>
            
            <NavHeader tabName={"Categories"} />
            <div className="d-flex flex-wrap col-12">
                {
                    appCategories.map((el) => (
                        <div key={el.documentId} className="col-10 col-md-6 col-lg-4 p-3" onClick={() => openCategory(el.documentId)}>
                            <div className={styles.productCard + " rounded-4 shadow border col-12 p-3"}>
                                <img src={domain + el.category_img.url} alt="" />
                                <p key={el.documentId}>{el.category_name}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}






// let domain = "https://www.google.com";
// let endPoint = "/search";
// let queryParams = ""
// ?q=cat
// &oq=google
// &gs_lcrp=EgZjaHJvbWUqBwgAEAAYjwIyBwgAEAAYjwIyBggBEEUYPDIGCAIQRRg8MhMIAxAuGIMBGMcBGLEDGNEDGIAEMgwIBBAjGCcYgAQYigUyBggFEEUYPDIGCAYQRRhBMgYIBxBFGEHSAQgxODQ3ajBqNKgCALACAA
// &sourceid=chrome
// &ie=UTF-8