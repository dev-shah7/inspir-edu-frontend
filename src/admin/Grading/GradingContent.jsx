import React from "react";
import { useForm } from "react-hook-form";
import useModalStore from "../store/useModalStore";
import ProceedToNextStepContent from "../proceedToNextSection/ProceedToNextStepContent";

const GradingContent = () => {
  const { closeModal, queueModal } = useModalStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    queueModal("Proceed To Next", <ProceedToNextStepContent />);
    closeModal();
  };

  return (
    <div className="my-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-16">
        <div>
          <label className="block mb-2 text-md font-light text-[#0F172A]">
            Enter Percentage
          </label>
          <input
            type="number"
            {...register("percentage", {
              required: "Percentage is required",
              min: {
                value: 0,
                message: "Percentage cannot be less than 0",
              },
              max: {
                value: 100,
                message: "Percentage cannot be more than 100",
              },
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Percentage"
          />
          {errors.percentage && (
            <p className="text-md text-red-500">{errors.percentage.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-md font-light text-[#0F172A]">
            Add Instructions/ Guidelines about the Course for the Students
          </label>
          <textarea
            {...register("instructions", {
              required: "Instructions are required",
            })}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Enter instructions or guidelines"
          ></textarea>
          {errors.instructions && (
            <p className="text-md text-red-500">
              {errors.instructions.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-light rounded-md hover:bg-blue-600 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default GradingContent;
