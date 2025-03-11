import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import NavHeader from "../../components/NavHeader/NavHeader";
import { useCategories } from "../../store";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";

export default function CategoryProducts() {
    const parmas = useParams();
    const { resetActiveId, domain } = useCategories();
    const navigate = useNavigate();
    const [check, setCheck] = useState(true);
    const [categoryInfo, setCategoryInfo] = useState({});

    useEffect(() => {
        let documentId = parmas.id;
        let endPoint = `/api/categories/${documentId}`;
        let url = domain + endPoint;
        axios.get(url, {
            params: {
                populate: {
                    products: {
                        populate: "*"
                    }
                } // populate all category Data
            }
        }).then((res) => {
            console.log(res.data.data);
            setCategoryInfo(res.data.data);
            setCheck(true);
        }).catch(() => {
            navigate('/error');
        })

        return () => {
            // i will execute After Componenet UnMOunt
            resetActiveId();
        }
        // eslint-disable-next-line
    }, []);
    // console.log(params);
    return (
        check &&
        <div className="flex-grow-1">
            <NavHeader tabName={categoryInfo.category_name} />
            <h1>Products in Cat : {categoryInfo.category_name}</h1>
            <div className="col-12 d-flex flex-wrap">
                {
                    categoryInfo.products && categoryInfo.products.map((el) => {
                        return (
                            <ProductCard
                                key={el.documentId}
                                name={el.product_name}
                                price={el.product_price}
                                imgUrl={domain + el.product_img.url}
                                product={el}
                            />
                        )
                    })
                }
                {
                    categoryInfo.products && categoryInfo.products.length == 0 && <h1>There are no products</h1>
                }
            </div>
        </div>
    )
}
