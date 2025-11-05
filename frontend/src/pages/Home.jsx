import { useState,useEffect } from "react";
import api from "../api";
import Machines from "../components/Machines";
import "../styles/Home.css";

function Home() {
    const [washingMachines, setWashingMachines] = useState([]);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("available");
    const [machineType, setMachineType] = useState("washer");
    const [capacityKg, setCapacityKg] = useState("");
    const [pricePerCycle, setPricePerCycle] = useState("");

    useEffect(() => { // ComponentDidMount
        getWashingMachines();
    }, []);

    const getWashingMachines =  () => {
        api
            .get("/api/washing-machines/")
            .then((res) => res.data)
            .then((data) => {setWashingMachines(data); console.log(data);})
            .catch((err) => alert(err));

    }

    const deleteWashingMachine = (id) => {
        api
            .delete(`/api/washing-machines/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    alert("Washing machine deleted successfully");
                }else{
                    alert("Failed to delete washing machine");
                }
                getWashingMachines();// Refresh the list after deletion
            })
            .catch((error) => alert(error));
        
    }

    const addWashingMachine = (e) => {
        e.preventDefault(); // Prevent form submission
        api.post("/api/washing-machines/", {  
            name,
            status,
            machine_type: machineType,
            capacity_kg: capacityKg,
            price_per_cycle: pricePerCycle
            })
            .then((res) => {
                if (res.status === 201) {
                    alert("Washing machine added successfully");
                }else{
                    alert("Failed to add washing machine");
                }
                getWashingMachines(); // Refresh the list after addition
            })
            .catch((error) => alert(error));
        
    }

    return ( 
    <div>
        <div>
            <h2>Washing Machines</h2>
            {washingMachines.map((machine) => <Machines key={machine.id} machines={machine} onDelete={deleteWashingMachine} />)}
        </div>
        <h2>Add Washing Machine</h2>
        <form onSubmit={addWashingMachine}>
            <label htmlFor="Name">Name:</label>
        <br/>
        <input type="text" id="name" value={name} required onChange={(e) => setName(e.target.value)}  />


        <label htmlFor="Status">Status:</label>
        <br/>
        <input type="text" id="status" value={status} required onChange={(e) => setStatus(e.target.value)} placeholder="Status"/>
        <label htmlFor="MachineType">Machine Type:</label>
        <br/>
        <input type="text" id="machineType" value={machineType} required onChange={(e) => setMachineType(e.target.value)} placeholder="Machine Type"/>
        <label htmlFor="CapacityKg">Capacity (kg):</label>
        <br/>
        <input type="number" id="capacityKg" value={capacityKg} onChange={e => setCapacityKg(e.target.value)} required placeholder="Capacity (kg)" />
        <label htmlFor="PricePerCycle">Price per cycle (€):</label>
        <br/>
        <input type="number" step="0.01" id="pricePerCycle" value={pricePerCycle} onChange={e => setPricePerCycle(e.target.value)} required placeholder="Price per cycle (€)" />


        <br/>
        <input type="submit" value="Add Washing Machine" />
            
        
        </form>
    </div>
    );
}
export default Home;