### 1. name type props
```js
type NameTagProps = {
  name:string,
  greeting?:string
}
const Login=({name,greeting='hello'}:NameTagProps)=>{
  return (
    <main>
        <head>
            <h1>{greeting}</h1>
            <p>My name is</p>
        </head>
        <section>
            <p>{name}</p>
        </section>
    </main>
  )
}
export default Login
```
### 2.递归嵌套node
```js
import * as React from "react"

type BoxProps = {children:React.ReactNode,style?:React.CSSProperties}

const Box = ({children,style}:BoxProps)=>{
   return (
    <section style={{padding: "1em", border: "5px solid purple", ...style }}>
       {children}
    </section>
   
   )
}

export default function Application(){
  return (
    <Box>
      Just a string
      <p>some Html that is not nested</p>
      <Box style={{borderColor:'red'}}>
        <h2>another react compoennt with one child</h2>
      </Box>
      <Box>
        <h2>a nested React compoennt with two children</h2>
        <p>the second child</p>
      </Box>
    </Box>
  )
}
```
### 3.list遍历
```js
import * as React from "react"
type QuestionType = {
  id:number,
  question:string,
  answer:string
}

type QuestionProps = Pick<QuestionType,'question'| 'answer'>
const questions:QuestionType[] = [
  {
    id: 1,
    question: 'What song is playing at the beginning of Iron Man (2008)?',
    answer: '"Back in Black" by AC/DC'
  },
  {
    id: 2,
    question: 'What elective class did Thor take on Asgard?',
    answer: 'Speaking Groot'
  },
  {
    id: 3,
    question: 'Which is the first Inifity Stone that Thanos acquired?',
    answer: 'The Power Stone'
  }
]

const Question = ({question,answer}:QuestionProps)=>{
  return (
    <article className="question">
    <header>{question}</header>
    <p className="answer">
      <span className="blurred">{answer}</span>
    </p>
    <footer>
      <button>Toggle Answer</button>
    </footer>
  </article>
  )
}
export default function Application(){
  return (
    <main>
    {
     questions.map((q)=>
     <Question question={q.question} answer={q.answer} key={q.id+'_key'}></Question>
 )
    }
 </main>
  )
}
```

### 4.useState用法
```js
const Question = ({question,answer}:QuestionProps)=>{
  const [hidden,toggleHidden] = useState(true)
  return (
    <article className="question">
    <header>{question}</header>
    <p className="answer">
      <span className="blurred">{answer}</span>
      <span className={hidden ? 'blurred' : 'visibled'}>isHidden:{hidden}</span>

    </p>
    <footer>
      <button onClick={()=>toggleHidden(!hidden)}>Toggle Answer</button>
    </footer>
  </article>
  )
}
```

### 5.useEffect用法,高阶组件,模拟数据请求
```js
// character.ts
const datas = [
    {
        "name": "3-D Man",   
        "strength": 31,     
        "combat": 52,
        "total": 233,
        "key":'1'
      },
      {
        "name": "A-Bomb",
        "strength": 100,
        "combat": 64,
        "total": 316,
        "key":'2'
      }
]
 export type CharacterType = {
    name:string,
    strength: number;
    combat: number;
    total: number;
    key:string
 }

 export const fetchCharacter = ():Promise<CharacterType[]>=>{
  return Promise.resolve(datas)
 }
```
```js
// app.tsx
import {useState,useEffect} from "react"
import { CharacterType,fetchCharacter } from "./characters"
import {Table} from 'antd'
import type { ColumnsType} from 'antd/es/table'

type CharacterInfoProps = {
  dataSource:CharacterType[],
  columns:ColumnsType<CharacterType>
}
const tableColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '力量',
    dataIndex: 'strength',
    key: 'strength',
  },
  {
    title: '评论',
    dataIndex: 'combat',
    key: 'combat',
  },
  {
    title: '总数',
    dataIndex: 'total',
    key: 'total',
  }
]
const CharacterInfo = ({dataSource,columns=tableColumns}:CharacterInfoProps)=>{
  return (
    <Table dataSource={dataSource} columns={columns}></Table>
  )
}
const Loading = ()=>(
  <div>loading...</div>
)
const withCharacter =(Component:any)=>{
  return ()=>{
    const [loading,setLoading]=useState(true)
    const [character,setCharacter]=useState<CharacterType[]|null>(null)
    useEffect(()=>{
      fetchCharacter().then(res=>{
        setCharacter(res)
        setLoading(false)
      })
    })
    if(loading) return <Loading />
    return <Component dataSource={character} />
  }
}
const CharacterInfomationWithCharacter = withCharacter(CharacterInfo)
export default function Application(){
  return (
    <main>
      <CharacterInfomationWithCharacter />
     </main>
  )
}
```

