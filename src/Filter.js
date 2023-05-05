import React, { useState } from "react";

function FilteredList({ data }) {
    const [filterValue, setFilterValue] = useState("");

    const handleChange = (event) => {
        setFilterValue(event.target.value);
    };

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase())
    );

    return (
        <div>
            <input type="text" value={filterValue} onChange={handleChange} />
            <ul>
                {filteredData.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default FilteredList;