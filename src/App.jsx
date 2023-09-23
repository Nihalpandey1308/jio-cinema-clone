import { useState , useEffect} from 'react'
import {BrowserRouter , Routes , Route,  } from 'react-router-dom'
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration , getGenres } from './store/homeSlice'
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from './pages/home/Home'
import Details from "./pages/details/Details"
import SearchResults from "./pages/searchResult/SearchResults"
import Explore from "./pages/explore/Explore"
import PageNotFound from "./pages/404/PageNotFound"
import Login from "./components/Login/Login"
import Register from './components/Register/Register'
import ProtectedRoute from './ProtectedRoute'
import jwtDecode from "jwt-decode";
// import ProtectedRoute from './ProtectedRoute'



function App() {
  const dispatch = useDispatch()
  const  {url}= useSelector((state) => state.home)
  console.log(url);

  // const [isAuth, login, logout] = useAuth(false)

  const [ isLoggedIn , setisLoggedIn] = useState( false)
  useEffect(() => {
    fetchApiConfig() 
    genresCall()
  }, [])

  const validatetoken = (token)=>{
    const temp = jwtDecode(token)
    const ms = Date.now() /1000
    return ms < temp.exp ;
}
useEffect (()=>{
    const token = localStorage.getItem('jio-cinema-token')
    
    if (token && validatetoken(token)){
        setisLoggedIn(true)
       
    }
},[])
  
  

  const fetchApiConfig = () =>{
    fetchDataFromApi("/configuration")
      .then((res) =>{
        console.log(res);
    

 const url = {
  backdrop : res.images.secure_base_url + "original",
  poster : res.images.secure_base_url + "original",
  profile : res.images.secure_base_url + "original",
  

 }



        dispatch(getApiConfiguration(url))
      })
  }


  const genresCall = async() =>{
  let promises = []
  let endPoint = ["tv" , "movie"];
  let allGenres = {}


  endPoint.forEach((url) => {
    promises.push(fetchDataFromApi(`/genre/${url}/list`))
  })

  const data = await Promise.all(promises);
  console.log(data);
  data.map(({genres}) =>{
  genres.map((item) => (allGenres[item.id] = item))
  })

  dispatch(getGenres(allGenres))
  }
  

  return (
  <BrowserRouter>
  <Header setisLoggedIn={setisLoggedIn} isLoggedIn={isLoggedIn} />
    <Routes>
      <Route path='/' element={<ProtectedRoute element={<Home />} isLoggedIn={isLoggedIn}></ProtectedRoute>} />
      <Route path='/home' element={<ProtectedRoute element={<Home />} isLoggedIn={isLoggedIn}></ProtectedRoute>} />
      <Route path='/login'  element={<Login setisLoggedIn={setisLoggedIn} />} />
      <Route path='/register' element={<Register isLoggedIn={isLoggedIn} />} />
      {/* <Route path='/:mediaType/:id' element={<Details />} /> */}
      <Route path='/:mediaType/:id' element={<ProtectedRoute element={<Details />} isLoggedIn={isLoggedIn}></ProtectedRoute>} />
      {/* <Route path='/search/:query' element={<SearchResults />} /> */}
      <Route path='/search/:query' element={<ProtectedRoute element={<SearchResults />} isLoggedIn={isLoggedIn}></ProtectedRoute>} />
      {/* <Route path='/explore/:mediaType' element={<Explore />} /> */}
      <Route path='/explore/:mediaType' element={<ProtectedRoute element={ <Explore />} isLoggedIn={isLoggedIn}></ProtectedRoute>} />
      <Route path='*' element={<PageNotFound />} />
      {/* <ProtectedRoute path='/login'  element={<Login setisLoggedIn={setisLoggedIn} />} auth={isAuth} /> */}
      {/* <Route path='/register' element={<Register />} /> */}
    </Routes>
    <Footer />
  </BrowserRouter>
  )
}

export default App
