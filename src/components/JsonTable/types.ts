export type DataType = {
    [key: string]: number | boolean | string;
}[];

export type CellChangeHandler = (rowIndex: number, columnIndex: number, value: string | number | boolean) => void;
