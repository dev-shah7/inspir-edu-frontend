import React from "react";

const Card = ({ title, buttonText, onClick }) => {
  return (
    <div className="w-[24rem] h-[15rem] bg-gradient-to-b from-[#95C3FF] to-[#929FF5] rounded-xl shadow-xl flex flex-col justify-between p-6">
      <h2 className="text-white text-4xl font-light">{title}</h2>
      <div className="flex justify-center">
        <div className="text-center">
          <button
            onClick={onClick}
            className="bg-button-blue text-white font-semibold text-xl py-4 px-10 rounded-xl hover:bg-blue-700 transition text-center shadow-lg"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
