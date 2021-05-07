import { useState, useEffect } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import Stopwatch from './components/Stopwatch';

function App() {
    const [time, setTime] = useState(0);
    const [watch, setWatch] = useState(false);
    const [button, setButton] = useState('Start');

    useEffect(() => {
        !watch ? setButton('Start') : setButton('Stop');

        const unsubscribe$ = new Subject();
        interval(1000)
            .pipe(takeUntil(unsubscribe$))
            .subscribe(() => {
                if (watch) {
                    setTime((val) => val + 1);
                }
            });
        return () => {
            unsubscribe$.next();
            unsubscribe$.complete();
        };
    }, [watch]);

    const handleStart = () => {
        setWatch((prevState) => !prevState);
        if (button === 'Stop') {
            setTime(0);
        }
    };
    const handleWait = () => {
        if (time !== 0) {
            setWatch(false);
        }
    };
    const handleReset = () => {
        if (button === 'Start' && time !== 0) {
            setTime(0);
        } else {
            setTime(0);
            setWatch(true);
        }
    };

    const buttonHandlers = { handleStart, handleWait, handleReset };

    return <Stopwatch time={time} label={button} buttonHandlers={buttonHandlers} />;
}

export default App;
