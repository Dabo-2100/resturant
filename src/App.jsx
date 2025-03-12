// useEffect , useNavigate , useState , useLocation
// Routes (Router)
// Main Layout
// Main Components 
// rfc => React function component
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import SideMenu from "./components/SideMenu/SideMenu";
import { useEffect, useState } from "react";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";
import Categories from "./pages/Categories/Categories";
import { useCart, useCategories } from "./store";
import axios from "axios";
import Swal from "sweetalert2";
import SideCart from "./components/SideCart/SideCart";
import InvoicesPage from "./pages/Invoices/Invoices";
export default function App() {
  // to Show SideMenu
  const [acceptedRoutes, setAceptedRoutes] = useState(["/orders", "/settings", "/invoices", "/"]);
  const { domain, setData } = useCategories();
  const [path, setPath] = useState();
  const { cartIndex } = useCart();
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    let url = domain + "/api/categories";
    axios.get(url, { params: { populate: "*" } }).then((res) => {
      let cats = res.data.data;
      let routes = cats.map(el => '/orders/' + el.documentId);
      let newArr = [...acceptedRoutes, ...routes]
      setAceptedRoutes(newArr);
      setData(cats);
    }).catch((err) => {
      if (err.code == "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "Network Error"
        })
      }
    })
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App col-12 d-flex">
      {cartIndex && <SideCart />}
      {acceptedRoutes.includes(path) && <SideMenu />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders/" element={<Categories />} />
        <Route path="/orders/:id" element={<CategoryProducts />} />
        <Route path="/settings" element={<h1>settings</h1>} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="*" element={<h1>404 Page</h1>} />
      </Routes>
    </div>
  )
}