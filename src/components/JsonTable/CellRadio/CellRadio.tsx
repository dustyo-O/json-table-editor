import { FC, useMemo } from 'react';
import Tooltip from 'rc-tooltip';

import { cnJsonTable } from '../JsonTable.classname';
import { useField } from '../hooks/useField';
import { string2Boolean } from '../utils';

export type CellRadioProps = {
    children: boolean;
    onCellChange: (value: boolean) => void;
}

export const CellRadio: FC<CellRadioProps> = ({ children, onCellChange }) => {
	const {
		value,
		editing,
		handleValueSave,
		handleChange,
		handleStartEdit,
		clearSelection,
	} = useField(({ startValue: children, convertValue: string2Boolean, onCellChange }));

	const id = useMemo(() => {
		return Math.random();
	}, []);

	const editor = (
		<form className={cnJsonTable('cell-form')} onSubmit={handleValueSave}>
			true:
			{' '}
			<input type="radio" name={`value${id}`} onChange={handleChange} value="true" />
			false:
			{' '}
			<input type="radio" name={`value${id}`} onChange={handleChange} value="false" />
			<button className={cnJsonTable('cell-form-button')}>OK</button>
		</form>
	);

	return (
		<Tooltip overlay={editor} visible={editing} trigger={[]}>
			<span onDoubleClick={handleStartEdit} onMouseDown={clearSelection}>
				{value.toString()}
			</span>
		</Tooltip>
	);
};
