import React, {ChangeEvent, useCallback, useState} from 'react';
import s from './RefreshSettings.module.scss'
import {ParametersTime} from "../../DatePicker/DatePicker";

type TimeValues = 'seconds' | 'minutes' | 'hours'
type PropsType = {
    onRefresh:(start: ParametersTime, end: ParametersTime, refreshInterval: number) => void
}

export const RefreshSettings = React.memo(({onRefresh,...props}:PropsType) => {
    const timeValues: TimeValues[] = ['seconds', 'minutes', 'hours']
    const timeOptions = timeValues.map((t: TimeValues, i: number) => <option key={i}>{t}</option>)

    //hooks
    const [valueInput, setValueInput] = useState<number>(0)
    const [valueSelect, setValueSelect] = useState<TimeValues>('seconds')
    //callbacks
    const onChangeValueInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(Number(e.currentTarget.value))
    }, [])
    const onChangeValueSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const isTimeValues = (x: any): x is TimeValues => timeValues.includes(x)
        if (isTimeValues(e.currentTarget.value)) {
            setValueSelect(e.currentTarget.value)
        }
    }, [timeValues])
    const onClickStart = useCallback(() => {
      //onRefresh()
    },[onRefresh])

    return (
        <div className={s.refreshSettingBlock}>
            <input type='number' onChange={onChangeValueInput} value={valueInput}/>
            <select value={valueSelect} onChange={onChangeValueSelect}>
                {timeOptions}
            </select>
            <button disabled={!(valueInput>0)} onClick={onClickStart}>Start</button>
        </div>
    );
});