### 6.class component
```js
import { useState,useEffect, Component, ReactNode, ChangeEvent } from "react";

type CounterProps = {
  incident:string
}
type CounterState ={
  count:number
}
class Counter extends Component<CounterProps,CounterState>{
  state:CounterState={
    count:0
  }
  increment=()=>{
    this.setState(({count})=>({count:count+1}))
  }
  decrement=()=>{
    this.setState(({count})=>({count:count-1}))
  }
  reset=()=>{
    this.setState({
      count:0
    })
  }
  changeCount(event:ChangeEvent<HTMLInputElement>){
    this.setState({ count: +event.target.value });
  }
  render(){
    const {incident} = this.props
    const {count} = this.state
     return (
      <main className="Counter">
      <h1>Days Since Last {incident}</h1>
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.reset}>Reset</button>
        <button onClick={this.decrement}>Decrement</button>
      </section>
      <section className="controls">
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label htmlFor="set-to">Set Count</label>
          <input id="set-to" type="number" onChange={this.changeCount.bind(this)}/>
        </form>
      </section>
    </main>
     )
  }
}

class Application extends Component{
  render() {
    return <Counter incident={'Coffee Spill'}/>
  }
}
export default Application
```
### 7.hooks+event
```js
import {useState,ChangeEvent} from 'react'
const Counter = () => {
   const [count,setCount] = useState(0)
   const ChangeCount = (event:ChangeEvent<HTMLInputElement>)=>{
    setCount(+event.target.value)
   }
  return (
    <main className="Counter">
      <h1>Days Since Last Incident</h1>
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={()=>setCount(count+1)}>Increment</button>
        <button onClick={()=>setCount(0)}>Reset</button>
        <button onClick={()=>setCount(count-1)}>Decrement</button>
      </section>
      <section className="controls">
        <form onSubmit={() => {}}>
          <label htmlFor="set-to">Set Count</label>
          <input id="set-to" type="number" onChange={(e)=>setCount(+e.target.value)}/>
          <input id="set-to" type="number" onChange={ChangeCount}/>

          <input type="submit" />
        </form>
      </section>
    </main>
  );
};

const Application = () => <Counter />;

export default Application;

```
### 8.父组件传递函数给子组件
```js
import {useState, FormEvent} from 'react'
import {fetchDogFacts,DocFactType} from './characters'
type FromProps = {
  onSubmit:(n:number)=>void
}
const From = ({onSubmit}:FromProps)=>{
  const [value,setValue]=useState(1)
  const handleSubmit =(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    onSubmit(value)
  }
 return (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="number-for-facts">Number of Dog Facts</label>
      <input value={value} type="number" id="number-for-facts" min="1" max="10" onChange={(e)=>setValue(+e.target.value)}/>
    </div>
    <input type="submit" value="Fetch Dog Facts"/>
  </form>
 )
}
const Fact = ({fact}:{fact:string})=>{
  return (
    <article>
      <h3>Dog Fact</h3>
      <p>{fact}</p>
    </article>
  )
}
const Application = () =>{
  const [facts,setFacts] = useState<DocFactType[]>([])
  const handleSubmit =(n:number)=>{
     fetchDogFacts(n).then((facts:DocFactType[])=>{
        setFacts(facts)
     })
  }
  return (
    <main>
      <From onSubmit={handleSubmit}/>
      <section>
         {
          facts.map(item=>{
            return <Fact fact={item.fact} key={item.id}/>
          })
         }
      </section>
    </main>
   
  )
};

export default Application;

```

