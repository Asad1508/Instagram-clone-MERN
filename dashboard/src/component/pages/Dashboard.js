import {Grid, Button, Typography, CssBaseline} from '@mui/material'
import {React, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { GetToken, RemoveToken } from '../../services/jwtlocalstorage';
import Changepass from './auth/Changepass';
import { useGetLoggedUserQuery } from '../../services/userauthapi';
import { useDispatch } from 'react-redux';
import { setUserInfo, unsetUserInfo } from '../../features/userslice';
import { unsetUsertoken } from '../../features/routeauthslice';
// import '../../../node_modules/swiper/core/'
const Dashboard = () => {
const navigate=useNavigate();
 const handlelog=()=>{
     //ye code token ko unset krne k liye jo k bnaya ha route k secure krne k liye
     dispatch(unsetUsertoken({token:null}))
  //ye hamne iss liye kia takay agr ham redux k through kisi dosre component me user ka data disp krwa rhe
     //tu logout hone k bd data b ghaib hojana chahye tu ye code ghaib he kr rha
     dispatch(unsetUserInfo({name:"",email:""}))
  
     RemoveToken('token')
     navigate('/login')
 }   
 //hme token b pass krna loggeduser k liye tu hamne 1 function bnaya jwtlocalstorage.js me
 //gettoken() ka waha se token get kr rhe 
 const token=GetToken()
 const {data, isSuccess}=useGetLoggedUserQuery(token)
 console.log(data)
//ye hamne kia state create ki takay user ka data disp krwa sky jo login ha
 const [userData,setUserdata]=useState({
   email:"",
   name:""
 })
 //store user data in local state
 useEffect(()=>{
  if(data && isSuccess)
  {
    setUserdata({
      email:data.user.email,
      name:data.user.name
    })
  }
  //isme data aur is success dia q k error de rha tha 
  //ye hamne dependency array dia agr ni de gay tu unlimited time execute hoga 
  //tu ismme hamne btaya k kab execute ho 
 },[data,isSuccess])

 //store user data in redux store
const dispatch= useDispatch()
useEffect(()=>{
  if(data && isSuccess)
  {
    //isme setuserinfo function jo slice me ha usko call kr rhe
    dispatch(setUserInfo({
    email:data.user.email,
    name:data.user.name
    }))
  }
  //isme data aur isssuccess dia q k error de rha tha 
  //ye hamne dependency array dia agr ni de gay tu unlimited time execute hoga 
  //tu ismme hamne btaya k kab execute ho 
 },[data,isSuccess,dispatch])

  return (
    <>
    <nav class="navbar">
    <div class="nav-wrapper">
    
        <img src="https://i.imgur.com/zqpwkLQ.png" class="brand-img" alt=""/>
        <input type="text" class="search-box" placeholder="search"/>
        <div class="nav-items">
         
                
            <img src="https://cdn-icons-png.flaticon.com/512/3917/3917014.png" class="icon" alt=""/>
             <img src="https://cdn-icons-png.flaticon.com/512/1384/1384090.png" class="icon" alt=""/>
             <img src="https://cdn-icons-png.flaticon.com/512/992/992651.png" class="icon" alt=""/>
             <img src="https://cdn.iconscout.com/icon/free/png-256/explore-1781524-1513844.png" class="icon" alt=""/>
             <img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" class="icon" alt=""/>
          
        
            <Link to="/profile"><div class="icon user-profile"></div><span style={{color:"black",fontWeight:"bolder"}}>{userData.name}00232</span></Link>
        </div>
    </div>
</nav>
    <main>
        <div class="container" >
            <div class="col-9" >
            <div class="statuses" >
          
        
                <div className="clients-slider swiper mySwiper" >
               
                <div className="swiper-wrapper" >
             
               
            
                    <div class="status">
                        
                        <div class="image">
                            <img src=
"https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358__340.jpg"
                                 alt="img3"/>
                      </div>
                      </div>
                     
                    <div class="status">
                 
                        <div class="image">
                            <img src=
"https://cdn.pixabay.com/photo/2015/01/08/18/30/entrepreneur-593371__340.jpg" 
                                 alt="img4"/>
                        </div>
                        </div>
                 
                    <div class="status">
                    
                        <div class="image">
                            <img src=
"https://cdn.pixabay.com/photo/2015/01/08/18/30/man-593372__340.jpg" 
                                 alt="img5"/>
                        </div>
                        </div>
            
                    <div class="status">
                  
                        <div class="image">
                            <img src=
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ387J7s_o8UjmNYXS3zmYlCvcHkqKlK-DFWSxXWKeGliSjaEXqDQ9CKxAwN4-I97FmCn4&usqp=CAU" 
                                 alt="img6"/>
                        </div>
                   
                    </div>
                  
                    <div class="status">
                    
                        <div class="image">
                            <img src=
"https://cdn.shopify.com/s/files/1/0126/3239/1744/products/MG_5296Black_633x.jpg?v=1656584732" 
                                 alt="img7"/>
                        </div>
                       
                    </div>
                   
                    <div class="status">
                    
                        <div class="image">
                            <img src=
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL0Yl1f3MeKQ6hBP1dqzV42WxnbkPUPymiLoC1snc3m18qutTsZIxTKPsg_KNmNrkGiV0&usqp=CAU" 
                                 alt="img8"/>
                        </div>
                        </div>
                        
                        </div>
                        </div>
                  
                    
                    
                </div>
              <section class="main">
    <div class="wrapper">
        <div class="left-col">
           

            <div class="post">
                <div class="info">
                    <div class="user">
                        <div class="profile-pic"><img src="https://images.pexels.com/photos/4205505/pexels-photo-4205505.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/></div>
                        <p class="username">{userData.name}00232</p>
                    </div>
                    <img src="img/option.PNG" class="options" alt=""/>
                </div>
                <img src="https://images.pexels.com/photos/4205505/pexels-photo-4205505.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="post-image" alt=""/>
                <div class="post-content">
                    <div class="reaction-wrapper">
                        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" class="icon" alt=""/>
                        <img src="data:image/png;base64,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" class="icon" alt=""/>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjQ2GCEigHHay30wnYID0cr-CvZARNC7e9spUQj0XJNVE3Jp8i8Y8X_31pmRuT-WDU8nM&usqp=CAU" class="icon" alt=""/>
                        <img src="img/save.PNG" class="save icon" alt=""/>
                    </div>
                    <p class="likes">1,012 likes</p>
                    <p class="description"><span>username </span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur tenetur veritatis placeat, molestiae impedit aut provident eum quo natus molestias?</p>
                    <p class="post-time">2 minutes ago</p>
                </div>
                <div class="comment-wrapper">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTAQbW9EVoz6YXSAVaU2vPH84JjBRAojtIA&usqp=CAU" class="icon" alt=""/>
                    <input type="text" class="comment-box" placeholder="Add a comment"/>
                    <button class="comment-btn">post</button>
                </div>
            </div>
            <div class="post">
                <div class="info">
                    <div class="user">
                        <div class="profile-pic"><img src="https://i.pinimg.com/736x/3d/05/a4/3d05a42d0992b43be8256ad9201e9d16.jpg" alt=""/></div>
                        <p class="username">{userData.name}00232</p>
                    </div>
                    <img src="img/option.PNG" class="options" alt=""/>
                </div>
                <img src="https://i.pinimg.com/736x/3d/05/a4/3d05a42d0992b43be8256ad9201e9d16.jpg" class="post-image" alt=""/>
                <div class="post-content">
                    <div class="reaction-wrapper">
                    <img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" class="icon" alt=""/>
                        <img src="data:image/png;base64,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" class="icon" alt=""/>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjQ2GCEigHHay30wnYID0cr-CvZARNC7e9spUQj0XJNVE3Jp8i8Y8X_31pmRuT-WDU8nM&usqp=CAU" class="icon" alt=""/>

                        <img src="img/save.PNG" class="save icon" alt=""/>
                    </div>
                    <p class="likes">1,012 likes</p>
                    <p class="description"><span>username </span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur tenetur veritatis placeat, molestiae impedit aut provident eum quo natus molestias?</p>
                    <p class="post-time">2 minutes ago</p>
                </div>
                <div class="comment-wrapper">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTAQbW9EVoz6YXSAVaU2vPH84JjBRAojtIA&usqp=CAU" class="icon" alt=""/>
                    <input type="text" class="comment-box" placeholder="Add a comment"/>
                    <button class="comment-btn">post</button>
                </div>
            </div>
           
            <div class="post">
                <div class="info">
                    <div class="user">
                        <div class="profile-pic"><img src="https://c4.wallpaperflare.com/wallpaper/62/444/930/pakistan-cricket-team-wallpaper-preview.jpg" alt=""/></div>
                        <p class="username">{userData.name}00232</p>
                    </div>
                    <img src="img/option.PNG" class="options" alt=""/>
                </div>
                <img src="https://c4.wallpaperflare.com/wallpaper/62/444/930/pakistan-cricket-team-wallpaper-preview.jpg" class="post-image" alt=""/>
                <div class="post-content">
                    <div class="reaction-wrapper">
                        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" class="icon" alt=""/>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8AAACOjo4xMTF4eHjm5ubv7++urq4SEhJSUlKXl5cPDw/MzMyUlJRDQ0PX19ekpKT5+flra2vz8/OBgYFkZGTf39+6urpJSUlbW1udnZ3ExMSysrJzc3MiIiJQUFA7OzsqKip+fn40NDRfX18bGxvR0dEcnwHwAAAFI0lEQVR4nO2d63LiMAxGgRZaKLc03CmUtpT3f8Sd7uwOli1fkmBspd/568DoTIJlO8bqdAAAAAAAAAAANGWw3y2W76eHXJkOl735eFBX77LYdGUwnKyq6xW7h9RxV2L6VtGvlzri6rw8VRBcP6cOtxbTS6BfuUwdam16QYKzl9RxNmBaBjyhqYNsiLdXfUodYWM8P0bpd/CHvktwnDq6m+AY4wxSx3YbNnbDIXP5x/aw6OXK4jDkUrc1acxNvVGNAd99KS7M+GvGX1safuv7BlubnRE5f92rdtnuvmE2oTxosbNj1L520f7eYTZCu41H7ppHek32P0ANLZMzkyktU4zvH2NDaD/JZIw3csH8/hE2hv4WzWdwqzZPEwTYmIIYTtzNlnySOeQ5NR5TMiJdpojvBhxViUJrJL2trERxpeeSIOm+9gJkYi6uzlK9weck4d2A4kOxWGiNXUebHNSEMNTaXPdXDuoq4Yk2kWQhtaPpdBaKhTY0JWM2eSO2/0wUi2faBEMhwBCG+QNDGOYPDGGYPzCEIcegH5uAvQdRDfXXObenykagGIba2w4YwhCGMIQhDGEIQ5GG7R+1tX/knRcwhGH+wBCG+QNDGOYPDGGYPzEMJ5thXDZV/vQRw1D/o8PtST0/bP8cH4YwhCEMYQhDGP6GMc16MorLpMq/zDC3gGH+wBCG+QNDGOYPDGGYPzCsYzh+ik2VY2QwP6xj2P45PgxhCEMYwhCGMPwdY5qXuCQ3zAsYwjB/YAjD/IEhDPMHhjDMn19t2JLTPT8VC716gGrYyhNaW3LKrlqCRD9l90Np2yaJ7gaU6nnPeqESst4i9bRrcuy6/lsjJ5ZLqU2iox4jbGQEoi/1MSVVdfRT50lXIzQjqtnQ6GhoR9v9ShBfY2gloJHRvva05w8tamjWJitpaSh5nQ15RrvvzBWkI5L3U9SK/nF3SK+GVLF0aWK0wl18SSv9NVLP6G+zZXAOuj1FV0fIELxY6IHbKgG9GYrPi3GVI35SMFgzL/is+6i4IrLfm/Ph8crBWSFSY69+Mgav2ykTsiPXlQF1gCv8heXT/21RMIczV1b+jwcbro7+L4vC0dlD+guRhhoaNQnvhmfu5y0mG2bYT1aW/cW7W9N3F4MM01UVPgbM3vvusvEBhuXW+Q0x2QaNUgrnHhm/4T5dYe/gwqJjRzfoNYy/h8jGe5UN0/Nv29d4DGcBKTUOp6oTvjdLb+g2nPAfis+5zkL9asT1GC7DFTuGis/rvMpYklDMnkaPSxK3w9CsCf3DNCLD5eduvWo+y1sFGQ7eOb+liEnmLMSQHwxV2XaXkADDgt2Fuan987gzfsMxmyPkFPb2GhqrCD98Cap77TGcnTjBhYgu5h9uwxHnJ2y51WXYZ5P8q6Qb2HEa8hNBca8ErIYltzjXHcp7hWwz3LM5QsgyMsFiyCb5k5QkT2ANL+xih74BQgicYY/z+76kDbQ2pmGfTfKH1IHWxjBkJ4LfcrfD6YYDdrHwnPtLKhfEcLXn/KRMBC0QQ3aBaiMvyRNmnJSKxL0pBI/hQ5VT8fLEbSh3N+oVl+FR1kTQgsPwIDlHXLEbipsIWrAZCpwIWrAYSpwIWmANp4IWC71whkInghZMw6P8JE8wDB+FLRZ60Q0FTwQtUMNtO5I8gRjKnghaUAzFvBGsxtVQ/ETQwn/DjzYlecI/wzZMBC38NXxuX4648mN4bluSJ8zaMxG0cGlpjrjS6gcUAAAAAAAAAMBf/gDj4HfRpmJ3XwAAAABJRU5ErkJggg==" class="icon" alt=""/>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjQ2GCEigHHay30wnYID0cr-CvZARNC7e9spUQj0XJNVE3Jp8i8Y8X_31pmRuT-WDU8nM&usqp=CAU" class="icon" alt=""/>
                        <img src="img/save.PNG" class="save icon" alt=""/>
                    </div>
                    <p class="likes">1,012 likes</p>
                    <p class="description"><span>username </span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur tenetur veritatis placeat, molestiae impedit aut provident eum quo natus molestias?</p>
                    <p class="post-time">2 minutes ago</p>
                </div>
                <div class="comment-wrapper">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTAQbW9EVoz6YXSAVaU2vPH84JjBRAojtIA&usqp=CAU" class="icon" alt=""/>
                    <input type="text" class="comment-box" placeholder="Add a comment"/>
                    <button class="comment-btn">post</button>
                </div>
            </div>
            
            <div class="post">
                <div class="info">
                    <div class="user">
                        <div class="profile-pic"><img src="https://images.pexels.com/photos/4205505/pexels-photo-4205505.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/></div>
                        <p class="username">{userData.name}00232</p>
                    </div>
                    <img src="img/option.PNG" class="options" alt=""/>
                </div>
                <img src="https://www.cnc3.co.tt/wp-content/uploads/2022/11/Tunisia-Aissa-Laidouni-in-group-D-match-Denmark-v-Tunisia-22nov2022.jpeg" class="post-image" alt=""/>
                <div class="post-content">
                    <div class="reaction-wrapper">
                        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" class="icon" alt=""/>
                        <img src="data:image/png;base64,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" class="icon" alt=""/>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjQ2GCEigHHay30wnYID0cr-CvZARNC7e9spUQj0XJNVE3Jp8i8Y8X_31pmRuT-WDU8nM&usqp=CAU" class="icon" alt=""/>
                        <img src="img/save.PNG" class="save icon" alt=""/>
                    </div>
                    <p class="likes">1,012 likes</p>
                    <p class="description"><span>username </span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur tenetur veritatis placeat, molestiae impedit aut provident eum quo natus molestias?</p>
                    <p class="post-time">2 minutes ago</p>
                </div>
                <div class="comment-wrapper">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTAQbW9EVoz6YXSAVaU2vPH84JjBRAojtIA&usqp=CAU" class="icon" alt=""/>
                    <input type="text" class="comment-box" placeholder="Add a comment"/>
                    <button class="comment-btn">post</button>
                </div>
            </div>
            
            <div class="post">
                <div class="info">
                    <div class="user">
                        <div class="profile-pic"><img src="https://images.pexels.com/photos/4205505/pexels-photo-4205505.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/></div>
                        <p class="username">{userData.name}00232</p>
                    </div>
                    <img src="img/option.PNG" class="options" alt=""/>
                </div>
                <img src="https://images.pexels.com/photos/4205505/pexels-photo-4205505.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="post-image" alt=""/>
                <div class="post-content">
                    <div class="reaction-wrapper">
                        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" class="icon" alt=""/>
                        <img src="data:image/png;base64,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" class="icon" alt=""/>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjQ2GCEigHHay30wnYID0cr-CvZARNC7e9spUQj0XJNVE3Jp8i8Y8X_31pmRuT-WDU8nM&usqp=CAU" class="icon" alt=""/>
                        <img src="img/save.PNG" class="save icon" alt=""/>
                    </div>
                    <p class="likes">1,012 likes</p>
                    <p class="description"><span>username </span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur tenetur veritatis placeat, molestiae impedit aut provident eum quo natus molestias?</p>
                    <p class="post-time">2 minutes ago</p>
                </div>
                <div class="comment-wrapper">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTAQbW9EVoz6YXSAVaU2vPH84JjBRAojtIA&usqp=CAU" class="icon" alt=""/>
                    <input type="text" class="comment-box" placeholder="Add a comment"/>
                    <button class="comment-btn">post</button>
                </div>
            </div>
            
            <div class="post">
                <div class="info">
                    <div class="user">
                        <div class="profile-pic"><img src="https://images.pexels.com/photos/4205505/pexels-photo-4205505.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/></div>
                        <p class="username">{userData.name}00232</p>
                    </div>
                    <img src="img/option.PNG" class="options" alt=""/>
                </div>
                <img src="https://images.pexels.com/photos/4205505/pexels-photo-4205505.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="post-image" alt=""/>
                <div class="post-content">
                    <div class="reaction-wrapper">
                        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" class="icon" alt=""/>
                        <img src="data:image/png;base64,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" class="icon" alt=""/>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjQ2GCEigHHay30wnYID0cr-CvZARNC7e9spUQj0XJNVE3Jp8i8Y8X_31pmRuT-WDU8nM&usqp=CAU" class="icon" alt=""/>
                        <img src="img/save.PNG" class="save icon" alt=""/>
                    </div>
                    <p class="likes">1,012 likes</p>
                    <p class="description"><span>username </span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur tenetur veritatis placeat, molestiae impedit aut provident eum quo natus molestias?</p>
                    <p class="post-time">2 minutes ago</p>
                </div>
                <div class="comment-wrapper">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTAQbW9EVoz6YXSAVaU2vPH84JjBRAojtIA&usqp=CAU" class="icon" alt=""/>
                    <input type="text" class="comment-box" placeholder="Add a comment"/>
                    <button class="comment-btn">post</button>
                </div>
            </div>
        </div>
    </div>
</section>
            
             
<section class="main">
    <div class="wrapper"> 
        
        <div class="right-col">
            <div class="profile-card">
                <div class="profile-pic">
                    <img src="https://images.pexels.com/photos/4205505/pexels-photo-4205505.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
                </div>
                <div>
                    <p class="username">WWE</p>
                    <p class="sub-text">kunaal kumar</p>
                </div>
                <button class="action-btn">switch</button>
            </div>
            <p class="suggestion-text">Suggestions for you</p>
            <div class="profile-card">
                <div class="profile-pic">
                    <img src="https://media.istockphoto.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343?b=1&k=20&m=1179420343&s=612x612&w=0&h=c9Z3DyUg-YvgOQnL_ykTIgVTWXjF-GNo4FUQ7i5fyyk=" alt=""/>
                </div>
                <div>
                    <p class="username">Ahmad Awan</p>
                    <p class="sub-text">followed bu user</p>
                </div>
                <button class="action-btn">follow</button>
            </div>
            <div class="profile-card">
                <div class="profile-pic">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJWsGcFl07KSogfnAkzU0icbzpVDOmCZI3scptwWc6TFzskAbhPhffY4CZvXgRjn4Y21c&usqp=CAU" alt=""/>
                </div>
                <div>
                    <p class="username">Jamal Aziz</p>
                    <p class="sub-text">followed bu user</p>
                </div>
                <button class="action-btn">follow</button>
            </div>
            <div class="profile-card">
                <div class="profile-pic">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2HgGhgXhY-PZd7Ma14jhkdI6Xqc-yv7Ukzm9QDmKKGTJ851JObeSjTUCzcyGOmXm1reg&usqp=CAU" alt=""/>
                </div>
                <div>
                    <p class="username">Kamran javed</p>
                    <p class="sub-text">followed bu user</p>
                </div>
                <button class="action-btn">follow</button>
            </div>
            <div class="profile-card">
                <div class="profile-pic">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-s3rvJdSQ7VMIQchnILdswY6dblxbYlcCmT3eZtX9viWZVjmDpVM7UgHhWRjyyJA5FW0&usqp=CAU" alt=""/>
                </div>
                <div>
                    <p class="username">Hamza Ameer</p>
                    <p class="sub-text">followed bu user</p>
                </div>
                <button class="action-btn">follow</button>
            </div>
            <div class="profile-card">
                <div class="profile-pic">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUR_JIhRHCyaVIq6yIitvbiKL4yoXvLOMbo68sBFwFOBIE5VpQMPdXdghWHKVE7M_HArk&usqp=CAU" alt=""/>
                </div>
                <div>
                    <p class="username">Nouman ALi</p>
                    <p class="sub-text">followed bu user</p>
                </div>
                <button class="action-btn">follow</button>
            </div>
        </div>
    </div>
</section>
            </div>
        </div>
    </main>
    </>
  )
}
export default Dashboard