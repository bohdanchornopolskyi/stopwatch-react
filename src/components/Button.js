import React from 'react';

const Button = ({ label, onClick, id }) => {
    return (
        <button id={id ? id : ''} onClick={onClick} className='button'>
            <span>{label}</span>
        </button>
    );
};

export default Button;
