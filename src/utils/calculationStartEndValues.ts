import {ParametersTime, RelativeTime, StartEndType} from '../components/DatePicker/DatePicker';

enum DateFormat {
    Relative_Now = 0,
    Now_Relative = 1,
    Now_Now = 2,
    Relative_Relative = 3
}

export type ResultEnteredTime = {
    error: boolean
    start: string
    end: string
}

export const calculationStartEndValues = (settings: { start: ParametersTime, end: ParametersTime }): StartEndType => {
    const {start, end} = settings
    if (typeof start === 'object' && typeof end === 'string') {
        return generateTimeSpan({timeFormat: 0, start, end})
    } else if (typeof start === 'string' && typeof end === 'object') {
        return generateTimeSpan({timeFormat: 1, start, end})
    } else if (typeof start === 'string' && typeof end === 'string') {
        return generateTimeSpan({timeFormat: 2, start, end})
    } else {
        return generateTimeSpan({timeFormat: 3, start, end})
    }

}
const generateTimeSpan = (timeParameters: { timeFormat: number, start: ParametersTime, end: ParametersTime }
): StartEndType => {
    const {timeFormat, start, end} = timeParameters
    if (timeFormat === DateFormat.Relative_Now) {
        const startTime = start as RelativeTime
        const end = 'now'
        return {start: startTime, end}
    } else if (timeFormat === DateFormat.Now_Relative) {
        const endTime = end as RelativeTime
        const start = 'now'
        return {start, end: endTime}
    } else if (timeFormat === DateFormat.Now_Now) {
        return {start: 'now', end: 'now'}
    } else {
        const startTime = start as RelativeTime
        const endTime = end as RelativeTime
        return {start: startTime, end: endTime}
    }
}
