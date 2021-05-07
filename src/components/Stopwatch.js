import React from 'react';

import Button from './Button';
import Indicator from './Indicator';

const Stopwatch = ({ label, time, buttonHandlers }) => {
    return (
        <div className='wrapper'>
            <h1 className='heading'>Stopwatch</h1>
            <Indicator time={time} />
            <div className='btn-wrapper'>
                <Button onClick={buttonHandlers.handleStart} label={label} />
                <Button onClick={buttonHandlers.handleReset} label='Reset' />
                <Button onClick={buttonHandlers.handleWait} label='Wait' />
            </div>
        </div>
    );
};

export default Stopwatch;
