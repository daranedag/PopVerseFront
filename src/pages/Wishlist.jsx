import React, { useContext, useState, useEffect } from "react";
import CardProduct from "../components/CardProduct";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import SidebarAccount from "../components/SidebarAccount";
import { api } from "../services/api"; 


const Wishlist = ({ darkMode }) => {
    const { token } = useContext(UserContext);
    const [favs, setFavs] = useState([]);
    
    useEffect(() => {
        const wishlistProducts = async () => {
            try {
                const response = await api.get("/favorites", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFavs(response.data.favorites);
            } catch (error) {
                console.error("Error obteniendo favoritos:", error);
            }
        };

        wishlistProducts();
    }, []);

    const removeFromFavorites = (id) => {
        setFavs((prev) => prev.filter((product) => product.id !== id));
    }

    return (
        <div className="container mt-4 d-flex">
            <SidebarAccount activePage="wishlist" darkMode={darkMode} />

            {/* Wishlist Items */}
            <div className="col-md-9 p-3">
                <h1>Wishlist</h1>
                <div className="d-flex row gap-3 justify-content-center">
                    {favs.length > 0 ? (
                        favs.map((product) => (
                            <CardProduct
                                key={product.id}
                                product={product}
                                darkMode={darkMode}
                                removeFromFavorites={removeFromFavorites}
                            />
                        ))
                    ) : (
                        <p>No hay favoritos para el usuario</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wishlist