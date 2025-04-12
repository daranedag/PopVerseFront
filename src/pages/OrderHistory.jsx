import React, { useState, useEffect, useContext } from "react";
import Order from "../components/Order"; // Import the Order component
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { api } from "../services/api";

const OrderHistory = () => {
    const { token } = useContext(UserContext)
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get("/orders", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchOrders();
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
                    <li className="list-group-item active">
                        <Link to="/orderHistory" className="text-decoration-none text-white">Historial de Órdenes</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/wishlist" className="text-decoration-none">Wishlist</Link>
                    </li>
                </ul>
            </div>
            <div className="col-md-9 p-3">
                <h1>Historial de compras</h1>
                <div className="d-flex flex-column gap-3">
                    {orders.length > 0 ? (
                        orders.map((order) => <Order key={order.id} order={order} />)
                    ) : (
                        <p>No hay compras realizadas.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
