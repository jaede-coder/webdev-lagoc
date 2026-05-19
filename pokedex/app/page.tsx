"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [search, setSearch] = useState("");

useEffect(() => {
  async function getData() {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await res.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async (item: any) => {
          const detailRes = await fetch(item.url);
          return await detailRes.json();
        })
      );

      setPokemonList(pokemonDetails);
    } catch (error) {
      console.error(error);
    }
 }

  getData();
}, []);

  return (
    <div style={{ backgroundColor: "gray", color: "white", minHeight: "100vh", padding: "20px", fontFamily: "sans-serif" }}>
      <center>
        <h1 style={{ fontSize: "35px" }}>PokeAPI Pokedex</h1>
        
        <input
          type="text"
          placeholder="Search pokemon..."
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "20px",
            border: "1px solid white",
            marginBottom: "40px",
            backgroundColor: "#111",
            color: "white",
            outline: "none"
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </center>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {pokemonList
          .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
          .map((p) => (
            <div
              key={p.name}
              style={{
                border: "1px solid #333",
                margin: "10px",
                padding: "20px",
                borderRadius: "15px",
                textAlign: "center",
                width: "200px",
                backgroundColor: "#111"
              }}
            >
              <h2 style={{ textTransform: "capitalize", fontSize: "20px" }}>{p.name}</h2>

              <img 
                src={p.sprites.front_default} 
                alt="pokemon" 
                style={{ width: "100px", height: "100px" }} 
              />

              <div style={{ marginTop: "10px" }}>

                <p>Height: <b>{p.height / 10} m</b></p>
                <p>Weight: <b>{p.weight / 10} kg</b></p>
                
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
