import React, {ChangeEvent, useCallback, useState} from 'react';
import {ControlPanel} from '../ControlPanel/ControlPanel';
import {Button} from '../Button/Button';
import s from './DatePicker.module.scss'
import {TimePeriodSettings} from '../TimePeriodSettings/TimePeriodSettings';
import {Period, UnitTime} from '../../app/App';
import {calculationStartEndValues} from "../../utils/calculationStartEndValues";
import {ValueCommonlyUsedTime} from "../../utils/formattingValueLItoDate";

//types
export type ParametersTime = RelativeTime | 'now' | ValueCommonlyUsedTime
export type RelativeTime = {
    period: Period
    time: number
    unitTime: UnitTime
}
export type StartEndType = {
    start: ParametersTime
    end: ParametersTime
}
type DatePickerPropsType = Partial<StartEndType> & {
    onTimeChange: (start: ParametersTime, end: ParametersTime) => void
}

const defaultStart: ParametersTime | 'now' = {period: 'Last', time: 30, unitTime: 'minutes'}
const defaultEnd: ParametersTime | 'now' = 'now'
const commonlyUsedTime = ['Today', 'This week', 'This month',
    'This year', 'Yesterday', 'Week to date', 'Month to date', 'Year to date'
] as const

export type CommonlyUsedTime = typeof commonlyUsedTime

export const DatePicker = React.memo(
    (
        {
            start = defaultStart,
            end = defaultEnd,
            onTimeChange,
            ...props
        }
            : DatePickerPropsType
    ) => {
        //date
        const period: Period[] = ['Next', 'Last']
        const unitTime: UnitTime[] = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years']
        const {period: periodDefault, time: timeDefault, unitTime: unitTimeDefault} = start as RelativeTime

        //hooks
        const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false)
        const [valuePeriod, setValuePeriod] = useState<Period>(periodDefault)
        const [relativeTimeValueSettings, setRelativeTimeValueSettings] = useState<number>(timeDefault)
        const [relativeUnitTimeValueSettings, setRelativeUnitTimeValueSettings] = useState<UnitTime>(unitTimeDefault)
        const [isCommonlyUsedTime, setIsCommonlyUsedTime] = useState<ValueCommonlyUsedTime | null>(null)
        debugger
        //callbacks
        const openTimeSetting = useCallback(() => {
            setIsOpenSetting(!isOpenSetting)
        }, [isOpenSetting])

        const setTimeSettings = useCallback((settings: { start: ParametersTime, end: ParametersTime }
        ) => {
            const {start, end} = calculationStartEndValues(settings)
            debugger
            onTimeChange(start, end)
        }, [setValuePeriod, setRelativeTimeValueSettings, setRelativeUnitTimeValueSettings])

        const changeIsCommonlyUsedTime = useCallback((value: ValueCommonlyUsedTime | null) => {
            setIsCommonlyUsedTime(value)
        }, [isCommonlyUsedTime])

        return (
            <div className={s.datePickerBlock}>
                <ControlPanel
                    onClickSetting={openTimeSetting}
                    start={start}
                    end={end}
                    isCommonlyUsedTime={isCommonlyUsedTime}

                />
                <Button/>
                {isOpenSetting &&
                    <TimePeriodSettings
                        onTimeChange={onTimeChange}
                        period={period}
                        unitTime={unitTime}
                        valuePeriod={valuePeriod}
                        relativeTimeValue={relativeTimeValueSettings}
                        relativeUnitTimeValue={relativeUnitTimeValueSettings}
                        setTimeSettings={setTimeSettings}
                        isCommonlyUsedTime={isCommonlyUsedTime}
                        changeIsCommonlyUsedTime={changeIsCommonlyUsedTime}
                        start={start}
                        end={end}
                    />}
            </div>
        );
    }
)

