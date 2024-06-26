import profiles from "../data/berlin.json";
import { useState } from "react";

function FaceBook() {
  const [country, setCountry] = useState(false);
   const [personId,setPersonId] = useState([]);
   const [lisOfP,setlisOfP] = useState(profiles);


  const divStyle = {
    height: "200px",
    border: "1px solid #000",
    display: "flex",
    gap: "35px",
    margin: "10px",
  };
  const highlightedDivStyle = {
    height: "200px",
    border: "1px solid #000",
    display: "flex",
    gap: "35px",
    margin: "10px",
    backgroundColor: "red",
  };

  const imgStyle = {
    padding: "5px",
  };

  const innerDivStyle = {
    textAlign: "left",
  };
  let countryList = [...new Set(profiles.map((person) => person.country))];

  function highlightCountry(Newcountry) {
    if(country===Newcountry) {
        setCountry(false);
    }
    else {
        setCountry(Newcountry);
    }
    
  }
  function handleId (key) {
    if(personId.includes(key)) {
        let pos = personId.indexOf(key);
        setCountry(personId.splice(pos,1));
    }
    else {
        setPersonId((prevVer) => {return [...prevVer,key]});
    }
    
  }
  function sort () {
    const sortedWords = [...lisOfP].sort((a, b) => a.country.localeCompare(b.country));
    setlisOfP(sortedWords);
  }

  function handleSearch(query) {
    const filteredList = profiles.filter((person)=> {
        return Object.values(person).join(" ").toLowerCase().includes(query.toLowerCase());
    })
    setlisOfP(filteredList);
  }


  return (
    <div>
      {countryList.map((country) => {
        return (
          <button
            onClick={() => {
              highlightCountry(country);
            }}
            key={country}
          >
            {country}
          </button>
        );
      })}
      <button onClick={sort}>Sort by country</button>
    <input type="search" id="search" name="search" placeholder="Search..." onChange={(e) => {handleSearch(e.target.value)}}/>
      {lisOfP.map((person) => {
        return (
          <div
            style={country === person.country ? highlightedDivStyle : divStyle}
            key={person.firstName + person.lastName}
          >
            <img src={person.img} onClick={() => { handleId(person.firstName + person.lastName) }} style={imgStyle} />
            {personId.includes(person.firstName + person.lastName) && <div style={innerDivStyle}>
              <p>
                <strong>First name:</strong> {person.firstName}
              </p>
              <p>
                <strong>Last name:</strong> {person.lastName}{" "}
              </p>
              <p>
                <strong>Country:</strong> {person.country}
              </p>
              <p>
                <strong>Type:</strong>{" "}
                {person.isStudent ? "Student" : "Teacher"}
              </p>
            </div>}
          </div>
        );
      })}
    </div>
  );
}

export default FaceBook;
