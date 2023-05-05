import React, { useEffect, useState } from "react";
import axios from 'axios';
import './App2.css';


function MyData() {
    const [nobelPrizes, setNobelPrizes] = useState([]);
    const [awardYears, setAwardYears] = useState([]);

    const [selectedYear, setSelectedYear] = useState('');
    const [totalPrizeAmount, setTotalPrizeAmount] = useState({});
    const [displayedData, setDisplayedData] = useState([]);
    const [laureates, setLaureates] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api.nobelprize.org/2.1/nobelPrizes');
            const jsonData = await response.json();
            setNobelPrizes(jsonData.nobelPrizes);


        };

        fetchData();
    }, []);

    useEffect(() => {
        const years = nobelPrizes.map(prize => prize.awardYear);
        setAwardYears([...new Set(years)]);

    }, [nobelPrizes]);



    useEffect(() => {
        const yearData = nobelPrizes.filter(prize => prize.awardYear === selectedYear);
        const yearData2 = nobelPrizes.filter(prize => prize.awardYear === selectedYear).flatMap(prize =>
            prize.laureates.map(laureate => ({
                fullName: laureate.fullName ? laureate.fullName.en : '',
                motivation: laureate.motivation ? laureate.motivation.en : '',
                category: laureate.categoryFullName ? laureate.categoryFullName.en : '',
                awardYear: prize.awardYear
            })));
        setLaureates(yearData2);
        const total = yearData.reduce((accumulator, currentValue) => {
            return accumulator + parseFloat(currentValue.prizeAmount);
        }, 0);

    }, [nobelPrizes, selectedYear]);

    const handleYearChange = event => {
        setSelectedYear(event.target.value);
    };

    const handleApplyClick = () => {
        const filteredData = awardYears.filter(year => year === selectedYear);
        const yearData = nobelPrizes.filter(prize => prize.awardYear === selectedYear);
        const laureData = nobelPrizes.filter(prize => prize.laureate === selectedYear);
        const total = yearData.reduce((accumulator, currentValue) => {
            return accumulator + parseFloat(currentValue.prizeAmount);
        }, 0);
        setTotalPrizeAmount({ [selectedYear]: total });
        setDisplayedData(filteredData);
    };

    return (
        <div className="container">
            <div className="header">
                <h1>
                    Nobel Prizes {selectedYear}
                </h1>
            </div>
            <div class="content">
                <div className="filter">
                    <label htmlFor="year">Select a year:</label>
                    <select id="year" name="year" value={selectedYear} onChange={handleYearChange}>
                        <option value="">All</option>
                        {awardYears && awardYears.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                    <button onClick={handleApplyClick}>Apply</button>
                    <ul>
                        {displayedData.length === 0
                            ? awardYears && awardYears.map(year => <li key={year}>{year}</li>)
                            : displayedData && displayedData.map(year => <li key={year}>{year}</li>)
                        }
                    </ul>

                    {selectedYear == 'All' ? null : <h3>
                        {totalPrizeAmount && Object.keys(totalPrizeAmount).map(year => (
                            <h3>
                                TotalPrizeAmount :{totalPrizeAmount[year]}
                            </h3>
                        ))}
                    </h3>}
                </div>

                {selectedYear == 'All' ? null :
                    <div className="detail">
                        <table>
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Motivation</th>
                                    <th>Award Year</th>


                                </tr>
                            </thead>
                            <tbody>
                                {laureates.map((laureate, index) => (
                                    <tr key={index}>
                                        <td>{laureate.fullName}</td>
                                        <td>{laureate.motivation}</td>
                                        <td>{laureate.awardYear}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
            </div>



        </div>
    );
}

export default MyData;