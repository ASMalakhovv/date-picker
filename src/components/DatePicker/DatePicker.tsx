import React, {useCallback, useState} from 'react';
import {ControlPanel} from '../ControlPanel/ControlPanel';
import {Button} from '../Button/Button';
import s from './DatePicker.module.scss'
import {TimePeriodSettings} from '../TimePeriodSettings/TimePeriodSettings';
import {Period, UnitTime} from '../../app/App';
import {calculationStartEndValues} from '../../utils/calculationStartEndValues';
import {ValueCommonlyUsedTime} from '../../utils/formattingValueLItoDate';
import {convertToDatesForViewing} from '../../utils/convertToDatesForViewing';
import {TimeValues} from '../TimePeriodSettings/RefreshSettings/RefreshSettings';
import {updateIntervalRefresh} from '../../utils/updateIntervalRefresh';

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
    onRefresh?: (start: string, end: string, refreshTime: number) => void
    refreshInterval: number,
    setRefreshInterval: (refreshInterval: number) => void
}
export type CommonlyUsedTime = typeof commonlyUsedTime

//data
const defaultStart: ParametersTime | 'now' = {period: 'Last', time: 30, unitTime: 'minutes'}
const defaultEnd: ParametersTime | 'now' = 'now'
const commonlyUsedTime = ['Today', 'This week', 'This month',
    'This year', 'Yesterday', 'Week to date', 'Month to date', 'Year to date'
] as const

export const DatePicker = React.memo(
    (
        {
            start = defaultStart,
            end = defaultEnd,
            onTimeChange,
            onRefresh,
            refreshInterval,
            setRefreshInterval,
            ...props
        }
            : DatePickerPropsType
    ) => {

        //data
        const period: Period[] = ['Next', 'Last']
        const unitTime: UnitTime[] = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years']

        //hooks
        const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false)
        const [isCommonlyUsedTime, setIsCommonlyUsedTime] = useState<ValueCommonlyUsedTime | null>(null)
        const [timeValueForRefresh, setTimeValueForRefresh] = useState<TimeValues>('seconds')

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
        const changeRefreshInterval = useCallback((refreshInterval: number) => {
            setRefreshInterval(refreshInterval)
        }, [setRefreshInterval])
        const callOnRefresh = useCallback(() => {
                const {start: onRefreshStart, end: onRefreshEnd} = convertToDatesForViewing(start, end, isCommonlyUsedTime)
                const changedRefreshInterval = updateIntervalRefresh(refreshInterval, timeValueForRefresh)
                onRefresh && onRefresh(onRefreshStart, onRefreshEnd, changedRefreshInterval)
            }, [start, end, isCommonlyUsedTime, refreshInterval, timeValueForRefresh]
        )

        return (
            <div className={s.datePickerBlock}>
                <div className={s.datePickerContainer}>
                    <ControlPanel
                        onClickSetting={openTimeSetting}
                        start={start}
                        end={end}
                        isCommonlyUsedTime={isCommonlyUsedTime}
                    />
                    <Button
                        callOnRefresh={callOnRefresh}
                    />
                </div>
                {isOpenSetting &&
                    <TimePeriodSettings
                        period={period}
                        unitTime={unitTime}
                        setTimeSettings={setTimeSettings}
                        isCommonlyUsedTime={isCommonlyUsedTime}
                        changeIsCommonlyUsedTime={changeIsCommonlyUsedTime}
                        start={start}
                        end={end}
                        refreshInterval={refreshInterval}
                        changeRefreshInterval={changeRefreshInterval}
                        setTimeValueForRefresh={setTimeValueForRefresh}
                    />}
            </div>
        );
    }
)

