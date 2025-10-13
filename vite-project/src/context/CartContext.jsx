import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

// Create context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(true);

    // Load cart from backend on mount (if user is logged in)
    useEffect(() => {
        const fetchCart = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get("/api/cart");
                if (res.data && res.data.products) {
                    setCart(res.data.products);
                    setCartCount(res.data.products.length);
                }
            } catch (err) {
                console.error("Failed to fetch cart:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    // Add product to cart
    const addToCart = async (productId, quantity) => {
        if (!user) {
            navigate("/login");
            return;
        }

        const existingProductIndex = cart.findIndex(item => item.productId === productId);

        let updatedCart;

        if (existingProductIndex !== -1) {
            updatedCart = cart.map((item, index) =>
                index === existingProductIndex
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            updatedCart = [...cart, { productId, quantity }];
        }

        setCart(updatedCart);
        setCartCount(updatedCart.length);

        try {
            await toast.promise(
                axios.post(`/product/addToCart`, { cart: updatedCart }),
                {
                    loading: "Adding to Cart...",
                    success: existingProductIndex !== -1 ? "Quantity updated!" : "Added to cart!",
                    error: "Failed to Add to Cart ❌",
                }
            );
        } catch (err) {
            console.error("Failed to update cart on backend:", err);
        }
    };

    // Remove product from cart
    const removeFromCart = async (productId) => {
        setCart((prev) => prev.filter((item) => item._id !== productId));
        setCartCount((prev) => Math.max(prev - 1, 0));

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await axios.post(
                "/api/cart/remove",
                { productId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (err) {
            console.error("Failed to remove from cart on backend:", err);
        }
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, cartCount, loading }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook for easier access
export const useCart = () => useContext(CartContext);