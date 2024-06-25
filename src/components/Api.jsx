// src/App.js

import React, { useState, useEffect } from 'react';

function Api() {
  const [pokemones, setPokemones] = useState([]);
  

  useEffect(() => {

    const getPokemones= async () =>{

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0`)

      const listaPokemones = await response.json()
      
      const {results} = listaPokemones


      const newPokemones = results.map(async (pokemon) => {
        // llamar a un datos pokemones
        const response = await fetch(pokemon.url)
        const info_poke = await response.json()

        
        

        // elegir entre las 3 fotos
        const img = info_poke.sprites.other.dream_world.front_default ||
        info_poke.sprites.other['official-artwork'].front_default ||
        info_poke.sprites.front_default;

        // leer cantidad de habilidades
        const len_ability = info_poke.abilities.length

        const abilities=[]
        

        for(let i=0;i<len_ability;i++){
          // llamar datos habolidad
          const response_ab = await fetch(info_poke.abilities[i].ability.url)
          const ability= await response_ab.json()

          const desc_es= ability.flavor_text_entries.find(entry => entry.language.name === 'en')

          abilities.push({
            name:ability.name,
            descr:desc_es ? desc_es.flavor_text : null

          })
          

        };
        

        return{
          id: info_poke.id,
          name: info_poke.name,
          img: img,
          abilities,
          
          

        }

      })
      
      setPokemones( await Promise.all(newPokemones));


    }

    getPokemones()
    
  }, []);

  return (
    <div className='px-10 bg-gray-200'>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  pt-24">
        
        {pokemones.map(pokemon => {
          
          
          if(pokemon.img!==null){return(

            <div key={pokemon.id} className="p-4 border rounded shadow hover:shadow-lg transition-shadow bg-gray-300">
              
              <div className='flex bg-gray-500 items-center justify-between px-5'>
                <p className="text-lg font-bold capitalize text-center">{pokemon.name}</p>
                <p className='font-bold'>{pokemon.id}</p>
              </div>
              
              <img  src={pokemon.img} alt={pokemon.name} className="w-full h-1/2  my-1"/>

              <div className="text-sm  bg-gray-400 h-2/5 my-2 ">
                <p className='bg-gray-500 text-center font-bold'>HABILIDADES</p>
                  <ul className='m-2 '>
                    {pokemon.abilities.map((ability, index) => (
                      <li key={index}>
                        
                        <strong className='capitalize font-bold  '>{ability.name}: </strong>{ability.descr}
                        
                        
                      </li>
                    ))}
                  </ul>
              </div>  
            </div>
          )}else{
            console.log("no sale")
          }
          
        })}
        
      </div>
      
    </div>
  );
}

export default Api;

