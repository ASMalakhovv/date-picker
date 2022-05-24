import React from 'react';

type PropsType = {
    callOnRefresh: () => void
}

export const Button = React.memo(({callOnRefresh, ...props}: PropsType) => {
    return (
        <div>
            <button onClick={callOnRefresh}>Refresh</button>
        </div>
    );
});

