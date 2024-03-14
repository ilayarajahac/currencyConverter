import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'


function App() {
    const [amount,setAmount] = useState(1)
    const [fromCurrency,setFromCurrency]=useState("USD")
    const [toCurrency,setTCurrency]=useState("INR")
    const [convertedAmount,setConvertedAmount]=useState(null)
    const [exchangerate,setExchanerate]=useState(null)
   useEffect( ()=>{
    const getExchanngeRate = async () =>{
    try{
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(url);
        //console.log(response);
        setExchanerate(response.data.rates[toCurrency])

    }
    catch(error)
    {
    console.error("Error in Fetch Exchange Rate:",error)
}};
    getExchanngeRate();
   },[fromCurrency,toCurrency]
   )

   useEffect(()=>{
    if(exchangerate!=null){
        setConvertedAmount((amount * exchangerate).toFixed(2))
    }

   },[amount,exchangerate])

   const  handleAmountChange = (e) =>{
  const value = parseFloat(e.target.value)
   setAmount(isNaN(value)? 0:value)
   }

   const handleFromCurrency = (e)=> {
       setFromCurrency(e.target.value)
   }
   const handleToCurrency = (e) =>{
    setTCurrency(e.target.value)

   }
    return (
        <>

            <div className="currency">
                <div className='box'></div>
                <div className='data'>
                    <h1>Currency_Converter</h1>
                    <div className='inputcontainer'>
                        <label >amount:</label>
                        <input type='number' value={amount} onChange={handleAmountChange}></input>
                    </div>
                    <div className='inputcontainer'>
                        <label >From_Currency:</label>
                        <select value={fromCurrency} onChange={handleFromCurrency}>
                            <option value="USD">USD-United State Dollar</option>
                            <option value="EUR">EUR-Euro</option>
                            <option value="BRL">BRZ-Brazilian Real</option>
                            <option value="INR">INR-Indian Rupee</option>
                            <option value="AUD">Australlian  Dollar</option>
                        </select>
                    </div>
                    <div className='inputcontainer'>
                        <label >To_Currency:</label>
                        <select value={toCurrency} onChange={handleToCurrency}>
                            <option value="USD">USD-United State Dollar</option>
                            <option value="EUR">EUR-Euro</option>
                            <option value="BRL">BRZ-Brazilian Real</option>
                            <option value="INR">INR-Indian Rupee</option>
                            <option value="AUD">Australlian  Dollar</option>
                        </select>
                    </div>
                    <div className='result'>
                        <p>{amount} {fromCurrency} is euqual to {convertedAmount}  {toCurrency}</p>
                    </div>


                </div>

            </div>
        </>
    )
}
export default App