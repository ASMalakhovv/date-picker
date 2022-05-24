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
    onRefresh: (start: ParametersTime, end: ParametersTime, refreshInterval: number) => void
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
            onRefresh,
            ...props
        }
            : DatePickerPropsType
    ) => {
        //date
        const period: Period[] = ['Next', 'Last']
        const unitTime: UnitTime[] = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years']

        //hooks
        const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false)
        const [isCommonlyUsedTime, setIsCommonlyUsedTime] = useState<ValueCommonlyUsedTime | null>(null)

        //callbacks
        const openTimeSetting = useCallback(() => {
            setIsOpenSetting(!isOpenSetting)
        }, [isOpenSetting])

        const setTimeSettings = useCallback((settings: { start: ParametersTime, end: ParametersTime }
        ) => {
            const {start, end} = calculationStartEndValues(settings)
            onTimeChange(start, end)
        }, [])

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
                        setTimeSettings={setTimeSettings}
                        isCommonlyUsedTime={isCommonlyUsedTime}
                        changeIsCommonlyUsedTime={changeIsCommonlyUsedTime}
                        start={start}
                        end={end}
                        onRefresh={onRefresh}
                    />}
            </div>
        );
    }
)

