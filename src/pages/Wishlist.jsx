import React, { useContext, useState, useEffect } from "react";
import CardWishlistItem from "../components/CardWishlistItem";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { api } from "../services/api"; 


const Wishlist = () => {
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
                console.error("Error fetching products:", error);
            }
        };

        wishlistProducts();
    }, []);

    return (
        <div className="container mt-4 d-flex">
            {/* Sidebar Menu */}
            <div className="col-md-3 p-3 border-end">
                <h4>Mi Cuenta</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/editProfile" className="text-decoration-none">Editar Perfil</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/orderHistory" className="text-decoration-none">Historial de Órdenes</Link>
                    </li>
                    <li className="list-group-item active">
                        <Link to="/wishlist" className="text-decoration-none text-white">Wishlist</Link>
                    </li>
                </ul>
            </div>

            {/* Wishlist Items */}
            <div className="col-md-9 p-3">
                <h1>Wishlist</h1>
                <div className="d-flex flex-column gap-3">
                    {favs.length > 0 ? (
                        favs.map((product) => (
                            <CardWishlistItem
                                key={product.id}
                                product={product}
                                darkMode={false}
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