```js
// character.js
import _ from 'lodash'
const datas = [
    {
        id: 0,
        fact:
          'All dogs can be traced back 40 million years ago to a weasel-like animal called the Miacis which dwelled in trees and dens. The Miacis later evolved into the Tomarctus, a direct forbear of the genus Canis, which includes the wolf and jackal as well as the dog.'
      },
      {
        id: 1,
        fact:
          'Ancient Egyptians revered their dogs. When a pet dog would die, the owners shaved off their eyebrows, smeared mud in their hair, and mourned aloud for days.'
      },
      {
        id: 2,
        fact:
          'Small quantities of grapes and raisins can cause renal failure in dogs. Chocolate, macadamia nuts, cooked onions, or anything with caffeine can also be harmful.'
      },
      {
        id: 3,
        fact: 'Apple and pear seeds contain arsenic, which may be deadly to dogs.'
      },
      {
        id: 4,
        fact:
          'Rock star Ozzy Osborne saved his wife Sharon’s Pomeranian from a coyote by tackling ad wresting the coyote until it released the dog.'
      },
      { id: 5, fact: 'Dogs have sweat glands in between their paws.' },
      {
        id: 6,
        fact:
          'In 2003, Dr. Roger Mugford invented the "wagometer," a device that claims to interpret a dog’s exact mood by measuring the wag of its tail.'
      },
      {
        id: 7,
        fact:
          'Dogs have three eyelids. The third lid, called a nictitating membrane or "haw," keeps the eye lubricated and protected.'
      },
      {
        id: 8,
        fact:
          'A dog’s shoulder blades are unattached to the rest of the skeleton to allow greater flexibility for running.'
      },
      {
        id: 9,
        fact:
          'Puppies are sometimes rejected by their mother if they are born by cesarean and cleaned up before being given back to her.'
      },
]
 export type DocFactType = {
   id:number,
   fact:string
 }

 export const fetchDogFacts = (n:number):Promise<DocFactType[]>=>{
  return Promise.resolve(datas).then(res=>{
     return _.shuffle(res).slice(0,n)
  })
 }
 
```

