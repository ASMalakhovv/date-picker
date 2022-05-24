import React, {MouseEvent, useCallback} from 'react';
import s from './CommonlyUsed.module.scss'
import {CommonlyUsedTime, ParametersTime} from '../../DatePicker/DatePicker';
import {formattingValueLItoDate, ValueCommonlyUsedTime} from '../../../utils/formattingValueLItoDate';

type PropsType = {
    onChangeStatus: (value: ValueCommonlyUsedTime | null) => void
    setTimeSettings: (settings: { start: ParametersTime, end: ParametersTime }) => void
}

export const CommonlyUsedValues = React.memo(
    (
        {
            onChangeStatus,
            setTimeSettings,
            ...props
        }: PropsType
    ) => {

        //date
        const valueOptions: CommonlyUsedTime = ['Today', 'This week', 'This month',
            'This year', 'Yesterday', 'Week to date', 'Month to date', 'Year to date'
        ] as const

        //callbacks
        const isCommonlyUsedValues = useCallback((x: any): x is ValueCommonlyUsedTime => {
            return valueOptions.includes(x)
        }, [])
        const onClickValueLI = useCallback((e: MouseEvent<HTMLLIElement>) => {
            if (isCommonlyUsedValues(e.currentTarget.textContent)) {
                onChangeStatus(e.currentTarget.textContent)
                const {start, end} = formattingValueLItoDate(e.currentTarget.textContent)
                setTimeSettings({start, end})
            }
        }, [])

        //action
        const valuesLi = valueOptions.map((v: string, i: number) => <li key={i} onClick={onClickValueLI}>{v}</li>)

        return (
            <div className={s.commonlyUsedBlock}>
                <div className={s.titleCommonlyUsed}>
                    Commonly used
                </div>
                <div className={s.valueOptions}>
                    <ul className={s.ulOptions}>
                        {valuesLi}
                    </ul>
                </div>
            </div>

        );
    });

