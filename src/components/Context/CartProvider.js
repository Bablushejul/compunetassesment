import React, { useEffect, useRef, useState } from "react";
import CartContext from "./CartContext";

async function getUserCart(emailID) {
  const modifiedEmail = emailID.replace(/[.@]/g, "");
  const response = await fetch(
    `https://compunetassignment-default-rtdb.firebaseio.com/ecommerce/${modifiedEmail}/cart.json`
  );
  const result = await response.json();
  return result.orderList;
}

async function updateUserCart(emailID, data) {
  const modifiedEmail = emailID.replace(/[.@]/g, "");
  const response = await fetch(
    `https://compunetassignment-default-rtdb.firebaseio.com/ecommerce/${modifiedEmail}/cart.json`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderList: data }),
    }
  );
  const result = await response.json();
  return result;
}

const productsArr = [
  {
    id: "p1",
    title: "Mens formal Shirt",
    description:
      "The Slim And fit,comfort to feel.",
    price: 999.99,
    brand: "Clavin klein",
    color: "Sky Blue",
    size: "All Sizes Are Available",
    imageSrc:
      "https://plus.unsplash.com/premium_photo-1682430259342-427ec43ebc38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    reviews: [
      {
        id: 1,
        title: "Great wear!",
        comment:
          "I love this product very comfort to wear .",
        rating: 5,
        author: "Jane Doe",
        date: "2022-03-01",
      },
      {
        id: 2,
        title: "Details",
        comment:
          "cotton linen ,pure cotton,streachible.",
        rating: 2,
        author: "John Smith",
        date: "2022-02-15",
      },
    ],
  },
  {
    id: "p2",
    title: "Casual shirt",
    description: "Men Regular Fit Striped Mandarin Collar Casual Shirt",
    price: 1099.99,
    brand: "Raymond",
    color: "pink",
    size: "All sizes Available",
    imageSrc:
      "https://5.imimg.com/data5/TJ/ML/GI/SELLER-23627912/men-shirt-1000x1000.jpg",
    reviews: [
      {
        id: 1,
        title: "Amazing shirt!",
        comment:
          "I love this product very comfort to wear .",
        rating: 5,
        author: "Samantha Jones",
        date: "2022-01-28",
      },
      {
        id: 2,
        title: "Details",
        comment:
          "mix cotton.",
        rating: 3,
        author: "Peter Parker",
        date: "2022-01-10",
      },
    ],
  },
];

const CartProvider = (props) => {
  const cartUpdateid = useRef("");
  const userIdToken = localStorage.getItem("idToken");
  const email = localStorage.getItem("email");
  const userLogedIn = !!userIdToken;
  const [cartVisibility, setCartVisibility] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [signInModalVisibility, setSignInModalVisibility] = useState(false);
  const [idToken, setIdToken] = useState(userIdToken);
  const [isLogedIn, setIsLogedIn] = useState(userLogedIn);
  const [userEmail, setUserEmail] = useState(email);

  
  useEffect(() => {
    if (isLogedIn) {
      setTimeout(() => {
        localStorage.removeItem("idToken");
        localStorage.removeItem("email");
      }, 5 * 60 * 1000);
      // return clearTimeout(timer);
    }
  }, [isLogedIn]);

  useEffect(() => {
    if (isLogedIn) {
      getUserCart(userEmail).then((data) => {
        setOrderList(data);
      });
    }
  }, [isLogedIn, userEmail]);

  useEffect(() => {
    if (orderList)
      if (isLogedIn && userEmail) {
        updateUserCart(userEmail, orderList).then((data) => console.log(data));
      }
  }, [orderList, userEmail, isLogedIn]);

  const ctxObj = {
    productsList: productsArr,
    cartVisibility: cartVisibility,
    setCartVisibility: setCartVisibility,
    orderList: orderList,
    setOrderList: setOrderList,
    isLogedIn: isLogedIn,
    setIsLogedIn: setIsLogedIn,
    idToken: idToken,
    setIdToken: setIdToken,
    signInModalVisibility: signInModalVisibility,
    setSignInModalVisibility: setSignInModalVisibility,
    userEmail: userEmail,
    setUserEmail: setUserEmail,
    cartUpdateid: cartUpdateid.current,
  };
  return (
    <CartContext.Provider value={ctxObj}>{props.children}</CartContext.Provider>
  );
};

export default CartProvider;
