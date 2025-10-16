import React, { useState } from "react";
import "./App.css";
import Modal from "./Common/Modal";
import {useDispatch, useSelector} from 'react-redux'
import { setSearchQuery } from "./slices/procedureSlice"; 

const App = () => {
  const [isPortOpen, setIsPortOpen] = useState(false);
  const dispatch = useDispatch();
  const {searchQuery, } = useSelector(s=>s.procedures);

  const handleModalOpen = () => {
    setIsPortOpen(true);
  };
  const handleCloseModal = () => {
    setIsPortOpen(false);
  };
  const initialTable = [
    {
      id: 1,
      code: "56220",
      name: "CT Cervical Spine without Contrast",
      category: "CTC - CT Cervical",
      feeLevel: "Medicare",
      amount: 250.56,
      gap: 0.0,
    },
    {
      id: 2,
      code: "56221",
      name: "CT Cervical Spine with Contrast",
      category: "CTC - CT Cervical",
      feeLevel: "Private",
      amount: 320.75,
      gap: 15.0,
    },
  ];
const onSearchChange=(e)=>{
  dispatch(setSearchQuery(e.target.value))
}
const amount_rate = initialTable.reduce((arr,red)=>red.amount+arr,0)
  return (
    <div>
      <button onClick={handleModalOpen}>Add Port</button>
      {isPortOpen && (
        <Modal onClose={handleCloseModal} isOpen={handleModalOpen}>
          <div className="flex gap-2 justify-between">
            <div className="flex flex-col gap-2.5">
              <div className="w-24 h-24 border border-white flex flex-col justify-center items-center bg-[#111c2d] rounded">
                <div className="rounded-full p-1 bg-[#01C0C842] items-center justify-center text-xl w-[38px] h-[38px] cursor-pointer">
                  <div className="flex items-center justify-center">+</div>
                </div>
                <div>Add patient</div>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="procedure"
                  className="bg-[#111c2d] border-2 border-white  text-white"
                  onChange={onSearchChange}
                  value={searchQuery}
                />
                <select className="bg-[#111c2d] text-white w-28">
                  <option>NSW</option>
                  <option>Australia</option>
                  <option>Singapore</option>
                </select>
              </div>
              <div className="w-[50%]">
                <input
                  type="text"
                  placeholder="Type subject line"
                  className="bg-[#111c2d] border-2 border-white h-[14px] w-72 text-white"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-end gap-2.5">
                <label htmlFor="Quote No">Quote No</label>
                <input
                  type="text"
                  className="bg-[#111c2d] border-2 border-white text-white"
                />
              </div>
              <div className="flex justify-end gap-2.5">
                <label htmlFor="Quote No">Date of issue:</label>
                <input
                  type="text"
                  className="bg-[#111c2d] border-2 border-white text-white"
                />
              </div>
              <div className="flex justify-end gap-2.5">
                <label htmlFor="Quote No">fee level</label>
                <select className="bg-[#111c2d] text-white w-[170px]">
                  <option>NSW</option>
                  <option>Australia</option>
                  <option>Singapore</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full h-10 border bg-[#2EACBA17] border-gray-200 flex justify-between items-center">
              <div>

                </div>
                <div className="mr-2">
                 ${amount_rate}
                </div>

            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Item code</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Gap</th>
                  <th>Free Level</th>
                </tr>
              </thead>
              <tbody>
                {initialTable.map((item) => (
                  <tr>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{item.amount}</td>
                    <td>{item.gap}</td>
                    <td>{item.feeLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;
