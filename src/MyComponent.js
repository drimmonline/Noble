import './MyComponent.css';
import React, { useState } from "react";
function MyComponent() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleQuery = () => {
        // Use selectedOption variable to query state
        console.log(selectedOption);
    };
    return (
        <div>
            <select value={selectedOption} onChange={handleDropdownChange}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
            <button onClick={handleQuery}>Query</button>

            <h3>{selectedOption}</h3>
        </div>

    );
}

export default MyComponent;