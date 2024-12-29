import { FiArrowLeft } from "react-icons/fi"

export const BackButton = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className='inline-flex items-center gap-2 px-6 py-2.5 bg-blue-500 text-white font-semibold rounded
                          shadow-md hover:bg-blue-600 hover:shadow-none transition-all duration-200 ease-in-out
                          focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2'
      aria-label='Go back to previous page'
    >
      <FiArrowLeft className='w-5 h-5' />
      Back
    </button>
  )
}
export default BackButton;