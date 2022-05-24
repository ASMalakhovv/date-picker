import {TimeValues} from '../components/TimePeriodSettings/RefreshSettings/RefreshSettings';

export const updateIntervalRefresh = (refreshInterval: number, timeValue: TimeValues): number => {
    if (timeValue === 'seconds') {
        return refreshInterval * 1000
    } else if (timeValue === 'minutes') {
        return refreshInterval * 60000
    } else if (timeValue === 'hours') {
        return refreshInterval * 3600000
    }
    return 0
}