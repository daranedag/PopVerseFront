import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


import "../assets/css/Login.css";

export default function Login({ darkMode }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(UserContext)
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || "/"; // Default to home if no redirect path

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await login(email, password); // Perform login
        if (success) {
            navigate(from); // Redirect to the page they tried to access
        } else {
            alert("Credenciales invalidas");
        }
    };

    // Validation Schema with Yup
    const validationSchema = Yup.object({
        email: Yup.string().email("Email invalido").required("Email es requerido"),
        password: Yup.string().min(6, "Contraseña debe ser al menos de 6 caracteres").required("Contraseña es requerida"),
    });

    return (
        <div className={`d-flex justify-content-center align-items-center min-vh-100 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
            <div className="container-md p-4 rounded shadow bg-white">
                
                {/* Image & Form Container */}
                <div className="d-flex flex-column flex-md-row align-items-center">
                    
                    {/* Image Section (Hidden on Mobile) */}
                    <div className="d-none d-md-block flex-shrink-0 me-4">
                        <img className="img-fluid" style={{ maxWidth: "660px" }} alt="iron man" src="/login.png" />
                    </div>

                    {/* Login Form (Always Visible) */}
                    <div className="flex-grow-1 w-100">
                        <h2 className="text-center mb-4">Pop Verse</h2>
                        <Formik
                            initialValues={{ email: "", password: "", rememberMe: false }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                const success = await login(values.email, values.password);
                                if (success) {
                                    navigate(from);
                                } else {
                                    alert("Credenciales invalidas");
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="w-100">
                                    {/* Email Input */}
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <Field 
                                            type="email" 
                                            name="email" 
                                            className="form-control"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                                    </div>

                                    {/* Password Input */}
                                    <div className="mb-3">
                                        <label className="form-label">Contraseña</label>
                                        <Field 
                                            type="password" 
                                            name="password" 
                                            className="form-control"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                                    </div>

                                    {/* Login Button */}
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary w-100"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Iniciando sesion" : "Login"}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                        {/* Link to Register */}
                        <div className="text-center mt-3">
                            <p>
                                Si no esta registrado, <a href="/register" className="text-primary">click aqui</a>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}