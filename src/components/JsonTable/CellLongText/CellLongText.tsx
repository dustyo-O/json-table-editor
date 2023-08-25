import React from 'react';
import Tooltip from 'rc-tooltip';

import { cnJsonTable } from '../JsonTable.classname';
import { useField } from '../hooks/useField';
import { string2String } from '../utils';

export type CellLongTextProps = {
    children: string;
    onCellChange: (value: string) => void;
}

export function CellLongText({ children, onCellChange }: CellLongTextProps) {
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
			<button className={cnJsonTable('cell-form-button')} type="submit">OK</button>
			<button className={cnJsonTable('cell-form-button')} type="button" onClick={handleCancel}>Cancel</button>
		</form>
	);

	return (
		<Tooltip overlay={editor} visible={editing} trigger={[]}>
			{
				// eslint-disable-next-line jsx-a11y/no-static-element-interactions
				<span onDoubleClick={handleStartEdit} onMouseDown={clearSelection}>
					{value}
				</span>
			}
		</Tooltip>
	);
}
