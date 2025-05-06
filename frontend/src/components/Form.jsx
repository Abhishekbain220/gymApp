import React, { useContext } from 'react';
import { MemberContext } from '../utils/MemberContext';
import { AdminContext } from '../utils/AdminContext';

const Form = ({ functionHandler, button,heading }) => {
  let { month, setMonth, name, setName, phone, setPhone,email, setEmail } = useContext(MemberContext);
  let {loading,setLoading}=useContext(AdminContext)

  return (
    <div className="bg-white text-black p-8 rounded-3xl shadow-2xl w-full max-w-lg mx-auto mb-10">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">{heading}</h1>
      <form onSubmit={functionHandler} className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Enter Name"
            value={name}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            name="phone"
            placeholder="Enter Phone Number"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>
        {/* Email Input */}
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            placeholder="Enter Eamil"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>

        {/* Month Radio */}
        <div>
          <label className="block text-gray-700 mb-2">Subscription Month</label>
          <div className="flex items-center text-black space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                onChange={(e) => setMonth(Number(e.target.value))}
                checked={month == 1}
                name="month"
                value={1}
                className="accent-gray-800"
              />
              <span>1 Month</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                onChange={(e) => setMonth(Number(e.target.value))}
                checked={month == 3}
                name="month"
                value={3}
                className="accent-gray-800"
              />
              <span>3 Months</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-center'>
        <button onClick={()=>setLoading(true)}
          type="submit"
          className="flex items-center text-center px-4 py-2  bg-gray-800 text-white rounded-lg hover:bg-black disabled:opacity-50"
        >
          {loading && (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}{loading ? 'Loading...' : `${button}`}
        </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
