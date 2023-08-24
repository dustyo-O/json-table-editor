import React, {
	useState, useEffect, useCallback,
} from 'react';
import { Grid, AutoSizer, ColumnSizer } from 'react-virtualized';
import ContentLoader from 'react-content-loader';
import { useWindowSize } from 'react-use';

import { cnJsonTable } from './JsonTable.classname';
import { DataType } from './types';
import './JsonTable.css';
import { useJsonData } from './hooks/useJsonData';
// @ts-expect-error typescript cannot find module
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!../../workers/worker.ts';

const noContent = () => 'n/a';

export function JsonTable() {
	const [data, setData] = useState<undefined|DataType>(undefined);
	const [loading, setLoading] = useState(false);

	const { height } = useWindowSize();
	const {
		keys,
		getColumnWidth,
		cellRenderer,
	} = useJsonData(data);

	const widthGetter = useCallback(({ index } : { index: number }) => getColumnWidth(index), [getColumnWidth]);

	const handleMessage = useCallback((event: MessageEvent) => {
		setData(event.data.slice(0, 1000));
	}, []);

	useEffect(() => {
		if (data !== undefined || loading) {
			return;
		}

		setLoading(true);

		const worker = new Worker();

		worker.postMessage([
			'https://api.json-generator.com/templates/Pji4v88Ud9bo/data',
			'0dnlg0e3n22tnxtyzj125ytqtk714i2cnso0tm5m',
		]);

		worker.addEventListener('message', handleMessage);
	}, [data, handleMessage, loading]);

	if (!data) {
		return (
			<ContentLoader
				speed={2}
				width={400}
				height={160}
				viewBox="0 0 400 160"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
			>
				<rect x="0" y="8" rx="3" ry="3" width="88" height="6" />
				<rect x="0" y="26" rx="3" ry="3" width="52" height="6" />
				<rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
				<rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
				<rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
				<rect x="0" y="108" rx="3" ry="3" width="88" height="6" />
				<rect x="0" y="1026" rx="3" ry="3" width="52" height="6" />
				<rect x="0" y="156" rx="3" ry="3" width="410" height="6" />
				<rect x="0" y="172" rx="3" ry="3" width="380" height="6" />
				<rect x="0" y="188" rx="3" ry="3" width="178" height="6" />
			</ContentLoader>
		);
	}

	return (
		<AutoSizer disableHeight>
			{({ width }) => (
				<ColumnSizer
					columnMaxWidth={500}
					columnMinWidth={20}
					columnCount={keys.length}
					key="GridColumnSizer"
					width={width}
				>
					{({ adjustedWidth, registerChild }) => (
						<div
							style={{
								height: '100%',
								width: adjustedWidth,
							}}
							className={cnJsonTable()}
						>
							<Grid
								ref={registerChild}
								columnWidth={widthGetter}
								columnCount={keys.length}
								height={height - 16}
								noContentRenderer={noContent}
								cellRenderer={cellRenderer}
								rowHeight={50}
								rowCount={data.length}
								width={adjustedWidth}
								overscanRowCount={15}
							/>
						</div>
					)}
				</ColumnSizer>
			)}
		</AutoSizer>
	);
}
