import React, {useCallback, useState} from 'react';
import s from './App.module.scss';
import {DatePicker, ParametersTime} from '../components/DatePicker/DatePicker';

//types
export type Period = 'Last' | 'Next'
export type UnitTime = 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'

export const App = React.memo(() => {

    //data
    const parametersTime: ParametersTime = {period: 'Last', time: 30, unitTime: 'minutes'}

    //hooks
    const [start, setStart] = useState<ParametersTime>(parametersTime);
    const [end, setEnd] = useState<ParametersTime>('now');
    const [refreshInterval, setRefreshInterval] = useState<number>(0);

    //callbacks
    const onTimeChange = useCallback((start: ParametersTime, end: ParametersTime) => {
        setStart(start)
        setEnd(end)
    }, [])
    const onRefresh = useCallback((start: string, end: string, refreshTime: number) => {
        return new Promise(resolve => {
            setTimeout(resolve, 100);
        }).then(() => {
            console.log(start, end, refreshTime);
        });
    }, [])

    return (
        <div className={s.app}>
            <DatePicker
                start={start}
                end={end}
                onTimeChange={onTimeChange}
                onRefresh={onRefresh}
                refreshInterval={refreshInterval}
                setRefreshInterval={setRefreshInterval}
            />
        </div>
    );
})

