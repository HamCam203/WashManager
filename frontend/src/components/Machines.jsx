import React from 'react';
import "../styles/Machines.css";
import Washer from "../assets/Washer.jpeg";
import Dryer from "../assets/Dryer.jpeg";


function Machines({ machines, onDelete }) {

    return ( 
    <div className="machines-container">
        <img src={machines.machine_type === "washer" ? Washer : Dryer} alt="Laverie automatique" width="300" />
        <p className= "machine-name">{machines.name}</p>
        <p className= "machine-status">{machines.status}</p>
        <p className= "machine-type">{machines.machine_type}</p>
        <p className= "machine-capacity">{machines.capacity_kg} kg</p>
        <p className= "machine-price">{machines.price_per_cycle} €</p>
        <button className="delete-button" onClick={() => onDelete(machines.id)}>
            Delete
        </button>
         
    </div> );
}
export default Machines;