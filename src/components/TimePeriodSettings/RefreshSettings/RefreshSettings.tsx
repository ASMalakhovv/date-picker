import React from 'react';
import s from './RefreshSettings.module.scss'

type TimeValues = 'seconds' | 'minutes' | 'hours'

export const RefreshSettings = React.memo(() => {
    const timeValues: TimeValues[] = ['seconds', 'minutes', 'hours']
    const timeOptions = timeValues.map((t: TimeValues, i: number) => <option key={i}>{t}</option>)

    return (
        <div className={s.refreshSettingBlock}>
            <input type='number'/>
            <select>
                {timeOptions}
            </select>
            <button>Start</button>
        </div>
    );
});

