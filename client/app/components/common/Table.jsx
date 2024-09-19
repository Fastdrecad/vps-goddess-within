import { Fragment } from "react";
import { Table } from "react-bootstrap";

const TableComponent = ({ data, config, keyFn }) => {
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }
    return <th key={column.label}>{column.label}</th>;
  });

  const renderedRows = data?.map((rowData, rowIndex) => {
    const rowKey = keyFn(rowData);
    const renderedCells = config.map((column, columnIndex) => {
      return (
        <td key={`${rowKey}-${column.label}-${columnIndex}`}>
          {column.render(rowData)}
        </td>
      );
    });

    return <tr key={`${rowKey}-${rowIndex}`}>{renderedCells}</tr>;
  });

  return (
    <Table striped hover responsive className="table-sm text-center">
      <thead>
        <tr>{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </Table>
  );
};

export default TableComponent;
