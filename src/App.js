import { useState, useEffect } from 'react';
import { Subject, Observable, fromEvent } from 'rxjs';
import { map, buffer, debounceTime, filter, takeUntil } from 'rxjs/operators';

import Stopwatch from './components/Stopwatch';

function App() {
    const [time, setTime] = useState(0);
    const [watch, setWatch] = useState(false);
    const [button, setButton] = useState('Start');
    const [doubleClick, setDoubleClick] = useState(false);

    useEffect(() => {
        let click$ = null;
        if (document.getElementById('wait')) {
            click$ = fromEvent(document.getElementById('wait'), 'click');
        }

        const doubleClick$ = click$.pipe(
            buffer(click$.pipe(debounceTime(300))),
            map((list) => list.length),
            filter((value) => value >= 2)
        );

        doubleClick$.subscribe((e) => {
            setDoubleClick(true);
        });

        !watch ? setButton('Start') : setButton('Stop');

        const timer$ = new Observable((observer) => {
            let count = 0;
            const intervalId = setInterval(() => {
                observer.next((count += 1));
            }, 1000);

            return () => {
                clearInterval(intervalId);
            };
        });

        const unsubscribe$ = new Subject();
        const subscribtion$ = timer$.pipe(takeUntil(unsubscribe$)).subscribe({
            next: () => {
                if (watch) {
                    setTime((prev) => prev + 1);
                }
            },
        });

        return () => {
            subscribtion$.unsubscribe();
        };
    }, [watch]);

    const handleStart = () => {
        setWatch((prevState) => !prevState);
        if (button === 'Stop') {
            setTime(0);
        }
    };
    const handleWait = () => {
        if (time !== 0 && doubleClick) {
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
