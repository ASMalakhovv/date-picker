import React, {ChangeEvent, useCallback, useState} from 'react';
import s from './RefreshSettings.module.scss'

export type TimeValues = 'seconds' | 'minutes' | 'hours'
type PropsType = {
    refreshInterval: number
    changeRefreshInterval: (refreshInterval: number) => void
    setTimeValueForRefresh: (value: TimeValues) => void
}

export const RefreshSettings = React.memo(
    (
        {
            refreshInterval,
            changeRefreshInterval,
            setTimeValueForRefresh,
            ...props
        }: PropsType) => {

        const timeValues: TimeValues[] = ['seconds', 'minutes', 'hours']
        const timeOptions = timeValues.map((t: TimeValues, i: number) => <option key={i}>{t}</option>)

        //hooks
        const [valueSelect, setValueSelect] = useState<TimeValues>('seconds')
        const [isStartUpdate, setIsStartUpdate] = useState<boolean>(false)

        //callbacks
        const onChangeValueInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            changeRefreshInterval(Number(e.currentTarget.value))
        }, [])
        const onChangeValueSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
            const isTimeValues = (x: any): x is TimeValues => timeValues.includes(x)
            if (isTimeValues(e.currentTarget.value)) {
                setValueSelect(e.currentTarget.value)
                setTimeValueForRefresh(e.currentTarget.value)
            }
        }, [timeValues])
        const startUpdateHandler = useCallback(() => {
            setIsStartUpdate(true)
        }, [setIsStartUpdate])
        const stopUpdateHandler = useCallback(() => {
            setIsStartUpdate(false)
        }, [setIsStartUpdate])

        return (
            <div className={s.refreshSettingBlock}>
                <input type='number' onChange={onChangeValueInput} value={refreshInterval}/>
                <select value={valueSelect} onChange={onChangeValueSelect}>
                    {timeOptions}
                </select>
                {!isStartUpdate
                    ?
                    <button disabled={!(refreshInterval > 0)} onClick={startUpdateHandler}>Start</button>
                    :
                    <button onClick={stopUpdateHandler}>Stop</button>}
            </div>
        );
    });