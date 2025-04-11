import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import "../assets/css/CardProduct.css";

export default function CardProduct({ product, darkMode }) {
    const { addToCart } = useCart();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`card custom-card border-0 rounded-4 p-3 d-flex flex-column ${ darkMode ? "bg-dark text-white card-shadow-light" : "bg-white text-dark"}`} style={{ width: "250px", height: isMobile ? "370px" : "420px",}}>
            {/* Wishlist Heart */}
            <div className="position-absolute top-0 end-0 p-2">
                <button className="btn border-0 p-0">
                <i className={`bi bi-heart fs-4 ${darkMode ? "text-white" : "text-dark"}`}></i>
                </button>
            </div>

            {/* Imagen */}
            <div className="text-center mb-3" style={{ height: "180px" }}>
                <img src={product.image_url} alt={product.name} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} className="rounded-3"/>
            </div>

            {/* Contenido con botón abajo */}
            <div className="d-flex flex-column justify-content-between flex-grow-1">
                <div className="text-center">
                    <h6 className="text-uppercase fw-light fs-6 text-truncate">{product.category}</h6>
                    <h5 className="fw-bold fs-6"
                        style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            minHeight: "3rem",
                        }}
                    >
                        {product.name}
                    </h5>
                    <p className="fs-6 fw-bold mb-3">${product.price}</p>
                </div>

                <button
                    onClick={() => addToCart(product)}
                    className="btn fw-bold w-100 btn-primary text-white"
                    style={{ height: "42px" }}
                >
                    Añadir al Carro
                </button>
            </div>
        </div>
    );
}