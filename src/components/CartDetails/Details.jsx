import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

const CartDetails = ({ cartData }) => {
  const [cart, setCart] = useState(cartData);
const [showemptymessage, setShowEmptyMessage] = useState(false)
  useEffect(() => {
    setCart(cartData);
  }, [cartData]);

  const delItem = (key) => {
    const updatedCartData = [...cart];
    updatedCartData.splice(key, 1);
    localStorage.setItem("cart", JSON.stringify(updatedCartData));
    setCart(updatedCartData);
    if (updatedCartData.length === 0) {
        setShowEmptyMessage(true)
        setTimeout(() => {
            setShowEmptyMessage(false)
        }, 3000);
    }
  };

  const calculatedTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };
if(!showemptymessage && cart.length === 0 )return null
  return (
    <div className="p-8 bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Your Cart</h1>
      {showemptymessage &&(
    <p className="text-red-400 font-semibold text-center">"Your box is empty"</p>
      )}
      <div className="space-y-6">
        {cart.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-white shadow-md p-4 rounded-lg transition duration-300 hover:shadow-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <button
              className="text-red-500 hover:text-red-600 transition duration-200"
              onClick={() => delItem(index)}
            >
              <AiFillDelete size={24} />
            </button>
          </div>
        ))}
      </div>
      <p className="text-xl font-semibold text-gray-800 mt-8 text-right">
        Total Price: <span className="text-blue-700">${calculatedTotal().toFixed(2)}</span>
      </p>
    </div>
  );
};

export default CartDetails;
