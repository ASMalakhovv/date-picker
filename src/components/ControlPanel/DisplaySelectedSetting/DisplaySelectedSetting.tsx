import React, {useCallback, useState} from 'react';
import {StartEndType} from '../../DatePicker/DatePicker';
import {convertSettingToDisplay} from '../../../utils/convertSettingToDisplay';
import {ValueCommonlyUsedTime} from '../../../utils/formattingValueLItoDate';
import {convertToDatesForViewing} from '../../../utils/convertToDatesForViewing';
import arrow from '../../../assets/image/arrow.png'
import s from './DisplaySelectedSetting.module.scss'

type  PropsType = {
    isCommonlyUsedTime: ValueCommonlyUsedTime | null
} & StartEndType

export const DisplaySelectedSetting = React.memo(({start, end, isCommonlyUsedTime, ...props}: PropsType) => {

    //hooks
    const [isShowDates, setIsShowDates] = useState<boolean>(false)

    //actions
    const selectedSettings = convertSettingToDisplay(start, end, isCommonlyUsedTime)
    const {start: showDatesStart, end: showDatesEnd} = convertToDatesForViewing(start, end, isCommonlyUsedTime)

    //callbacks
    const changeIsShowDates = useCallback((status: boolean) => {
        setIsShowDates(status)
    }, [setIsShowDates])

    return (
        <div className={s.displayBlock}>
            {!isShowDates
                ?
                <div onClick={() => changeIsShowDates(true)} className={s.selectedSettings}>
                    <p>{selectedSettings}</p>
                    <span>Show dates</span>
                </div>
                :
                <div onClick={() => changeIsShowDates(false)} className={s.showDates}>
                    <p>{showDatesStart}</p>
                    <img src={arrow} height={50} width={30} alt='arrow'/>
                    <p>{showDatesEnd}</p>
                </div>}
        </div>
    );
});

