import React, {useCallback, useState} from 'react';
import {StartEndType} from '../../DatePicker/DatePicker';
import {convertSettingToDisplay} from "../../../utils/convertSettingToDisplay";
import {ValueCommonlyUsedTime} from "../../../utils/formattingValueLItoDate";
import {convertToDatesForViewing} from "../../../utils/convertToDatesForViewing";
import arrow from '../../../assets/image/arrow.png'

type  PropsType = {
    isCommonlyUsedTime: ValueCommonlyUsedTime | null
} & StartEndType

export const DisplaySelectedSetting = React.memo(({start, end, isCommonlyUsedTime, ...props}: PropsType) => {
    const [isShowDates, setIsShowDates] = useState<boolean>(false)
    const selectedSettings = convertSettingToDisplay(start, end, isCommonlyUsedTime)

    const {start:showDatesStart,end:showDatesEnd} = convertToDatesForViewing(start,end,isCommonlyUsedTime)
    const changeIsShowDates = useCallback((status: boolean) => {
        setIsShowDates(status)
    }, [setIsShowDates])

    return (
        !isShowDates
            ?
            <div onClick={() => changeIsShowDates(true)}>
                {selectedSettings} Show dates
            </div>
            :
            <div onClick={() => changeIsShowDates(false)}>
                {showDatesStart}<img src={arrow} height={50} width={50}/>{showDatesEnd}
            </div>
    );
});

