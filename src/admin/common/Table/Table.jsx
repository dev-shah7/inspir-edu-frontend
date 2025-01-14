import React from "react";
import PropTypes from "prop-types";

const Table = ({ headers, data, renderRow }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-md">
        <thead className="text-gray-800">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className={`py-2 px-3 ${header.align === "center" ? "text-center" : "text-left"
                  } font-outfit text-xl`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={index}>{renderRow(index, item)}</React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      align: PropTypes.oneOf(["left", "center"]),
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderRow: PropTypes.func.isRequired,
};

export default Table;
