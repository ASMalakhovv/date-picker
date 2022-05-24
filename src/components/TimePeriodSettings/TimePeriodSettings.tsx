import React from 'react';
import s from './TimePeriodSettings.module.scss'
import {QuickSelect} from './QuickSelect/QuickSelect';
import {CommonlyUsedValues} from './CommonlyUsed/CommonlyUsedValues';
import {RefreshSettings, TimeValues} from './RefreshSettings/RefreshSettings';
import {ParametersTime} from '../DatePicker/DatePicker';
import {Period, UnitTime} from '../../app/App';
import {ValueCommonlyUsedTime} from '../../utils/formattingValueLItoDate';

type TimePeriodSettingsProps = {
    period: Period[]
    unitTime: UnitTime[]
    setTimeSettings: (settings: { start: ParametersTime, end: ParametersTime }) => void
    isCommonlyUsedTime: ValueCommonlyUsedTime | null
    changeIsCommonlyUsedTime: (value: ValueCommonlyUsedTime | null) => void
    start: ParametersTime
    end: ParametersTime
    refreshInterval: number
    changeRefreshInterval: (refreshInterval: number) => void
    setTimeValueForRefresh: (value: TimeValues) => void
}

export const TimePeriodSettings = React.memo(
    (
        {
            period,
            unitTime,
            setTimeSettings,
            isCommonlyUsedTime,
            changeIsCommonlyUsedTime,
            start,
            end,
            refreshInterval,
            changeRefreshInterval,
            setTimeValueForRefresh,
            ...props
        }
            : TimePeriodSettingsProps) => {


        return (
            <div className={s.timePeriodSettingsBlock}>
                <div className={s.timePeriodSettingsContainer}>
                    <QuickSelect
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
                    <RefreshSettings
                        refreshInterval={refreshInterval}
                        changeRefreshInterval={changeRefreshInterval}
                        setTimeValueForRefresh={setTimeValueForRefresh}
                    />
                </div>
            </div>
        );
    });
