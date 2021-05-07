import React from 'react';

const Button = ({ label, onClick }) => {
    return (
        <div onClick={onClick} className='button'>
            <span>{label}</span>
        </div>
    );
};

export default Button;
