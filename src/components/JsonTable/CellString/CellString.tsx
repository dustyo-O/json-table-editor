import type { FC } from 'react';
import Tooltip from 'rc-tooltip';

import { cnJsonTable } from '../JsonTable.classname';
import { useField } from '../hooks/useField';
import { string2Number, string2String } from '../utils';

export type CellStringProps = {
    children: string;
    onCellChange: (value: string | number) => void;
    type: 'text' | 'date' | 'number' | 'email';
}

export const CellString: FC<CellStringProps> = ({ children, onCellChange, type = 'string' }) => {
    const {
        value,
        editing,
        handleValueSave,
        handleChange,
        handleCancel,
        handleStartEdit,
        clearSelection
    } = useField(type === 'number' ? {
        startValue: Number(children),
        convertValue: string2Number,
        onCellChange,
    } : {
        startValue: children,
        convertValue: string2String,
        onCellChange,
    });

    const editor = <form className={cnJsonTable('cell-form')} onSubmit={handleValueSave}>
        <input className={cnJsonTable('cell-form-input')} value={value} onChange={handleChange} type={type}/>
        <button className={cnJsonTable('cell-form-button')}>OK</button>
        <button className={cnJsonTable('cell-form-button')} type='button' onClick={handleCancel}>Cancel</button>
    </form>;

    return (
        <Tooltip overlay={editor} visible={editing} trigger={[]}>
            <span onDoubleClick={handleStartEdit} onMouseDown={clearSelection}>
                {value}
            </span>
        </Tooltip>
    );
}
