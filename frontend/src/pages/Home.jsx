import { useState, useEffect } from "react";
import api from "../api";
import Machines from "../components/Machines";
import "../styles/Home.css";

function Home() {
    // State variables for washing machines and form inputs
    const [washingMachines, setWashingMachines] = useState([]);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("available");
    const [machineType, setMachineType] = useState("washer");
    const [capacityKg, setCapacityKg] = useState("");
    const [pricePerCycle, setPricePerCycle] = useState("");

    useEffect(() => {// Fetch washing machines on component mount
        getWashingMachines();
    }, []);

    const getWashingMachines = () => {// Fetch washing machines from the API
        api
            .get("/api/washing-machines/")
            .then((res) => res.data)
            .then((data) => {
                setWashingMachines(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    }

    const deleteWashingMachine = (id) => {// Delete a washing machine by ID
        api
            .delete(`/api/washing-machines/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    alert("Machine supprimée avec succès");
                } else {
                    alert("Échec de la suppression de la machine");
                }
                getWashingMachines();
            })
            .catch((error) => alert(error));
    }

    const updateWashingMachineStatus = (id, newStatus) => {// Update the status of a washing machine
        api
            .patch(`/api/washing-machines/update/${id}/`, { status: newStatus })
            .then((res) => {
                if (res.status === 200) {
                    alert("Statut mis à jour avec succès");
                } else {
                    alert("Échec de la mise à jour du statut");
                }
                getWashingMachines();
            })
            .catch((error) => {
                console.error("Erreur:", error);
                alert("Erreur lors de la mise à jour du statut");
            });
    }

    const addWashingMachine = (e) => {// Add a new washing machine
        e.preventDefault();
        api.post("/api/washing-machines/", {
            name,
            status,
            machine_type: machineType,
            capacity_kg: capacityKg,
            price_per_cycle: pricePerCycle
        })
            .then((res) => {
                if (res.status === 201) {
                    alert("Machine ajoutée avec succès");
                    // Réinitialiser le formulaire
                    setName("");
                    setStatus("available");
                    setMachineType("washer");
                    setCapacityKg("");
                    setPricePerCycle("");
                } else {
                    alert("Échec de l'ajout de la machine");
                }
                getWashingMachines();
            })
            .catch((error) => alert(error));
    }

    return (
        <div>
            <div>
             {/* Add Logout Button  */}
                <button className="logout-button" onClick={() => {window.location.href = '/logout';}}>
                    Logout
                </button>
            </div>
            <div className="machines-section">
                <h2>Mes Machines à Laver</h2>
                <div className="machines-grid">
                {washingMachines.map((machine) => (
                    <Machines 
                        key={machine.id} 
                        machines={machine} 
                        onDelete={deleteWashingMachine}
                        onUpdate={updateWashingMachineStatus}
                    />
                ))}
                </div>
            </div>
            <h2>Ajouter une Machine</h2>
            <form onSubmit={addWashingMachine}>
                <label htmlFor="Name">Nom:</label>
                <br />
                <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    required 
                    onChange={(e) => setName(e.target.value)} 
                />

                <label htmlFor="Status">Statut:</label>
                <br />
                <select 
                    id="status" 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="available">Disponible</option>
                    <option value="in_use">En cours d'utilisation</option>
                    <option value="maintenance">En maintenance</option>
                    <option value="out_of_order">Hors service</option>
                </select>

                <label htmlFor="MachineType">Type de Machine:</label>
                <br />
                <select 
                    id="machineType" 
                    value={machineType} 
                    onChange={(e) => setMachineType(e.target.value)}
                >
                    <option value="washer">Lave-linge</option>
                    <option value="dryer">Sèche-linge</option>
                </select>

                <label htmlFor="CapacityKg">Capacité (kg):</label>
                <br />
                <input 
                    type="number" 
                    min="0"
                    id="capacityKg" 
                    value={capacityKg} 
                    onChange={(e) => setCapacityKg(e.target.value)} 
                    required 
                    placeholder="Capacité (kg)" 
                />

                <label htmlFor="PricePerCycle">Prix par cycle (€):</label>
                <br />
                <input 
                    type="number" 
                    min="0"
                    step="0.01" 
                    id="pricePerCycle" 
                    value={pricePerCycle} 
                    onChange={(e) => setPricePerCycle(e.target.value)} 
                    required 
                    placeholder="Prix par cycle (€)" 
                />

                <br />
                <input type="submit" value="Ajouter une Machine" />
            </form>
        </div>
    );
}

export default Home;