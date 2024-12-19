import React from "react";

const Card = ({ title, buttonText, onClick }) => {
  return (
    <div className="w-[20rem] h-[12rem] bg-gradient-to-b from-[#95C3FF] to-[#929FF5] rounded-lg shadow-lg flex flex-col justify-between p-4">
      <h2 className="text-white text-3xl font-light">{title}</h2>
      <div className="flex justify-center">
        <div className="text-center">
          <button
            onClick={onClick}
            className="bg-button-blue text-white font-medium text-md py-3 px-8 rounded-lg hover:bg-blue-700 transition text-center"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
