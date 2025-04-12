import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "../assets/css/Login.css";

export default function Register({ darkMode }) {
    // Validation Schema with Yup
    const validationSchema = Yup.object({
        name: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),
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

                    {/* Register Form (Always Visible) */}
                    <div className="flex-grow-1 w-100">
                        <h2 className="text-center mb-4">Crea tu Cuenta</h2>
                        <Formik
                            initialValues={{ name: "", lastName: "", email: "", password: "", confirmPassword: "" }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                console.log("Form Submitted:", values);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="w-100">
                                    <div className="mb-3">
                                        <label className="form-label">Nombre</label>
                                        <Field 
                                            type="text" 
                                            name="name" 
                                            className="form-control"
                                            placeholder="Ingresa tu nombre"
                                        />
                                        <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <Field 
                                            type="email" 
                                            name="email" 
                                            className="form-control"
                                            placeholder="Ingresa tu email"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Contraseña</label>
                                        <Field 
                                            type="password" 
                                            name="password" 
                                            className="form-control"
                                            placeholder="Ingresa tu Contraseña"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                                    </div>

                                    {/* Confirm Password Input */}
                                    <div className="mb-3">
                                        <label className="form-label">Confirma Contraseña</label>
                                        <Field 
                                            type="password" 
                                            name="confirmPassword" 
                                            className="form-control"
                                            placeholder="Confirma tu contraseña"
                                        />
                                        <ErrorMessage name="confirmPassword" component="div" className="text-danger small mt-1" />
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="btn btn-primary w-100"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Registrando..." : "Registrar"}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>

                </div>
            </div>
        </div>
    );
}