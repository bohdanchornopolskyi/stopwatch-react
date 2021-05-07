import React from 'react';

import Button from './Button';
import Indicator from './Indicator';

const Stopwatch = () => {
    return (
        <div className='wrapper'>
            <h1 className='heading'>Stopwatch</h1>
            <Indicator time={0} />
            <div className='btn-wrapper'>
                <Button label='Start' />
                <Button label='Stop' />
                <Button label='Reset' />
                <Button label='Wait' />
            </div>
        </div>
    );
};

export default Stopwatch;
