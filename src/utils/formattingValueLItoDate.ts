import {CommonlyUsedTime, RelativeTime} from "../components/DatePicker/DatePicker";
import {Period, UnitTime} from "../app/App";
import {getDaysInMonth} from "./getDaysInMonth";

type FormattedCommonlyUsedTime = {
    start: RelativeTime
    end: RelativeTime | 'now'
}

export type ValueCommonlyUsedTime = CommonlyUsedTime[number]
export const formattingValueLItoDate = (value: ValueCommonlyUsedTime):FormattedCommonlyUsedTime => {
    const date = new Date()
    switch (value) {
        case 'Today': {
            const startTime: number = date.getHours()
            const startPeriod: Period = 'Last'
            const startUnitTime: UnitTime = 'hours'
            const endTime: number = 24 - startTime
            const endPeriod: Period = 'Next'
            const endUnitTime: UnitTime = 'hours'
            return {
                start: {period: startPeriod, time: startTime, unitTime: startUnitTime},
                end: {period: endPeriod, time: endTime, unitTime: endUnitTime}
            }
        }
        case "This week": {
            const day: number = date.getDay()
            const startTime: number = Math.abs(0 - (day + 1))
            const startPeriod: Period = 'Last'
            const startUnitTime: UnitTime = 'days'
            const endTime: number = Math.abs(7 - (day + 1))
            const endPeriod: Period = 'Next'
            const endUnitTime: UnitTime = 'days'
            return {
                start: {period: startPeriod, time: startTime, unitTime: startUnitTime},
                end: {period: endPeriod, time: endTime, unitTime: endUnitTime}
            }
        }
        case "This month": {
            const month = date.getMonth()
            const year = date.getFullYear()
            const numberDayMonth: number = getDaysInMonth(month, year)
            const startTime: number = date.getDate()
            const startPeriod: Period = 'Last'
            const startUnitTime: UnitTime = 'days'
            const endTime: number = numberDayMonth - startTime
            const endPeriod: Period = 'Next'
            const endUnitTime: UnitTime = 'days'
            return {
                start: {period: startPeriod, time: startTime, unitTime: startUnitTime},
                end: {period: endPeriod, time: endTime, unitTime: endUnitTime}
            }
        }
        case 'This year': {
            const month: number = date.getMonth() + 1
            const startTime: number = month
            const startPeriod: Period = 'Last'
            const startUnitTime: UnitTime = 'months'
            const endTime: number = 12 - month
            const endPeriod: Period = 'Next'
            const endUnitTime: UnitTime = 'months'
            return {
                start: {period: startPeriod, time: startTime, unitTime: startUnitTime},
                end: {period: endPeriod, time: endTime, unitTime: endUnitTime}
            }
        }
        case 'Yesterday': {
            const startTime: number = 2
            const startPeriod: Period = 'Last'
            const startUnitTime: UnitTime = 'days'
            const endTime: number = date.getMinutes() > 30 ? date.getHours() + 1 : date.getHours()
            const endPeriod: Period = 'Next'
            const endUnitTime: UnitTime = 'hours'
            return {
                start: {period: startPeriod, time: startTime, unitTime: startUnitTime},
                end: {period: endPeriod, time: endTime, unitTime: endUnitTime}
            }
        }
        case "Week to date": {
            const day: number = date.getDay()
            const startTime: number = Math.abs(0 - (day + 1))
            const startPeriod: Period = 'Last'
            const startUnitTime: UnitTime = 'days'
            return {
                start: {period: startPeriod, time: startTime, unitTime: startUnitTime},
                end: 'now'
            }
        }
        case "Month to date":{
            const startTime: number = date.getDate()
            const startPeriod: Period = 'Last'
            const startUnitTime: UnitTime = 'days'
            return {
                start: {period: startPeriod, time: startTime, unitTime: startUnitTime},
                end: 'now'
            }
        }
        case "Year to date":{
            const startTime: number = date.getMonth() + 1
            const startPeriod: Period = 'Last'
            const startUnitTime: UnitTime = 'months'
            return {
                start: {period: startPeriod, time: startTime, unitTime: startUnitTime},
                end: 'now'
            }
        }
    }
}