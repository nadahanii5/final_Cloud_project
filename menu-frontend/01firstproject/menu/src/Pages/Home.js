import React from 'react';
import Category from "../components/Category";
import ItemsList from "../components/ItemsList";

const Home = ({ filterbyCategory, allCategory, itemsData, handleAddToCart }) => {
  return (
    <div>
      <Category
        filterbyCategory={filterbyCategory}
        allCategory={allCategory}
      />
      <ItemsList
        itemsData={itemsData}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Home;
