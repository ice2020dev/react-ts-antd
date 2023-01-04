import {RGBColorType}  from './types'

const colors = ['red','green','blue'] as const
type Colors = Uppercase<typeof colors[number]>
export type AjustmentAction = {
    type:`ADJUST_${Colors}` // 字符串模版
    payload:number
}

export const reducer = (state:RGBColorType,action:AjustmentAction):RGBColorType =>{
  for(const color of colors){
    if(action.type===`ADJUST_${color.toUpperCase()}`){
      return {...state,[color]:action.payload}
    }
  }
  return state
}