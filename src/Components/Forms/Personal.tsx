"use client";
import React, { useState } from 'react';

const PersonalDetailsForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    contactNumber: '',
    maritalStatus: '',
    numberOfChildren: '',
    description: ''
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log('Form data:', formData);
  };


  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  pt-[83.5px] font-lato bg-[#E65555] ">
      <div className=" w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Add your personal details</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block  text-white">Your name*</label>
            <div className="flex space-x-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-1/2 p-2  rounded bg-[#F9F5FFE5]"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-1/2 p-2 border border-gray-300 rounded bg-[#F9F5FFE5]"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block  text-white">Display name</label>
            <input
              type="text"
              name="displayName"
              placeholder="Display name"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded bg-[#F9F5FFE5]"
            />
          </div>

          <div className="mb-4">
            <label className="block  text-white">Contact number*</label>
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full p-2 border-none bg-[#F9F5FFE5]  rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block  text-white">Marital status*</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="w-full p-2 border  rounded bg-[#F9F5FFE5] text-[#838E9E]"
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {formData.maritalStatus === 'Yes' && (
                <div className="mb-4">
            <label className="block   text-white">Number of children</label>
            <select
              name="numberOfChildren"
              value={formData.numberOfChildren}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-[#F9F5FFE5] text-[#838E9E]"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
            )}

          <div className="mb-4">
            <label className="block text-white">Description about yourself*</label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded bg-[#F9F5FFE5]"
              required
            ></textarea>
          </div>

          <div className="relative -right-[50rem]">
            <button type="submit" className=" bg-[#F9F5FFE5] text-[#E65555]  px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
