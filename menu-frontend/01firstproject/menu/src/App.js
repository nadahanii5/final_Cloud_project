import "./App.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Category from "./components/Category";
import ItemsList from "./components/ItemsList";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [itemsData, setItemsData] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  // دالة الإضافة إلى العربة
  const handleAddToCart = async (mealId) => {
    try {
      const res = await axios.post("http://localhost:5000/cart/add", {
        mealId: mealId,
        quantity: 1, // ممكن بعدين تخليها input أو تختارها من drop down
      });

      console.log("تمت الإضافة للعربة:", res.data);
      alert("تمت إضافة المنتج للعربة!");
    } catch (error) {
      console.error("خطأ أثناء إضافة المنتج:", error);
      alert("حصل خطأ، جرب تاني.");
    }
  };

  // باقي كودك زي ما هو بالظبط ...
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/menu/");
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
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filterbyCategory = async (cat) => {
    if (cat === "الكل") {
      fetchItems();
    } else {
      try {
        const res = await axios.get(`http://localhost:5000/menu/${cat}`);
        const data = res.data.map((item) => ({
          id: item._id,
          title: item.name,
          category: item.category,
          price: item.price,
          imgUrl: item.image,
          description: item.description || "وصف غير متوفر",
        }));
        setItemsData(data);
      } catch (error) {
        console.error("Error fetching items by category:", error);
      }
    }
  };

  const filterbySearch = (word) => {
    if (word !== "") {
      const newArr = itemsData.filter((item) => item.title === word);
      setItemsData(newArr);
    }
  };

  return (
    <div className="color-body font">
      <NavBar filterbySearch={filterbySearch} />
      <Container>
        <Header />
        <Category
          filterbyCategory={filterbyCategory}
          allCategory={allCategory}
        />
        <ItemsList itemsData={itemsData} handleAddToCart={handleAddToCart} />
      </Container>
    </div>
  );
}

export default App;
