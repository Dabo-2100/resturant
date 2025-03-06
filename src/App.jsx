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
import { useCategories } from "./store";
export default function App() {
  // to Show SideMenu
  const { data: categories } = useCategories();
  
  let catsRoutes = categories.map((el) => { return "/orders/" + el.path });
  let acceptedRoutes = ["/orders", "/settings", "/bills", "/", ...catsRoutes];

  const [path, setPath] = useState();
  const location = useLocation();
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  return (
    <div className="App col-12 d-flex">
      {acceptedRoutes.includes(path) && <SideMenu />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders/" element={<Categories />} />
        <Route path="/orders/:catName" element={<CategoryProducts />} />
        <Route path="/settings" element={<h1>settings</h1>} />
        <Route path="/bills" element={<h1>Bills</h1>} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="*" element={<h1>404 Page</h1>} />
      </Routes>
    </div>
  )
}
