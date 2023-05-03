import {Grid,Card,Typography,Tabs,Tab,Box} from '@mui/material';
import React, { useState } from 'react'
import pic1 from '../../../images/shop.png';
import Registration from './Registration';
import Userlogin from './userlogin';

const Tabpanel=(props)=>{
    const {children,value,index}=props;
    return(
        <div role="tabpanel" hidden={value!==index}>
            {
                value===index&&(
                    <Box>{children}</Box>
                )
            }
        </div>
    )
}
const Loginreg = () => {
   

const [value,setValue]=useState(0);
//isme jo event likha iss se tabs ka data disp horha    
const handlechange=(event,newValue)=>{
setValue(newValue);
}
  return (
    <>
    <Grid container sx={{height:'90vh'}}  alignItems="center"
  justifyContent="center">
    {/* <Grid item lg={7} sm={5} sx={{backgroundImage:`url(${pic1})`,backgroundRepeat:'no-repeat',
     backgroundSize:'cover', backgroundPosition:'center', display:{xs:'none',sm:'block'}
}} >
    </Grid> */}
    <Grid item lg={5} sm={7} xs={12}>
    <Card sx={{width:'80%', height:'90%'}}>
  
    <Box sx={{ width: '100%', borderBottom:1,borderColor:'divider'}}>
{/* ye login aur registration k neechy line jo arhi wo ha */}
      <Tabs value={value} textColor='secondary' indicatorColor='secondary' onChange={handlechange}>
        <Tab  label="Login" />
        <Tab  label="Registration" />
      </Tabs>
    </Box>
    {/* isme jo value di wo agr login k tab pr click kre gay tu value iss se match hogi aur login
    component pr le jye ga issi trh value={value likhi jo registration pr click hone pr registration pr lay jye ga
    onchange event se value change hogi}*/}
    <Tabpanel value={value} index={0}><Userlogin/></Tabpanel>
    <Tabpanel value={value} index={1}><Registration/></Tabpanel>
    </Card>
    </Grid>
    </Grid>
    </>

  )
}

export default Loginreg