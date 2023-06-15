import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto py-8">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-8 md:mb-0">
                        <h4 className="text-xl font-bold mb-4">About Us</h4>
                        <p className="text-gray-300">
                            Welcome to our ecommerce store! We are passionate about providing high-quality products and exceptional customer service. Our mission is to make online shopping a seamless and enjoyable experience for our valued customers.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 mb-8 md:mb-0">
                        <h4 className="text-xl font-bold mb-4">Customer Service</h4>
                        <ul className="text-gray-300">
                            <li>
                                <NavLink to="/contact" className="hover:text-white">
                                    Contact Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/faqs" className="hover:text-white">
                                    FAQs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/shipping" className="hover:text-white">
                                    Shipping & Returns
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/privacy" className="hover:text-white">
                                    Privacy Policy
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h4 className="text-xl font-bold mb-4">Connect with Us</h4>
                        <ul className="text-gray-300 flex space-x-4">
                            <li>
                                {/* <a href="#" className="hover:text-white"> */}
                                <i className='bx bxl-facebook bx-sm'></i>
                                {/* </a> */}
                            </li>
                            <li>
                                {/* <a href="#" className="hover:text-white"> */}
                                <i className='bx bxl-twitter bx-sm'  ></i>
                                {/* </a> */}
                            </li>
                            <li>
                                {/* <a href="#" className="hover:text-white"> */}
                                <i className='bx bxl-instagram bx-sm'></i>
                                {/* </a> */}
                            </li>
                            <li>
                                {/* <a href="#" className="hover:text-white"> */}
                                <i className='bx bxl-pinterest-alt bx-sm' ></i>
                                {/* </a> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 py-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center flex-wrap">
                        <p className="text-gray-300 mb-4 md:mb-0">&copy; 2023 Your Ecommerce Website. All rights reserved.</p>
                        <ul className="text-gray-300 flex space-x-4">
                            <li>
                                <NavLink to="/terms" className="hover:text-white">
                                    Terms of Service
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/privacy" className="hover:text-white">
                                    Privacy Policy
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/cookie" className="hover:text-white">
                                    Cookie Policy
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
