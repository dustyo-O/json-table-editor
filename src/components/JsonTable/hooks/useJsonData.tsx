import React, {
	ReactNode, useCallback, useEffect, useMemo, useRef,
} from 'react';
import {
	GridCellProps, CellMeasurer, CellMeasurerCache, GridCellRenderer,
} from 'react-virtualized';

import { CellChangeHandler, DataType } from '../types';
import { CellString, CellStringProps } from '../CellString/CellString';
import { CellRadio } from '../CellRadio/CellRadio';
import { CellLongText } from '../CellLongText/CellLongText';
import { cnJsonTable } from '../JsonTable.classname';
import { isJson } from '../utils';

const cache = new CellMeasurerCache({
	defaultWidth: 100,
	minWidth: 75,
	fixedHeight: true,
});

export const useJsonData = (data: DataType = []) => {
	const storage = useRef<DataType>([]);
	const firstRow = data[0];
	const keys = useMemo(() => (firstRow ? Object.keys(firstRow) : []) as (keyof typeof firstRow)[], [firstRow]);

	useEffect(() => {
		if (data.length === 0) {
			return;
		}

		if (storage.current.length > 0) {
			return;
		}

		storage.current = data;
	}, [data]);

	const renderer = useCallback(({
		rowIndex, columnIndex, style, key, parent, onCellChange,
	}: GridCellProps & { onCellChange: CellChangeHandler }) => {
		const handleCellChange = (value: string | number | boolean) => {
			storage.current[rowIndex][keys[columnIndex]] = value;
			onCellChange(rowIndex, columnIndex, value);
		};

		const value = storage.current[rowIndex][keys[columnIndex]];
		let content: ReactNode = null;

		if (typeof value === 'string' && !isJson(value)) {
			if (keys[columnIndex] === 'id') {
				content = value;
			} else if (value.length > 80) {
				content = <CellLongText onCellChange={handleCellChange}>{value}</CellLongText>;
			} else {
				let type: CellStringProps['type'] = 'text';

				if (value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i)) {
					type = 'email';
				}

				if (!isNaN(Date.parse(value))) {
					type = 'date';
				}

				content = <CellString type={type} onCellChange={handleCellChange}>{value}</CellString>;
			}
		}

		if (typeof value === 'number') {
			content = <CellString type="number" onCellChange={handleCellChange}>{value.toString()}</CellString>;
		}

		if (typeof value === 'boolean') {
			content = <CellRadio onCellChange={handleCellChange}>{value}</CellRadio>;
		}

		return (
			<CellMeasurer
				cache={cache}
				columnIndex={columnIndex}
				key={key}
				parent={parent}
				rowIndex={rowIndex}
			>
				<div
					className={cnJsonTable('cell', { first: columnIndex === 0 })}
					key={key}
					style={{
						...style,
						height: 50,
					}}
				>
					<div className={cnJsonTable('cell-inner')}>{content}</div>
				</div>
			</CellMeasurer>
		);
	}, [keys]);

	const getColumnWidth = useCallback((index: number) => {
		const widths = [];
		for (let i = 0; i < storage.current.length; i += 1) {
			widths.push(cache.getWidth(i, index));
		}

		return Math.max(...widths) + 8;
	}, []);

	// here we can add dispatch or something, but in current project it doesn't make sense
	const handleCellChange = useCallback((rowIndex: number, cellIndex: number, value: string | number | boolean) => {
		// eslint-disable-next-line no-console
		console.log(rowIndex, cellIndex, value);
	}, []);

	const cellRenderer: GridCellRenderer = useCallback((data) => {
		return renderer({
			...data,
			onCellChange: handleCellChange,
		});
	}, [handleCellChange, renderer]);

	return {
		getColumnWidth,
		cellRenderer,
		keys,
	};
};
