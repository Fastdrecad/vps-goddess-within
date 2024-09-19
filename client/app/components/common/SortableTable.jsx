import { useState } from "react";
import Table from "./Table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const SortableTable = (props) => {
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const { config, data } = props;

  const handleClick = (label) => {
    if (sortBy && label !== sortBy) {
      setSortOrder("asc");
      setSortBy(label);
    }

    if (sortOrder === null) {
      setSortOrder("asc");
      setSortBy(label);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortBy(label);
    } else if (sortOrder === "desc") {
      setSortOrder(null);
      setSortBy(null);
    }
  };

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => (
        <th onClick={() => handleClick(column.label)}>
          <div className="custom-table-header fw-bold">
            {column.label}
            {getIcons(column.label, sortBy, sortOrder)}
          </div>
        </th>
      )
    };
  });

  // Only sort data if sortOrder && sortBy are not null
  // Make a copy of the 'data' prop
  // Find the correct sortValue function and use it for sorting
  let sortedData = data;
  // console.log(sortedData);

  if (sortOrder && sortBy) {
    const { sortValue } = config.find((column) => column.label === sortBy);
    sortedData = [...data].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === "asc" ? 1 : -1;

      // Check if the sort value is a boolean property
      if (typeof valueA === "boolean") {
        // For boolean properties, 'true' comes before 'false'
        return (valueA === valueB ? 0 : valueA ? -1 : 1) * reverseOrder;
      }

      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  }

  return (
    <>
      <Table {...props} config={updatedConfig} data={sortedData} />
    </>
  );
};

function getIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return <FaSort />;
  }

  if (sortOrder === null) {
    return <FaSort />;
  } else if (sortOrder === "asc") {
    return <FaSortUp />;
  } else if (sortOrder === "desc") {
    return <FaSortDown />;
  }
}

export default SortableTable;
