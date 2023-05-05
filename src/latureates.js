import React, { useState, useEffect } from 'react';

function NobelLaureates() {
    const [laureates, setLaureates] = useState([]);

    useEffect(() => {
        fetch('https://api.nobelprize.org/2.1/nobelPrizes')
            .then(response => response.json())
            .then(data => setLaureates(data.prizes.flatMap(prize => prize.laureates)))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Nobel Laureates</h1>
            <ul>
                {laureates.map(laureate => (
                    <li key={laureate.id}>
                        {laureate.fullName.en}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NobelLaureates;