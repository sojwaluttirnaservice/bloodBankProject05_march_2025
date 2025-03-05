import React from 'react';

const H1 = ({ children, className = '' }) => (
    <h1 className={`text-4xl font-bold text-gray-900 ${className}`}>{children}</h1>
);

const H2 = ({ children, className = '' }) => (
    <h2 className={`text-3xl font-semibold text-gray-800 ${className}`}>{children}</h2>
);

const H3 = ({ children, className = '' }) => (
    <h3 className={`text-2xl font-medium text-gray-700 ${className}`}>{children}</h3>
);

const H4 = ({ children, className = '' }) => (
    <h4 className={`text-xl font-medium text-gray-600 ${className}`}>{children}</h4>
);

const H5 = ({ children, className = '' }) => (
    <h5 className={`text-lg font-normal text-gray-500 ${className}`}>{children}</h5>
);

const H6 = ({ children, className = '' }) => (
    <h6 className={`text-base font-light text-gray-400 ${className}`}>{children}</h6>
);

export { H1, H2, H3, H4, H5, H6 };
