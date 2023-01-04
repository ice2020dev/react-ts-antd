import {Routes,Route,BrowserRouter as Router} from 'react-router-dom'
import React,{Suspense,lazy} from 'react'
import App from 'App'

interface Iroute{
    path:string,
    // component:React.FC,
    component:React.LazyExoticComponent<(obj:any) => JSX.Element> | React.FC,
    children?:Iroute[]
}

let routeArr:Iroute[]=[
    {
        path:'/',
        component:App,
        children:[

        ]
    },
    {
        path:'/login',
        component:lazy(()=>import('../views/login'))
    }
]

const MyRouter=()=>{
  return (
    <Router>
        <Suspense fallback={<div>loading...</div>}>
           <Routes>
             {
                routeArr.map((item,index)=>(
                    <Route key={index} path={item.path} element={<item.component/>}></Route>
                ))
             }
           </Routes>
        </Suspense>
    </Router>
  )
}
export default MyRouter