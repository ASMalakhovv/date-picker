import {ParametersTime} from "../components/DatePicker/DatePicker";



enum DateFormat {
    Relative_Now = 0,
    Now_Relative = 1,
    Now_Now = 2,
    Relative_Relative = 3
}


/*export const useDateCalculation = (start: ParametersTime | 'now', end: ParametersTime | 'now'): ResultEnteredTime => {
    if (typeof start === 'object' && typeof end === 'string') {
        return generateTimeSpan({timeFormat:0,start,end})
    } else if (typeof start === 'string' && typeof end === 'object') {
        return generateTimeSpan({timeFormat:1,start,end})
    } else if (typeof start === 'string' && typeof end === 'string') {
        return generateTimeSpan({timeFormat:2,start,end})
    } else {
        return generateTimeSpan({timeFormat:3,start,end})
    }
}*/

/*
const generateTimeSpan = (timeParameters: {timeFormat: number, start: ParametersTime | 'now', end: ParametersTime | 'now' }
): ResultEnteredTime => {
    const {timeFormat,start,end} = timeParameters
    if (timeFormat === DateFormat.Relative_Now) {
        const startTime = start as ParametersTime
        const {period, time, unitTime} = startTime
        return {error: false, start: `${period} ${time} ${unitTime}`, end: `${end}`}
    } else {
        const endTime = end as ParametersTime
        const {period, time, unitTime} = endTime
        return {error: false, start: `${start}`, end: `${period} ${time} ${unitTime}`}
    }
}*/
