import React from 'react';
import s from './TimePeriodSettings.module.scss'
import {QuickSelect} from './QuickSelect/QuickSelect';
import {CommonlyUsedValues} from './CommonlyUsed/CommonlyUsedValues';
import {RefreshSettings} from "./RefreshSettings/RefreshSettings";
import {ParametersTime, RelativeTime} from "../DatePicker/DatePicker";
import {Period, UnitTime} from "../../app/App";
import {ValueCommonlyUsedTime} from "../../utils/formattingValueLItoDate";

type TimePeriodSettingsProps = {
    onTimeChange: (start: ParametersTime | 'now', end: ParametersTime | 'now') => void
    period: Period[]
    unitTime: UnitTime[]
    valuePeriod: Period
    relativeTimeValue: number
    relativeUnitTimeValue: UnitTime
    setTimeSettings: (settings: { start: ParametersTime, end: ParametersTime }) => void
    isCommonlyUsedTime:ValueCommonlyUsedTime | null
    changeIsCommonlyUsedTime:(value:ValueCommonlyUsedTime | null) => void
    start:ParametersTime
    end:ParametersTime
}

export const TimePeriodSettings = React.memo(
    (
        {
            onTimeChange,
            period,
            unitTime,
            valuePeriod,
            relativeTimeValue,
            relativeUnitTimeValue,
            setTimeSettings,
            isCommonlyUsedTime,
            changeIsCommonlyUsedTime,
            start,
            end,
            ...props
        }
            : TimePeriodSettingsProps) => {


        return (
            <div className={s.timePeriodSettingsBlock}>
                <div className={s.timePeriodSettingsContainer}>
                    <QuickSelect
                        onClickApply={onTimeChange}
                        period={period}
                        unitTime={unitTime}
                        setTimeSettings={setTimeSettings}
                        start={start}
                        end={end}
                        isCommonlyUsedTime={isCommonlyUsedTime}
                        changeIsCommonlyUsedTime={changeIsCommonlyUsedTime}
                    />
                    <CommonlyUsedValues
                        onChangeStatus={changeIsCommonlyUsedTime}
                        setTimeSettings={setTimeSettings}
                    />
                    <RefreshSettings/>
                </div>
            </div>
        );
    });
