import React from 'react';
import s from './ControlPanel.module.scss'
import calendar from '../../assets/image/calendar.png';
import {ParametersTime} from '../DatePicker/DatePicker';
import {DisplaySelectedSetting} from './DisplaySelectedSetting/DisplaySelectedSetting';
import {ValueCommonlyUsedTime} from '../../utils/formattingValueLItoDate';

type ControlPanelPropsType = {
    onClickSetting: () => void
    start: ParametersTime | 'now'
    end: ParametersTime | 'now'
    isCommonlyUsedTime: ValueCommonlyUsedTime | null
}

export const ControlPanel = React.memo(
    (
        {
            onClickSetting,
            start,
            end,
            isCommonlyUsedTime,
            ...props
        }
            : ControlPanelPropsType) => {

        return (
            <div className={s.controlPanelBlock}>
                <div className={s.imgCalendar}>
                    <img src={calendar} alt='choice of time period' onClick={onClickSetting}/>
                </div>
                <DisplaySelectedSetting start={start} end={end} isCommonlyUsedTime={isCommonlyUsedTime}/>
            </div>
        );
    });

