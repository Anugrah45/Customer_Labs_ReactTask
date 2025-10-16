import {configureStore} from '@reduxjs/toolkit'
import ProcedureReducer from './slices/procedureSlice'


export const store=configureStore({
    reducer:{
        procedures:ProcedureReducer
    }
})