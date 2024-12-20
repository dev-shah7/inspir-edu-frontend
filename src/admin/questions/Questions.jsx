import React from "react";
import { useParams } from "react-router";
import Table from "../common/Table/Table";
import { dummyQuestions } from "../../static/data";
import CustomButton from "../../components/common/CustomButton/CustomButton";

const Questions = () => {
  const { moduleId } = useParams();
  const headers = [
    { label: "Question", align: "left" },
    { label: "Answer", align: "left" },
    { label: "Question Type", align: "center" },
    { label: "Action", align: "center" },
  ];

  const renderRow = (question) => (
    <>
      <tr className="hover:bg-gray-50 transition">
        <td className="p-4">{question.question}</td>
        <td className="p-4">{question.answer}</td>
        <td className="p-4 text-center">{question.type}</td>
        <td className="p-4 text-center">
          <div className="flex gap-2 justify-center">
            <CustomButton
              text="Edit"
              className="w-auto bg-blue-900 hover:bg-gray-600"
              onClick={() => alert("Edit Clicked!")}
            />
            <CustomButton
              text="Delete"
              className="w-auto bg-red-600 hover:bg-red-500"
              onClick={() => alert("Delete Clicked!")}
            />
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={headers.length}>
          <div className="h-0.5 bg-gradient-to-r from-custom-border-blue to-transparent"></div>
        </td>
      </tr>
    </>
  );

  return (
    <>
      <p className="text-md text-gray-600 mb-8">
        Courses / Modules / Questions
      </p>
      <h1 className="mt-4 text-3xl font-bold text-gray-800"> All Questions for Module ID&nbsp;:&nbsp; {moduleId}</h1>
      <div className="mt-4 h-0.5 bg-gradient-to-r from-custom-div-blue to-transparent"></div>
      <Table headers={headers} data={dummyQuestions} renderRow={renderRow} />
    </>
  );
};

export default Questions;
