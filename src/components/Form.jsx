import React, { useState ,useEffect} from 'react'
import {  MenuItem, Select, TextField, Typography} from '@mui/material'
import {Button} from '@mui/material'
import { Box } from '@mui/system'
import FormControl from '@mui/material/FormControl';
import { MuiTelInput } from 'mui-tel-input';
import {CSVLink} from 'react-csv'
import {initializeApp} from 'firebase/app'
import {getFirestore,collection, addDoc,onSnapshot} from 'firebase/firestore'
import { data } from 'autoprefixer';

const Form = () => {
    const [CSVdata, setCSVdata] = useState([])
   
    const firebaseConfig = {
        apiKey: "AIzaSyAwSCRpsUi9RlolXd8VyBUQ9k3gkZ2048U",
        authDomain: "briowk-e0b5c.firebaseapp.com",
        projectId: "briowk-e0b5c",
        storageBucket: "briowk-e0b5c.appspot.com",
        messagingSenderId: "687015037148",
        appId: "1:687015037148:web:d04919e412185532bc4c19"
      };
    initializeApp(firebaseConfig)
    const db = getFirestore()  
    const colRef = collection(db,'CSV')
    
    
    const [type, setType] = useState('Bike')
    const [phone, setPhone] = useState('+91')
    const [inTime, setInTime] = useState('00:00')
    const [outTime, setOutTime] = useState('00:00')
    const [price, setprice] = useState('00.00')
    const [extraHours, setextraHours] = useState('-')
    const [totalPrice, setTotalPrice] = useState('00.00')
    const calculation=(parseInt(outTime) - parseInt(inTime))
    const [paymentMethod, setPaymentMethod] = useState('Cash')
    const [totalTime, settotalTime] = useState('00.00')
    const [VNo, setVNo] = useState('0000')
    const handleChange = (newPhone) => {
        setPhone(newPhone)
    }
    function handelHide(){
        var Dbtn = document.getElementById('databaseBtn')
        Dbtn.style.display="block"
        document.getElementById('calculate').style.display='none'
    }
    function handelClick(e){
        e.preventDefault()
        
        var eHours = extraHours     
        var phoneNo = phone
        var itime= inTime
        var otime= outTime
        console.log("itime:", itime)
        console.log("otime:", otime)
        console.log("phoneNo:", phoneNo)
       
        console.log('eHours:',eHours);
        console.log('paymentMethod:',paymentMethod);
        console.log('extraHours:',extraHours);
        console.log('totalPrice:',totalPrice);
        console.log('totalTime:',totalTime);
        console.log('vehicleNo:',vehicleNo);        
    }
    const head=[
        { label:"Type",key:"type" },
        { label:"vehicleNo", key:'vehicleNo'},
        { label:"Phone No", key:"phone"},
        { label:"IN-Time", key:"inTime"},
        { label:"OUT-Time", Key:"outTime"},
        { label:'Price', Key:"price"},
        { label:"Extra Hours", Key:'extraHours'},
        { label:"TotalTime", Key:'totalTime'},
        { label:"PaymentMethod", Key:'paymentMethod'},
        { label:"TotalPrice", Key:'totalPrice'},   
    ]
    async function handelAddDoc(){
        const newDoc= await addDoc(colRef,{
            type:type,
            vehicleNo:VNo,
            phone:phone,
            inTime:inTime,
            outTime:outTime,
            price:price,
            extraHours:extraHours,
            totalTime:totalTime,
            paymentMethod:paymentMethod,
            totalPrice:totalPrice,
        })
        document.getElementById('calculate').style.display='block'
        document.getElementById('databaseBtn').style.display='none'
        
    }
    function handlePrice(){
        if (calculation<0)
            setprice( (24 - calculation) *20)
        else
            setprice( calculation *20)   
        
    }
    function handleTotalPrice(){
        if(extraHours!=0){

            if(calculation<0)
                setTotalPrice((24-calculation+parseInt( extraHours))*50)
    
            else
                setTotalPrice( (calculation +parseInt( extraHours))*50)
            
        }
        else
            setTotalPrice(calculation *20)
        
    }
    function handelTotalTime(){
        settotalTime(calculation+ parseInt( extraHours))
    }
    useEffect(()=>{
        onSnapshot(colRef,(snap)=>{
            const row=[]
            snap.docs.forEach((doc)=>{
                row.push(doc.data())
                console.log(row);
            })
            
            setCSVdata(row)

            
        })
    },[])
   
  return (
     <div>
       
        <Typography className="text-3xl  underline flex justify-center text-[#2C3333] mb-20 text-center">
           CSV Summary Report Generator
        </Typography>
        <FormControl fullWidth>
           <div className="flex gap-5 flex-wrap justify-center items-center ">
            

                <div>

                    
                    <Select
                        labelId="label"
                        id="demo-simple-select"
                        value={type}
                        
                        onChange={(e)=>setType( e.target.value)}
                    >
                        
                        <MenuItem value={'Bike'}>Bike</MenuItem>
                        <MenuItem value={'Car'}>Car</MenuItem>
                        <MenuItem value={'Auto'}>Auto</MenuItem>

                    </Select>
                </div>

                <TextField
                    required
                    label="Vehicle No."
                    id="vehicleNo"
                    autoComplete="off"
                    onChange={(e)=>setVNo(e.target.value)}
                 
                />
                
                <MuiTelInput value={phone} onChange={handleChange} />

                <TextField
                    type='time'
                    label='In-Time'
                    value={inTime}
                    onChange={(e)=>setInTime(e.target.value)}
                />
                
                <TextField
                    type='time'
                    label='Out-Time'
                    value={outTime}
                    onChange={(e)=>setOutTime(e.target.value)}
                />

                <TextField
                    type='number'
                    disabled
                    value={price}
                    label='Price - Rs.'
                />
                <TextField 
                    type='text'
                    label='Extra Hours'
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    id='extraHours'
                    onChange={(e)=> {
                        if (parseInt( e.target.value)>0)
                            setextraHours(e.target.value)
                    }}
                />
                <TextField
                    type='number'
                    disabled
                    value={totalTime}
                    label='Total Time'

                />
                <Select 
                    labelId='PaymentMethod'
                    value={paymentMethod}
                    onChange={(e)=>setPaymentMethod(e.target.value)}
                >
                    
                    <MenuItem  value={"Cash"}>Cash</MenuItem>
                    <MenuItem value={'OnlinePayment'}>Online Payment</MenuItem>


                </Select>

                <TextField
                    type='number'                    
                    disabled
                    value={totalPrice}              
                    label='Total Price - Rs.'

                />

           </div>
           <div className="mt-20 flex-col justify-center items-center flex gap-5">
              <Button
                 id='calculate'
                 variant="contained"
                 className="bg-customSecondary text-customPrimary hover:bg-customSecondary"
                 onClick={(e) => {
                    handelClick(e) 
                    handlePrice()
                    handleTotalPrice()
                    handelTotalTime()
                    handelHide()
                }}
              >
                 Calculate{" "}
              </Button>
              <Button 
                    variant="contained"
                    className="bg-customSecondary text-customPrimary hover:bg-customSecondary hidden"
                    id='databaseBtn'
                    onClick={()=>handelAddDoc()}
                >
                    Enter Data to Database
                </Button>
                
               
                    <CSVLink data={CSVdata} className='-underline '>Download CSV</CSVLink>
                
                
           </div>
        </FormControl>
     </div>
  );
}

export default Form