import React, { useEffect, useState } from "react";
import axios from 'axios';
import './App2.css';


function MyData() {
    const [nobelPrizes, setNobelPrizes] = useState([]);
    const [awardYears, setAwardYears] = useState([]);
    const [fullname, setFullname] = useState([]);
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
        const lature = nobelPrizes.map(latur => latur.laureates);
        setLaureates([...new Set(lature)]);
    }, [nobelPrizes, laureates]);

    useEffect(() => {
        const name = laureates.map(names => names.categoryFullName.map(e => e.en));
        setFullname([...new Set(name)]);
    }, []);

    useEffect(() => {
        const yearData = nobelPrizes.filter(prize => prize.awardYear === selectedYear).flatMap(prize => prize.laureates)
            .map(laureates => laureates.knowName.en);
        setLaureates(yearData);
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
        const total = yearData.reduce((accumulator, currentValue) => {
            return accumulator + parseFloat(currentValue.prizeAmount);
        }, 0);
        setTotalPrizeAmount({ [selectedYear]: total });
        setDisplayedData(filteredData);
    };

    return (
        <div className="container">
            <div className="header"> Nobel Prizes {selectedYear}</div>
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

                <div className="detail">
                    <table>
                        <thead>
                            <tr>

                                <th>Full Name</th>
                                <th>motivation</th>
                                <th>AwardYear</th>
                                <th>Category FullName</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    );
}

export default MyData;