### 9.通过reducer修改state;dispatch和state作为prop传递
```js
import { useReducer,Dispatch} from 'react'

type PizzaData = {
  numberOfPeople: number;
  slicesPerPerson: number;
  slicesPerPie: number;
}
type PizzaState = PizzaData & {pizzasNeeded:number}
type PizzaAction = {
  type: 'UPDATE_NUMBER_OF_PEOPLE'
  | 'UPDATE_SLICES_PER_PERSON'
  | 'UPDATE_SLICES_PER_PIE';
  payload:number
}
const Caculation = ({count}:{count:number})=>{
  return (
    <section>
      <p>{count}</p>
      <p>pizzas Needed</p>
    </section>
  )
}
const Caculator = ({state,dispatch}:{state:PizzaState,dispatch:Dispatch<PizzaAction>})=>{
   return (
    <form>
      <label htmlFor='number-of-people'>Number</label>
      <input 
      type="number"
       id="number-of-people"
       value={state.numberOfPeople}
       onChange={(event)=>dispatch({type: 'UPDATE_NUMBER_OF_PEOPLE',
       payload: +event.target.value})}
      />
       <label htmlFor="slices-per-person">Slices Per Person</label>
      <input
        id="slices-per-person"
        type="number"
        value={state.slicesPerPerson}
        onChange={(event) =>
          dispatch({
            type: 'UPDATE_SLICES_PER_PERSON',
            payload: +event.target.value
          })
        }
      />
      <label htmlFor="slices-per-Pie">Slices Per Pie</label>
      <input
        id="slices-per-Pie"
        type="number"
        value={state.slicesPerPie}
        onChange={(event) =>
          dispatch({
            type: 'UPDATE_SLICES_PER_PIE',
            payload: +event.target.value
          })
        }
      />
    </form>
   )
}
const innitialState:PizzaState={
  numberOfPeople: 8,
  slicesPerPerson: 2,
  slicesPerPie: 8,
  pizzasNeeded: 2
}
const calculatePizzasNeeded = ({
  numberOfPeople,
  slicesPerPerson,
  slicesPerPie
}: PizzaData): number => {
  return Math.ceil((numberOfPeople * slicesPerPerson) / slicesPerPie);
};
const addPizzasNeededToPizzaData = (data:PizzaState)=>{
  return {...data,pizzasNeeded:calculatePizzasNeeded(data)}
}
const reducer = (state:PizzaState,action:PizzaAction)=>{
  if(action.type==='UPDATE_NUMBER_OF_PEOPLE'){
   return addPizzasNeededToPizzaData({
    ...state,
    numberOfPeople:action.payload
   })
  }
  if (action.type === 'UPDATE_SLICES_PER_PERSON') {
    return addPizzasNeededToPizzaData({
      ...state,
      slicesPerPerson: action.payload
    });
  }

  if (action.type === 'UPDATE_SLICES_PER_PIE') {
    return addPizzasNeededToPizzaData({
      ...state,
      slicesPerPie: action.payload
    });
  }

  return state;
}
const Application = () =>{
  const [state,dispatch] = useReducer(reducer,innitialState)
  return (
    <main>
      <Caculation count={state.pizzasNeeded}></Caculation>
      <Caculator state={state} dispatch={dispatch}></Caculator>
    </main>
   
  )
};

export default Application;

```
### 10.dispatch 组件内自行调用
```js
import { Dispatch, Reducer, useReducer } from "react";

type CounterAction = {
  type: 'INCREMENT' | 'DECREMENT' ;
}
type SetCounterAction = {
  type:  'RESET';
  payload?:number
}
type CounterState = {
  value:number
}

const reducer = (state:CounterState,action:CounterAction|SetCounterAction)=>{
  switch(action.type){
    case 'INCREMENT':
   return {value:state.value+1}
   case 'DECREMENT':
    return {value:state.value-1}
    case 'RESET':
    return {value:0}
    default:
      return state
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  const increment = () => dispatch({ type: 'INCREMENT' });
  const decrement = () => dispatch({ type: 'DECREMENT' });
  const reset = () => dispatch({ type: 'RESET', payload: 0 });

  return (
    <main className="Counter">
      <h1>Days Since Last Incident</h1>
      <p className="count">{state.value}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={reset}>Reset</button>
        <button onClick={decrement}>Decrement</button>
      </section>
    </main>
  );
};
const Application = () => <Counter />;

export default Application;
```

