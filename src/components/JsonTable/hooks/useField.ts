import {
	ChangeEvent, FormEvent, useState, MouseEvent,
} from 'react';

export function useField<T>({ startValue, convertValue, onCellChange }: {
    startValue: T,
    convertValue: (value: string) => T,
    onCellChange: (value: T) => void
}) {
	const [value, setValue] = useState(startValue);
	const [saveValue, setSaveValue] = useState(startValue);
	const [editing, setEditing] = useState(false);

	const handleValueSave = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSaveValue(value);

		setEditing(false);
		onCellChange(value);
	};

	const handleCancel = () => {
		setValue(saveValue);

		setEditing(false);
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setValue(convertValue(event.target.value));
	};

	const handleStartEdit = () => {
		setEditing(true);
	};

	const clearSelection = (event: MouseEvent) => event.preventDefault();

	return {
		editing,
		handleChange,
		handleValueSave,
		handleCancel,
		handleStartEdit,
		clearSelection,
		value,
	};
}
