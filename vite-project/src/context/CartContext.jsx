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

    useEffect(() => {
        const fetchCart = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get("/users/cartData");
                if (res.data && res.data.cart) {
                    setCart(res.data.cart.items);
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
    const addToCart = async (product, quantity) => {
        if (!user) {
            navigate("/login");
            return;
        }

        const cartData = {
            productId: product._id,
            productName: product.productName,
            unitPrice: product.unitPrice,
            minimumOrderQuantity: product.minimumOrderQuantity,
            taxRate: product.taxRate,
            taxType: product.taxType,
            mainImage: product.mainImage,
            quantity
        }

        try {
            await toast.promise(
                axios.post(`/product/addToCart`, { cart: cartData }),
                {
                    loading: "Adding to Cart...",
                    success: "Added to cart!",
                    error: "Failed to Add to Cart ❌",
                }
            ).then((response) => {
                if (response.status === 200) {
                    setCart(response.data.cart.items);
                }
            })
                .catch((error) => {
                    console.error("Error updating product:", error);
                });
        } catch (err) {
            console.error("Failed to update cart on backend:", err);
        }
    };

    // Remove product from cart
    const removeFromCart = async (productId) => {
        try {
            await toast.promise(
                axios.post(`/product/removeFromCart`, { productId }),
                {
                    loading: "Removing from Cart...",
                    success: "Removed!",
                    error: "Failed to remove from Cart ❌",
                }
            ).then((response) => {
                if (response.status === 200) {
                    setCart(response.data.cart.items);
                }
            })
                .catch((error) => {
                    console.error("Error updating product:", error);
                });
        } catch (err) {
            console.error("Failed to remove from cart on backend:", err);
        }
    };

    return (
        <CartContext.Provider
            value={{ cart, setCart, addToCart, removeFromCart, cartCount, loading }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook for easier access
export const useCart = () => useContext(CartContext);