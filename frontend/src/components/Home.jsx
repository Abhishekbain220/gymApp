import React, { useContext, useEffect, useState, useRef } from 'react';
import { AdminContext } from '../utils/AdminContext';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Form from './Form';
import { MemberContext } from '../utils/MemberContext';
import { toast } from 'react-toastify';
import { Loader } from 'lucide-react';

const Home = () => {
  let {user, setUser, token, setToken, loading, setLoading } = useContext(AdminContext);
  let {
    month, setMonth, name, setName, phone, setPhone, submitHandler,
    updateSwitch, setUpdateSwitch, UpdateHandler, id, setId,
    getMember, member, setMember, email, setEmail
  } = useContext(MemberContext);
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [updateLoading, setUpdateLoading] = useState(null)
  

  let navigate = useNavigate();
  

  // 👇 Ref for form scroll
  const formRef = useRef(null);

  let getUser = async () => {
    try {
      let { data } = await axios.get("/user/currentUser");
      setUser(data.user.username);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      localStorage.removeItem("authToken");
      setToken(null);
    }
  };

  useEffect(() => {
    getMember();
  }, [id]);

  let findOne = async (id) => {
    try {
      let { data } = await axios.get(`/member/viewOne/${id}`);
      setName(data.member.name);
      setPhone(data.member.phone);
      setMonth(data.member.month);
      setEmail(data.member.email)
      setId(id);
      setUpdateSwitch(true);
      setUpdateLoading(null)

      // 👇 Smooth scroll to the form
      window.scrollTo({ top: 0, behavior: 'smooth' });


    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  let deleteHandler = async (id) => {
    try {
      setDeleteLoading(id)
      let { data } = await axios.delete(`/member/deleteMember/${id}`);
      setLoading(false)
      getMember();
      toast.success(data.message)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getUser();
    }
  }, [token, navigate]);

  return user ? (
    <div className="mt-5 min-h-screen bg-gradient-to-r from-black via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto text-white py-10">
        <h1 className="text-4xl font-bold mb-6 text-center">Welcome, {user} 👋</h1>

        {/* 👇 Ref attached here */}
        <div ref={formRef} className="mb-10">
          {!updateSwitch ? (
            <Form functionHandler={submitHandler} button={"Submit"} heading={"Add New Member"} />
          ) : (
            <Form functionHandler={UpdateHandler} button={"Update"} heading={"Update Member"} />
          )}
        </div>

        {/* Member List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {member && member.map((m, i) => (
            <div key={i} className="bg-white text-gray-800 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-semibold mb-2">{m.name}</h2>
              <p className="mb-1">📞 {m.phone}</p>
              <p className="mb-4">🗓 Subscription Month: {m.month}</p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    findOne(m._id)
                    setUpdateLoading(m._id)
                  }}
                  className="bg-gray-800 text-white  hover:bg-black py-2 px-4 rounded-xl font-medium  transition duration-300"
                >
                  {updateLoading == m._id && (
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
                      )}{updateLoading == m._id ? '' : 'Update'}
                </button>

                <div className='flex justify-center'>
                  <div className='flex justify-center'>
                    <button onClick={() => deleteHandler(m._id)}
                      type="submit"
                      className="flex items-center text-center px-4 py-2  bg-gray-800 text-white  hover:bg-black rounded-lg disabled:opacity-50"
                    >
                      {deleteLoading == m._id && (
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
                      )}{deleteLoading == m._id ? '' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (<Loader />);
};

export default Home;
