import React from 'react';
import s from './Button.module.scss'

type PropsType = {
    callOnRefresh: () => void
}

export const Button = React.memo(({callOnRefresh, ...props}: PropsType) => {
    return (
        <div className={s.button}>
            <button onClick={callOnRefresh}>Refresh</button>
        </div>
    );
});