### 11.reducer,types拆分不同文件里
```js
// app.tsx
import { ChangeEvent, Dispatch, useReducer } from "react";
import {reducer} from './reducer'
import { RGBColorType } from "./types";
const toRGB = (rgb:RGBColorType)=>{
  return `rgb(${rgb.red},${rgb.green},${rgb.blue})`
}
interface ColorSlidersProp {
  id:string;
  value:number;
  label:string;
  onChange:(e:ChangeEvent<HTMLInputElement>)=>void
}
const Slider = ({id,label,value,onChange}:ColorSlidersProp)=>{
  return (
    <div>
      <label htmlFor="{id}">{label}</label>
      <input type="range"  id={id} value={value} min="0" max="255" onChange={onChange} />
    </div>
  )
}
const Sliders = ()=>{
  const [rgb, dispatch] = useReducer(reducer, {
    red: 0,
    green: 0,
    blue: 0
  });
  const adjustRed = (e:ChangeEvent<HTMLInputElement>)=>{
     dispatch({
      type:'ADJUST_RED',
      payload:+e.target.value
    })
  }
  const adjustGreen = (e:ChangeEvent<HTMLInputElement>)=>{
    dispatch({
      type:'ADJUST_GREEN',
      payload:+e.target.value
    })
  }
  const adjustBlue = (e:ChangeEvent<HTMLInputElement>)=>{
    dispatch({
      type:'ADJUST_BLUE',
      payload:+e.target.value
    })
  }
  return (
    <main >
      Box:
      <div style={{backgroundColor:toRGB(rgb)}}></div>
      <Slider id="red" value={rgb.red} label="red" onChange={adjustRed}></Slider>
      <Slider id="green" value={rgb.green} label="green" onChange={adjustGreen}></Slider>
      <Slider id="blue" value={rgb.blue} label="blue" onChange={adjustBlue}></Slider>
    </main>
  )
}
const Application = () => <Sliders />;

export default Application;
```
```js
//reducer.tsx
import {RGBColorType}  from './types'

export type AjustmentAction = {
    type:'ADJUST_RED'|'ADJUST_GREEN'|'ADJUST_BLUE';
    payload:number
}

export const reducer = (state:RGBColorType,action:AjustmentAction):RGBColorType =>{
  if(action.type==='ADJUST_RED'){
    return {...state,red:action.payload}
  }
  if(action.type==='ADJUST_GREEN'){
    return {...state,green:action.payload}
  }
  if(action.type==='ADJUST_BLUE'){
    return {...state,blue:action.payload}
  }
  return state
}
```
```js
// types.ts
export interface RGBColorType {
    red:number;
    green:number;
    blue:number
}
```

### 12.类组件中使用 context api
```js
import { ChangeEvent, Dispatch, useReducer ,createContext, Component} from "react";

let theme = 'light2'
const ThemeContext = createContext('light')

class Counter extends Component{
  // 类的静态属性：render中才能使用this.context
  static contextType = ThemeContext
  render(){
    return (<button className={this.context as string}>按钮</button>)
  }
}
const Application = () =>{
  return (
    <ThemeContext.Provider value={theme}>
     <Counter/>
    </ThemeContext.Provider>
  )
}

export default Application;
```

### 12. 通过不同的组件传递context(例如dispatch等)

