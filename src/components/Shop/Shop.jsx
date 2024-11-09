import { useEffect, useState } from "react";
import Data from "../ShopData/Data";
import CartDetails from "../CartDetails/Details";
const Shop = () => {
  const [myproducts, setMyProducts] = useState([]);

  useEffect(() => {
    const existingProducts = JSON.parse(localStorage.getItem("cart")) || [];
    setMyProducts(existingProducts);
  }, []);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      count: 1,
    };
    const updatedProducts = [...myproducts, newProduct];
    setMyProducts(updatedProducts);
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
  };

  return (
    <>
      <section className="py-12 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-blue-800 mb-12">
            Welcome to My Shop
          </h1>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Data.map((item, key) => (
              <div
                key={key}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="mt-4">
                  <h2 className="text-xl font-semibold text-blue-800">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 mt-1">{item.desc}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-blue-700">
                      ${item.price}
                    </span>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
                      onClick={() => addProduct(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {myproducts.length > 0 && <CartDetails cartData={myproducts} />}
    </>
  );
};

export default Shop;
