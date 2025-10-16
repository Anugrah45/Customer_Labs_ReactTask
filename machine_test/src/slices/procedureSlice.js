import { createSlice } from "@reduxjs/toolkit";

  const initialProcedures = [
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
  const feeLevels=[
{ id: 1, label: "Medicare" },
{ id: 2, label: "Private" },
{ id: 3, label: "Bulk Billed" },
{ id: 4, label: "Corporate" },
];

const locations= [
{ id: 1, code: "NSW", name: "New South Wales Clinic" },
{ id: 2, code: "QLD", name: "Queensland Diagnostic Center" },
{ id: 3, code: "VIC", name: "Victoria Imaging" },
{ id: 4, code: "WA", name: "Western Australia Radiology" },
];

const initialState={
    procedures:initialProcedures,
    feeLevels,
    locations,
    searchQuery:'',
    description:''
}

const proceduresSlice=createSlice({
    name:'procedures',
    initialState,
    reducers:{
        setSearchQuery(state,action){
            console.log(state, action, 'how');
            state.searchQuery= action.payload
        },
        setFeeLevels(state,action){
            state.feeLevels = action.payload
        },
        setDescription(state,action){
             state.description=action.payload
        }
    }

})

export const {setSearchQuery, setFeeLevels, setDescription} = proceduresSlice.actions;
export default proceduresSlice.reducer;