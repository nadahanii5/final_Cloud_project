import "./App.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useCart } from './Context/CartContext';
import { useAuth } from './Context/AuthContext';
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home"; // استيراد صفحة الهوم

function App() {
  const [itemsData, setItemsData] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (mealId) => {
    if (!user) {
      alert("يجب تسجيل الدخول أولاً لإضافة منتجات إلى السلة");
      navigate("/login");
      return;
    }
    const item = itemsData.find((item) => item.id === mealId);
    if (item) {
      addToCart(item);
      alert("تمت إضافة المنتج للعربة!");
    }
  };

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/menu/");
      const data = res.data.map((item) => ({
        id: item._id,
        title: item.name,
        category: item.category,
        price: item.price,
        imgUrl: item.image,
        description: item.description || "وصف غير متوفر",
      }));
      setItemsData(data);
      const uniqueCats = ["الكل", ...new Set(data.map((i) => i.category))];
      setAllCategory(uniqueCats);
    } catch (error) {
      setError("حدث خطأ أثناء جلب البيانات");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filterbyCategory = async (cat) => {
    setLoading(true);
    try {
      if (cat === "الكل") {
        await fetchItems();
      } else {
        const res = await axios.get(`http://localhost:8000/menu/${cat}`);
        const data = res.data.map((item) => ({
          id: item._id,
          title: item.name,
          category: item.category,
          price: item.price,
          imgUrl: item.image,
          description: item.description || "وصف غير متوفر",
        }));
        setItemsData(data);
      }
    } catch (error) {
      setError("حدث خطأ أثناء تصفية البيانات حسب الفئة");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterbySearch = (word) => {
    if (word !== "") {
      const newArr = itemsData.filter((item) =>
        item.title.toLowerCase().includes(word.toLowerCase())
      );
      setItemsData(newArr);
    } else {
      fetchItems();
    }
  };

  if (loading) return <div className="loading">جاري التحميل...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="color-body font">
      <NavBar filterbySearch={filterbySearch} user={user} />
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <Home
                filterbyCategory={filterbyCategory}
                allCategory={allCategory}
                itemsData={itemsData}
                handleAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/category/:cat"
            element={
              <Home
                filterbyCategory={filterbyCategory}
                allCategory={allCategory}
                itemsData={itemsData}
                handleAddToCart={handleAddToCart}
              />
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
