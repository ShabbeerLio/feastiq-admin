import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import NoteContext from "../../Context/NoteContext";
import "./Plans.css";
import AddItem from "../../Components/Plans/AddItem";

const Plans = () => {
  const { notes, getDetails } = useContext(NoteContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedHome] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getDetails();
    }
  }, [navigate]);

  const openModal = (plan = null) => {
    setSelectedHome(plan);
    setModalOpen(true);
  };


  return (
    <div className="Home">
      <div className="Home-main">
        <div className="Home-button">
          <h3>Appointments</h3>
        </div>
        <div className="Home-button">
          <h5>Plans</h5>
        </div>
        <div className="Home-box appointment-plan">
          {notes?.length > 0 &&
            notes.map((j) =>
              j.plan.map((k) => (
                <div className="Home-card" key={k._id}>
                  <div className="Home-card-head">
                    <h5>{k.plan}</h5>
                    <div className="Home-card-button">
                      <p onClick={() => openModal(k)}>
                        <MdEdit />
                      </p>
                    </div>
                  </div>
                  <div className="Home-card-box">
                    <p>
                    Description: <span>{k.description}</span>
                    </p>
                    <p>
                      Sales Price: <span>₹ {k.price}</span>
                    </p>
                    <p>
                      Cost Price: <span>₹ {k.slprice}</span>
                    </p>
                    <p>
                      Tag: <span>{k.tag}</span>
                    </p>
                  </div>
                </div>
              ))
            )}
        </div>
      </div>

      {modalOpen && (
        <AddItem
          closeModal={() => setModalOpen(false)}
          planData={selectedPlan}
        />
      )}
    </div>
  );
};

export default Plans;
