import React, { useState } from "react";
import UserModal from "../modal";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const openModal = (index = null) => {
    setEditingIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingIndex(null);
  };

  const handleSaveCar = (newCar) => {
    if (editingIndex !== null) {
      const updatedCars = [...cars];
      updatedCars[editingIndex] = newCar;
      setCars(updatedCars);
    } else {
      setCars([...cars, newCar]);
    }
    closeModal();
  };

  const handleEditCar = (index) => {
    openModal(index);
  };

  const handleDeleteCar = (index) => {
    const updatedCars = [...cars];
    updatedCars.splice(index, 1);
    setCars(updatedCars);
    closeModal();
  };

  return (
    <>
      <UserModal
        open={modalOpen}
        onClose={closeModal}
        car={editingIndex !== null ? cars[editingIndex] : null}
        onSave={handleSaveCar}
      />
      <div className="container">
        <h1>CARS</h1>
        <div className="row mt-3">
          <div className="col-md-12 offset-1">
            <div className="row">
              <div className="col-4">
                <button className="btn btn-success" onClick={() => openModal()}>
                  Add Car
                </button>
              </div>
              <div className="col-5">
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <table className="table">
            <thead>
              <tr>
                <th>T/R</th>
                <th>Name</th>
                <th>Price</th>
                <th>Year</th>
                <th>Color</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{car.name}</td>
                  <td>{car.price}</td>
                  <td>{car.year}</td>
                  <td>{car.color}</td>
                  <td>{car.brand}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-info"
                        onClick={() => handleEditCar(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteCar(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Cars;
