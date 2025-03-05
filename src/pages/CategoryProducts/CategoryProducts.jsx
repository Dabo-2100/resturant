import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import catImg from "../../assets/imgs/categories/wok.png";

export default function CategoryProducts() {
    const params = useParams();
    const navigate = useNavigate();
    const [check, setCheck] = useState(false);

    const [categories] = useState([
        { name: "Cold Drinks", path: "cold", imgUrl: { catImg }, price: 500 },
        { name: "Burgers", path: "burgers", imgUrl: { catImg }, price: 600 },
        { name: "Pizza", path: "pizza", imgUrl: { catImg }, price: 500 },
        { name: "Wok", path: "wok", imgUrl: { catImg }, price: 600 },
        { name: "Desserts", path: "dessert", imgUrl: { catImg }, price: 650 },
        { name: "Pasta", path: "pasta", imgUrl: { catImg }, price: 500 },
    ]);

    useEffect(() => {
        let obj = categories.find((el) => { return el.path == params.catName });
        if (obj) {
            setCheck(true);
        } else {
            navigate("/error");
        }
        // eslint-disable-next-line
    }, []);
    // console.log(params);
    return (
        check && <div> Products in {params.catName}</div>
    )
}
