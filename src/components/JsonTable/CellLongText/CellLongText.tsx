import type { FC } from 'react';
import Tooltip from 'rc-tooltip';

import { cnJsonTable } from '../JsonTable.classname';
import { useField } from '../hooks/useField';
import { string2String } from '../utils';

export type CellLongTextProps = {
    children: string;
    onCellChange: (value: string) => void;
}

export const CellLongText: FC<CellLongTextProps> = ({ children, onCellChange }) => {
	const {
		value,
		editing,
		handleValueSave,
		handleChange,
		handleCancel,
		handleStartEdit,
		clearSelection,
	} = useField({ startValue: children, convertValue: string2String, onCellChange });

	const editor = (
		<form className={cnJsonTable('cell-form')} onSubmit={handleValueSave}>
			<textarea className={cnJsonTable('cell-form-editor')} value={value} onChange={handleChange} />
			<button className={cnJsonTable('cell-form-button')}>OK</button>
			<button className={cnJsonTable('cell-form-button')} type="button" onClick={handleCancel}>Cancel</button>
		</form>
	);

	return (
		<Tooltip overlay={editor} visible={editing} trigger={[]}>
			<span onDoubleClick={handleStartEdit} onMouseDown={clearSelection}>
				{value}
			</span>
		</Tooltip>
	);
};
