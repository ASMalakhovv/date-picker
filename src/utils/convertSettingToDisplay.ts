import {ParametersTime, RelativeTime} from "../components/DatePicker/DatePicker";
import {ValueCommonlyUsedTime} from "./formattingValueLItoDate";

export function convertSettingToDisplay(start: ParametersTime, end: ParametersTime,commonlyUsedTime:ValueCommonlyUsedTime | null) {
    const arrTime = [start, end]
    const obj = arrTime.find(e => typeof e === 'object')
    if(commonlyUsedTime){
        return `${commonlyUsedTime}`
    }
    else if (obj) {
        const relativeObj = obj as RelativeTime
        return `${relativeObj.period} ${relativeObj.time} ${relativeObj.unitTime}`
    }
}