import React, { useState } from 'react';
import "../styles/Machines.css";
import washerImage from '../assets/Washer.jpeg';
import dryerImage from '../assets/Dryer.jpeg';

function Machines({ machines, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newStatus, setNewStatus] = useState(machines.status);

    const handleUpdate = () => {
        onUpdate(machines.id, newStatus);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setNewStatus(machines.status);
        setIsEditing(false);
    };

    return ( 
        <div className="machines-container">
            <p className="machine-name">{machines.name}</p>
            <img src={machines.machine_type === 'washer' ? washerImage : dryerImage} alt="Laverie automatique" width="300" />
            
            {!isEditing ? (
                <p className={`machine-status ${machines.status}`}>{machines.status}</p>
            ) : (
                <select 
                    className="status-select" 
                    value={newStatus} 
                    onChange={(e) => setNewStatus(e.target.value)}
                >
                    <option value="available">Disponible</option>
                    <option value="in_use">En cours d'utilisation</option>
                    <option value="maintenance">En maintenance</option>
                    <option value="out_of_order">Hors service</option>
                </select>
            )}
            
            <p className="machine-type">{machines.machine_type}</p>
            <p className="machine-capacity">{machines.capacity_kg} kg</p>
            <p className="machine-price">{machines.price_per_cycle} €</p>
            
            <div className="button-group">
                {!isEditing ? (
                    <>
                        <button className="update-button" onClick={() => setIsEditing(true)}>
                            Modifier le statut
                        </button>
                        <button className="delete-button" onClick={() => onDelete(machines.id)}>
                            Supprimer
                        </button>
                    </>
                ) : (
                    <>
                        <button className="save-button" onClick={handleUpdate}>
                            Sauvegarder
                        </button>
                        <button className="cancel-button" onClick={handleCancel}>
                            Annuler
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Machines;