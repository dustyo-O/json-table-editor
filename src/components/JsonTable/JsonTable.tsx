import { useState, type FC, type ReactNode, useEffect, useCallback } from 'react';
import { Grid, AutoSizer, ColumnSizer, CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import ContentLoader from 'react-content-loader';

import { cnJsonTable } from './JsonTable.classname';
import { DataType } from './types';
import './JsonTable.css';
import { useJsonData } from './hooks/useJsonData';
import { worker as workerScript } from '../../workers/worker';

const worker = new Worker(workerScript);

export const JsonTable: FC = () => {
    const [data, setData] = useState<undefined|DataType>(undefined);
    const [loading, setLoading] = useState(false);

    const {
        keys,
        getColumnWidth,
        cellRenderer,
    } = useJsonData(data);

    const handleMessage = useCallback((event: MessageEvent) => {
        console.log(event.data);
    }, []);

    useEffect(() => {
        if (data !== undefined || loading) {
            return;
        }

        setLoading(true);

        console.log('post message');

        worker.postMessage([
            'https://api.json-generator.com/templates/Pji4v88Ud9bo/data',
            '0dnlg0e3n22tnxtyzj125ytqtk714i2cnso0tm5m'
        ]);

        worker.addEventListener('message', handleMessage);

        return () => {
            worker.removeEventListener('message', handleMessage);

            worker.terminate();
        };
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
                <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
                <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
                <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
                <circle cx="20" cy="20" r="20" />
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
                    width={ width }>
                    {({ adjustedWidth, columnWidth, registerChild }) => (
                        <div
                            style={{
                                height: '100%',
                                width: adjustedWidth,
                            }}
                            className={cnJsonTable()}
                        >
                            <Grid
                                ref={registerChild}
                                columnWidth={({ index }) => getColumnWidth(index)}
                                columnCount={keys.length}
                                autoHeight
                                height={data.length * 50}
                                noContentRenderer={() => 'no data'}
                                cellRenderer={cellRenderer}
                                rowHeight={50}
                                rowCount={data.length}
                                width={adjustedWidth}
                                overscanColumnCount={15}
                                overscanRowCount={15}
                            />
                        </div>
                    )}
                </ColumnSizer>
            )}
        </AutoSizer>
    );
}
