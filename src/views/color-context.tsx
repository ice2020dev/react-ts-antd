import React, {createContext, Dispatch, useReducer} from 'react'
import {AjustmentAction,reducer} from './reducer'
import {RGBColorType} from './types'
const inititalState = {
    red:0,
    green:0,
    blue:0
}
interface RGBContextType extends RGBColorType{
    dispatch:Dispatch<AjustmentAction>
}
export const RGBContext = createContext<RGBContextType>(inititalState as RGBContextType)

export const RGBProvider = ({children}:{children:React.ReactNode})=>{
    const [rgb,dispatch] = useReducer(reducer,inititalState)
 return (
    <RGBContext.Provider value={{
        ...rgb,
        dispatch
    }}>
        {children}
    </RGBContext.Provider>
 )
}