```js
// app.tsx
import {ChangeEvent, useContext} from 'react'
import {ThemeProvider,ThemeContext} from './theme-context'
import {RGBProvider,RGBContext} from './color-context'
import {RGBColorType} from './types'

export interface ColorSlidersProp {
  id: string;
  label: string;
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const toRGB = ({ red, green, blue }: RGBColorType): string => {
  return `rgb(${red}, ${green}, ${blue})`;
};


const Slider = ({id,label,value,onChange}:ColorSlidersProp)=>{
  return (
    <div>
      <label htmlFor="{id}">{label}</label>
      <input type="range"  id={id} value={value} min="0" max="255" onChange={onChange} />
    </div>
  )
}
const ColorSlider = ()=>{
  const {red,green,blue,dispatch} = useContext(RGBContext)
  const adjustRed = (event:ChangeEvent<HTMLInputElement>)=>{
     dispatch({type:'ADJUST_RED',payload: +event.target.value })
  }
  const adjustGreen = (event:ChangeEvent<HTMLInputElement>)=>{
    dispatch({type:'ADJUST_GREEN',payload: +event.target.value })
  }
  const adjustBlue = (event:ChangeEvent<HTMLInputElement>)=>{
    dispatch({type:'ADJUST_BLUE',payload: +event.target.value })
  }
  return (
    <div style={{backgroundColor:toRGB({ red, green, blue })}}>
      <Slider
        id="red-slider"
        label="Red"
        value={red}
        onChange={adjustRed}
      />
      <Slider
        id="green-slider"
        label="Green"
        value={green}
        onChange={adjustGreen}
      />
      <Slider
        id="blue-slider"
        label="Blue"
        value={blue}
        onChange={adjustBlue}
      />
    </div>
  )
}

const Application = ()=>{
  const themes = useContext(ThemeContext)
  return (
    <main >
       theme-context-box:
       <div style={{...themes.dark}}>111111</div>
        <ThemeProvider>
         <RGBProvider>
           <ColorSlider></ColorSlider>
         </RGBProvider>
        </ThemeProvider>
    </main>
  
  )
}
export default Application
```
```js
// color-context.tsx
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
```
```js
// theme-context
import React, {createContext} from 'react'

const themes = {
    light:{
        backgroundColor: 'white',
        color: 'black'
    },
    dark:{
        backgroundColor: '#555',
        color: 'white'
    }
}
 export const ThemeContext = createContext(themes)

 export const ThemeProvider =({children}:{children:React.ReactNode})=>{
  return (
    <ThemeContext.Provider value={themes}>
        {children}
    </ThemeContext.Provider>
  )
 }
```
```js
// reducer
import {RGBColorType}  from './types'

export type AjustmentAction = {
    type:'ADJUST_RED'|'ADJUST_GREEN'|'ADJUST_BLUE';
    payload:number
}

export const reducer = (state:RGBColorType,action:AjustmentAction):RGBColorType =>{
  if(action.type==='ADJUST_RED'){
    return {...state,red:action.payload}
  }
  if(action.type==='ADJUST_GREEN'){
    return {...state,green:action.payload}
  }
  if(action.type==='ADJUST_BLUE'){
    return {...state,blue:action.payload}
  }
  return state
}
```
```js
// types.ts
export interface RGBColorType {
    red:number;
    green:number;
    blue:number
}
```

### 13. React.ComponentProps使用
```js
import React from "react";

type Usermodel = {
  accountId:string;
  displayName:string;
  isVerified:Boolean
}
const currentUser = {
  displayName: 'J Mascis',
  accountId: '123',
  isVerified: true
}

const friends:Usermodel[] = [
  { displayName: 'Brontosaurus', accountId: '234', isVerified: false },
  { displayName: 'Stegasaurus', accountId: '456', isVerified: true },
  { displayName: 'Tyrannosaurus', accountId: '789', isVerified: true }
]

const CurrentUser = ({displayName,isVerified}:Omit<Usermodel,'accountId'>)=>{
  return (
    <header className="current-user">
      <h2>
        {displayName} {isVerified && '✅'}
      </h2>
    </header>
  );
}
const Friend = ({displayName,isVerified}:React.ComponentProps<typeof CurrentUser>)=>{
  return (
    <li>
            {displayName} {isVerified && '✓'}
    </li>
  )
}

const Application = ()=>{
  return (
    <main >
      <CurrentUser {...currentUser}>
        {
          friends.map(friend=>{
            return (
              <Friend key="friend.accountId" {...friend}></Friend>
            )
          })
        }
      </CurrentUser>
    </main>
  
  )
}
export default Application
```
### 14.typescript字符串模版
```js
type VerticalAlignment = 'top' | 'center' | 'bottom'
type HorizonalAlignment = 'left' | 'center' | 'right'

type Alignment = Exclude<`${VerticalAlignment}-${HorizonalAlignment}`|'center','center-center'>
type Box = {
  x: number;
  y: number;
  alignment: Alignment;
};

const a: Box = {
  x: 10,
  y: 10,
  alignment: 'top-center',
};

const b: Box = {
  x: 20,
  y: 20,
  alignment: 'bottom-right',
};

const shouldBreakAtFirstButEventuallyWork: Box = {
  x: 100,
  y: 100,
  alignment: 'center',
};
```
### 15.字符串模版应用
```js
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
```