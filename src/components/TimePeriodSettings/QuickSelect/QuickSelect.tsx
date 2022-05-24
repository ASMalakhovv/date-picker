import React, {ChangeEvent, useCallback, useMemo, useState} from 'react';
import arrowLeft from '../../../assets/image/arrow-left.png';
import arrowRight from '../../../assets/image/arrow-right.png';

import s from './QuickSelect.module.scss'
import {Period, UnitTime} from "../../../app/App";
import {ParametersTime, RelativeTime} from "../../DatePicker/DatePicker";
import {ValueCommonlyUsedTime} from "../../../utils/formattingValueLItoDate";
import {changeTimeForQuickSelect} from "../../../utils/changeTimeForQuickSelect";

type QuickSelectProps = {
    onClickApply: (start: ParametersTime | 'now', end: ParametersTime | 'now') => void
    period: Period[]
    unitTime: UnitTime[]
    setTimeSettings: (settings: { start: ParametersTime, end: ParametersTime }) => void
    start: ParametersTime
    end: ParametersTime
    isCommonlyUsedTime: ValueCommonlyUsedTime | null
    changeIsCommonlyUsedTime: (value: ValueCommonlyUsedTime | null) => void
}

export const QuickSelect = React.memo(
    (
        {
            onClickApply,
            period,
            unitTime,
            setTimeSettings,
            start,
            end,
            isCommonlyUsedTime,
            changeIsCommonlyUsedTime,
            ...props
        }
            : QuickSelectProps) => {


        //formatting incoming start and end values
        const parametersTime = changeTimeForQuickSelect(start, end, isCommonlyUsedTime)
        let periodDefault: Period = 'Last'
        let timeDefault: number = 30
        let unitTimeDefault: UnitTime = 'minutes'

        if (parametersTime) {
            const {period, time, unitTime} = parametersTime
            periodDefault = period
            timeDefault = time
            unitTimeDefault = unitTime
        }

        //hooks
        const [periodLocalValue, setPeriodLocalValue] = useState<Period>(periodDefault)
        const [relativeTimeLocalValue, setRelativeTimeLocalValue] = useState<number>(timeDefault)
        const [relativeUnitTimeLocalValue, setRelativeUnitTimeLocalValue] = useState<UnitTime>(unitTimeDefault)


        const optionPeriod = period.map((p: Period, i: number) => <option key={i}>{p}</option>)
        const optionUnitTime = unitTime.map((t: UnitTime, i: number) => <option key={i}>{t}</option>)

        //callbacks
        const onChangePeriod = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
            const isPeriodValue = (x: any): x is Period => period.includes(x)
            if (isPeriodValue(e.currentTarget.value)) {
                setPeriodLocalValue(e.currentTarget.value)
            }
        }, [setPeriodLocalValue])
        const onChangeRelativeTimeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            setRelativeTimeLocalValue(Number(e.currentTarget.value))
        }, [setRelativeTimeLocalValue])
        const onChangeRelativeUnitTimeValue = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
            setRelativeUnitTimeLocalValue(e.currentTarget.value as UnitTime)
        }, [setRelativeUnitTimeLocalValue])
        const onClickApplySetting = useCallback(() => {
            const start: ParametersTime = periodLocalValue === 'Last' ? {
                period: periodLocalValue,
                time: relativeTimeLocalValue,
                unitTime: relativeUnitTimeLocalValue
            } : 'now'
            const end: ParametersTime = periodLocalValue === 'Next' ? {
                period: periodLocalValue,
                time: relativeTimeLocalValue,
                unitTime: relativeUnitTimeLocalValue
            } : 'now'

            changeIsCommonlyUsedTime(null)
            setTimeSettings({start, end})


        }, [periodLocalValue, relativeTimeLocalValue, relativeUnitTimeLocalValue])

        return (
            <div className={s.quickSelectBlock}>
                <div className={s.quickSelect}>
                    <div className={s.titleQuickSelect}>
                        Quick select
                    </div>
                    <div className={s.buttonBlock}>
                        <button><img src={arrowLeft} alt='arrow-left'/></button>
                        <button><img src={arrowRight} alt='arrow-right'/></button>
                    </div>
                </div>
                <div className={s.settingsPanel}>
                    <select value={periodLocalValue} onChange={onChangePeriod}>
                        {optionPeriod}
                    </select>
                    <input type='number' value={relativeTimeLocalValue} onChange={onChangeRelativeTimeValue}/>
                    <select value={relativeUnitTimeLocalValue} onChange={onChangeRelativeUnitTimeValue}>
                        {optionUnitTime}
                    </select>
                    <button onClick={onClickApplySetting}>Apply</button>
                </div>
            </div>
        );
    });
