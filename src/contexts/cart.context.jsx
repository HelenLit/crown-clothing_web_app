import {createContext, useState, useEffect} from "react";

const getExistingCartItem = (cartItems, cartItemToExist) => {
    return cartItems.find(
        (cartItem) => cartItem.id === cartItemToExist.id
    );
};

const addCartItem = (cartItems, productToAdd) => {
    if (getExistingCartItem(cartItems, productToAdd)) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        );
    }
    else
        return [...cartItems, {...productToAdd, quantity: 1}];
};

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = getExistingCartItem(cartItems, cartItemToRemove);
    if (existingCartItem.quantity === 1){
        return clearCartItem(cartItems, cartItemToRemove);
    }
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
    );
};


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        setCartCount(cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0));
        }, [cartItems]);

    useEffect(() => {
        setCartTotal(cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0));
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }
    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}