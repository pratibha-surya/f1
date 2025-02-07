import React, { useEffect, useState } from 'react'
import Card from './Card'

const Newsapp = () => {
    const API_KEY="07a8e13150824e028193c9c3653fb1dd";
    const [search,setSearch]=useState()
    const[newsData,setnewData]=useState(null)
    const getData= async()=>{
        const respose=await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`)
        const jsondata=await respose.json()
        console.log(jsondata.articles )
        setnewData(jsondata.articles)


    }
    const handleInput=(e)=>{
        console.log(e.target.value);
        setSearch(e.target.value);
    }
    useEffect(()=>{
        getData();
    },[])
    const userInput =(event)=>{
        setSearch(event.target.value);

    }
  return (
    <div>
        <nav>
            <div>
                <h1>Trendy News</h1>
            </div>
            <ul style={{display:"flex", gap:"11px"}}>
                <a style={{fontWeight:600, fontSize:"17px"}}>All News</a>
                <a style={{fontWeight:600, fontSize:"17px"}}>Trending</a>

            </ul>
            <div className='searchBar'>
                <input type='text' placeholder='Search News' value={search} onChange={handleInput} />
                <button onClick={getData}>Search</button>
            </div>
        </nav>
        <div>
            <p className='head'>Stay Update with TrendyNews</p>
        </div>
        <div className='categoryBtn'>
            <button  onClick={userInput} value="sports">Sports</button>
            <button onClick={userInput}value="politics">Politics</button>
            <button onClick={userInput} value="entertainment">Entertainment</button>
            <button  onClick={userInput}value="health">Health</button>
            <button  onClick={userInput}value="fitness">Fitness</button>
        </div>
<div>
    {newsData?<Card data={newsData}/>: null}
</div>
       
    </div>
  )
}

export default Newsapp