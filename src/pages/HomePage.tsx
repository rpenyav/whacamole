import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { topo } from "../assets/";
import { ButtonRounded } from "../components/";

const Home: React.FC = () => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background-image",
      `url(${topo})`
    );
  }, []);

  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim() === "") {
      alert("Name is required");
      return;
    }
    localStorage.setItem("userName", name);
    navigate("/game");
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="back-topo">
          <div className="d-flex justify-content-center">
            <div className="w-50">
              <input
                type="text"
                className="form-control mb-3"
                value={name}
                onChange={(e) => {
                  if (e.target.value.length <= 30) {
                    setName(e.target.value);
                  }
                }}
                placeholder="Enter your name"
              />
              <ButtonRounded
                color="home"
                text="Start Game"
                onClick={handleSubmit}
                disabled={name.trim() === ""}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
