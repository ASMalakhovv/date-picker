import {ParametersTime, RelativeTime} from "../components/DatePicker/DatePicker";
import {ValueCommonlyUsedTime} from "./formattingValueLItoDate";

export const changeTimeForQuickSelect = (start: ParametersTime, end: ParametersTime, isCommonlyUsedTime: ValueCommonlyUsedTime | null): RelativeTime | undefined => {
    const isChangedQuickSelect: boolean = !!isCommonlyUsedTime || (typeof start === 'object' && typeof start === 'object')
    const args = [start, end]
    const obj = args.find(p => typeof p === 'object')
    if (!isCommonlyUsedTime && obj) {
        const {period, time, unitTime} = obj as RelativeTime
        return {period, time, unitTime}
    }
}