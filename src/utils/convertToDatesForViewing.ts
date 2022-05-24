import {ParametersTime} from '../components/DatePicker/DatePicker';
import {ValueCommonlyUsedTime} from './formattingValueLItoDate';

type ConvertedShowDate = { start: string, end: string }

export const convertToDatesForViewing = (start: ParametersTime, end: ParametersTime,
                                         commonlyUsedTime: ValueCommonlyUsedTime | null): ConvertedShowDate => {
    if (commonlyUsedTime && typeof start === 'object' && typeof end === 'object') {
        const {period: startPeriod, time: startTime, unitTime: startUnitTime} = start
        const {period: endPeriod, time: endTime, unitTime: endUnitTime} = end
        return {start: `~ ${startTime} ${startUnitTime} ago`, end: `~ in ${endTime} ${endUnitTime}`}
    } else if (commonlyUsedTime && typeof start === 'object' && typeof end === 'string') {
        const {period: startPeriod, time: startTime, unitTime: startUnitTime} = start
        return {start: `~ ${startTime} ${startUnitTime} ago`, end: 'now'}
    } else if (!commonlyUsedTime && typeof start === 'object' && typeof end === 'string') {
        const {period: startPeriod, time: startTime, unitTime: startUnitTime} = start
        return {start: `~ ${startTime} ${startUnitTime} ago`, end: 'now'}
    } else if (!commonlyUsedTime && typeof start === 'string' && typeof end === 'object') {
        const {period: endPeriod, time: endTime, unitTime: endUnitTime} = end
        return {start: 'now', end: `in ${endTime} ${endUnitTime}`}
    }
    return {start: "", end: ""}
}
