import React, { useEffect, useState } from 'react';
import Card from './Card';

const Newsapp = () => {
    const API_KEY = import.meta.env.VITE_API_KEY; // Access the API key from the environment variable

    // Log the API key to the console (for debugging purposes)
    console.log(API_KEY, "key");
    
    const [search, setSearch] = useState('');
    const [newsData, setNewsData] = useState(null);

    const getData = async () => {
        // Use the search term if available, otherwise use a default term
       try {
        const query = search || 'latest'; // Default to 'latest' if no search term
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
        const jsonData = await response.json();
        console.log(jsonData.articles);
        setNewsData(jsonData.articles);
       } catch (error) {
        console.log("erro",error)
        
       }
    };

    const handleInput = (e) => {
        console.log(e.target.value);
        setSearch(e.target.value);
    };

    useEffect(() => {
        getData();
    }, [API_KEY]);

    const userInput = (event) => {
        setSearch(event.target.value);
        getData(); // Fetch data when a category button is clicked
    };

    return (
        <div>
            <nav>
                <div>
                    <h1>Trendy News</h1>
                </div>
                <ul style={{ display: "flex", gap: "11px" }}>
                    <a style={{ fontWeight: 600, fontSize: "17px" }}>All News</a>
                    <a style={{ fontWeight: 600, fontSize: "17px" }}>Trending</a>
                </ul>
                <div className='searchBar'>
                    <input type='text' placeholder='Search News' value={search} onChange={handleInput} />
                    <button onClick={getData}>Search</button>
                </div>
            </nav>
            <div>
                <p className='head'>Stay Updated with TrendyNews</p>
            </div>
            <div className='categoryBtn'>
                <button onClick={userInput} value="sports">Sports</button>
                <button onClick={userInput} value="politics">Politics</button>
                <button onClick={userInput} value="entertainment">Entertainment</button>
                <button onClick={userInput} value="health">Health</button>
                <button onClick={userInput} value="fitness">Fitness</button>
            </div>
            <div>
                {newsData ? <Card data={newsData} /> : null}
            </div>
        </div>
    );
};

export default Newsapp;