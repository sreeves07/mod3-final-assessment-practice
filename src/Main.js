import React from 'react';
import { useState, useEffect } from 'react';
// import { useParams } from "react-router-dom";

const Main = () => {
    // let {id} = useParams()
    const [species, setSpecies] = useState([])
    const [showsDescription, setShowDescription] = useState(false)
    const [single, setSingle] = useState({})
    const [name, setName] = useState("")
    const [input, setInput] = useState({})

    // function toggleDescription() {
    //     setShowDescription(!showsDescription)
    // }

    const handleChoice = (e) => {
        const chosen = e.target.value
        const found = species.find((item) => item.id===chosen)
        setSingle(found || {})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const found = species.find(item => item.name.toLowerCase() === name.toLowerCase())
        setInput(found || {})


    }
    useEffect(()=>{
      fetch(`https://ghibliapi.herokuapp.com/species`)
        .then((res) => res.json())
        .then((data) => {
          setSpecies(data)
        })
        .catch((err) => {
          console.log(err)
        })
    },[])

    return (
        <div>
            <button onClick={() => {setShowDescription(!showsDescription)}}>{!showsDescription ? "Show Description..." : "Hide Description..."}</button>
            <ul>
                {showsDescription && species && species.map((data) => (
                <li key={data.id}> {data.name} . {data.id}</li> 
                ))} 
             </ul>
            <hr></hr>
            <div>
                <select onChange={handleChoice}>
                    <option value=""></option>
                    {species.map((choice) => (
                        <option key={choice.id} value={choice.id}>{choice.name}</option>
                    ))}
                </select>
                {/* single is an object so we dot into to get our info */}
                {single.id && (
                    <div>
                        <p>Name: {single.name}</p>
                        <p>Hair: {single.hair_colors}</p>
                    </div>
                )}
            </div>
            <hr></hr>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>
                        <input 
                        type="text" 
                        placeholder="Spirit, Human..." 
                        value={name} 
                        onChange={(e)=>{setName(e.target.value)}}/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
                {/* input is an object so we dot into to get our info */}
                {input.id && (
                    <div>
                        <p>Name: {input.name}</p>
                        <p>Hair: {input.hair_colors}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;