import { useState } from 'react'
import img from "./assets/img.png";
import ssAll from "./assets/ssAll.png";
import ssSingle from "./assets/ssSingle.png";
import ssSingleYear from "./assets/ssSingleYear.png";
import ssYearRange from "./assets/ssYearRange.png";
import ssBody from "./assets/ssBody.png";
import ssHeader from "./assets/ssHeader.png";
import editOutput from "./assets/editOutput.png";
import { GoDotFill } from "react-icons/go";
import ApiContainer from './components/ApiContainer';

function App() {
  
  const [isPublic, setIsPublic] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const baseUrl = "https://unemp-rates-api-4.onrender.com/api/unemployment";
  const allUrl = "https://unemp-rates-api-4.onrender.com/api/unemployment/all/country";
  const allUrlExample = "https://unemp-rates-api-4.onrender.com/api/unemployment/all/country";
  const singleCountry = "https://unemp-rates-api-4.onrender.com/api/unemployment/country/${countryCode}";
  const singleCountryExample = "https://unemp-rates-api-4.onrender.com/api/unemployment/country/IN";
  const selectedYear = "https://unemp-rates-api-4.onrender.com/api/unemployment/country/${countryCode}/year/${year}";
  const selectedYearExample = "https://unemp-rates-api-4.onrender.com/api/unemployment/country/IN/year/2009";
  const yearRange = "https://unemp-rates-api-4.onrender.com/api/unemployment/country/${countryCode}/fromYear/${fromYear}/toYear/${toYear}";
  const yearRangeExample = "https://unemp-rates-api-4.onrender.com/api/unemployment/country/US/fromYear/2000/toYear/2002";
  const editUrl = "https://unemp-rates-api-4.onrender.com/api/unemployment/edit";


  const handlePublic = () =>{
    setIsPublic(true);
    setIsAdmin(false);
    console.log("Public", isPublic);
    console.log("Admin", isAdmin);
  };

  const handleAdmin = () =>{
    setIsPublic(false);
    setIsAdmin(true);
    console.log("Public", isPublic);
    console.log("Admin", isAdmin);
  };

  return (
    <>
     {/* Container */}
    <div className='flex flex-col items-center' >

        {/* Header */}
      <div className='flex justify-center' >
        <img src={img} 
          className='h-[300px] w-[300px]'
        />

        <div className='flex flex-col gap-2 justify-center ' >
          <h3 className='text-black text-5xl' >Your <span className='text-rose-700 font-semibold' >Free</span> API to get Unemployment Data</h3>
          <h3 className='text-black text-5xl' >Across the globe is here: </h3>
        </div>
      </div>
      
    {/* role options */}
      <div className='h-auto w-full flex flex-col mb-3 items-center'>
        {/* roles */}
        <div className='h-[40px] w-5/6 px-1 bg-gray-300 flex' >
          <div className={`h-full w-[70px] text-center font-medium flex items-center justify-center`} >
            <p>Role :-</p>
          </div>

          <div className={`${isPublic ? "bg-gray-200" : "bg-gray-300"} h-[38px] w-[70px] text-center bg-gray-200 z-10 font-medium flex items-center justify-center cursor-pointer`} 
            onClick={handlePublic}
          >
            <p>Public</p>
          </div>

          <div className={`${isAdmin ? "bg-gray-200" : "bg-gray-300"} h-[38px] w-[70px] text-center bg-gray-200 z-10 font-medium flex items-center justify-center cursor-pointer`} 
            onClick={handleAdmin}
          >
            <p>Admin</p>
          </div>
        </div>
        </div>

      {isPublic && (
          <>
            {/* API section */}
            <div className='h-auto w-5/6 bg-gray-200 flex flex-col px-4 py-2 rounded-xl mb-3' >
                {/* Basic info */}
              <div className='h-[40px] w-full bg-gray-200 px-3 rounded-xl text-xl text-start flex' >
              <GoDotFill className='mt-[5px] mr-[2px]' />  Use this api as a base url to fetch unemployment rate of each country from year 2000 to year 2024
              </div>
              <ApiContainer url={baseUrl} copy={true} />
            </div>

            {/* 1st endpoint */}
            <div className='h-auto w-5/6 bg-gray-200 flex flex-col px-4 py-2 rounded-xl mb-2' >
                {/* Basic info */}
              <div className='h-[40px] w-full bg-gray-200 px-3 rounded-xl text-xl text-start flex' >
              <GoDotFill className='mt-[5px] mr-[2px]' /> Use this API endpoint to get the unemployment rates of all countries from year 2000 to 2024
              </div>
              <ApiContainer url={allUrl} copy={true}/>

              <div className='mt-1' >
                <p className='px-2 mb-1 font-medium' >Usage example :-</p>
                <ApiContainer url={allUrlExample} copy={true}/>
              </div>

              <p className='px-2 mb-1 font-medium' >Output example :-</p>
              <img src={ssAll}
                className='h-auto w-2/5 px-2'
              ></img>
            </div>

            {/* 2nd endpoint */}
            <div className='h-auto w-5/6 bg-gray-200 flex flex-col px-4 py-2 rounded-xl mb-2' >
                {/* Basic info */}
              <div className='h-[40px] w-full bg-gray-200 px-3 rounded-xl text-xl text-start flex' >
              <GoDotFill className='mt-[5px] mr-[2px]' /> Use this API endpoint to get the unemployment rates of a selected country by country code from year 2000 to 2024
              </div>
              <ApiContainer url={singleCountry} copy={true}/>

              <div className='mt-1' >
                <p className='px-2 mb-1 font-medium' >Usage example :-</p>
                <ApiContainer url={singleCountryExample} copy={true}/>
              </div>

              <p className='px-2 mb-1 font-medium' >Output example :-</p>
              <img src={ssSingle}
                className='h-auto w-2/5 px-2'
              ></img>
            </div>

            {/* 3rd endpoint */}
            <div className='h-auto w-5/6 bg-gray-200 flex flex-col px-4 py-2 rounded-xl mb-2' >
                {/* Basic info */}
              <div className='h-[40px] w-full bg-gray-200 px-3 rounded-xl text-xl text-start flex' >
              <GoDotFill className='mt-[5px] mr-[2px]' /> Use this API endpoint to get the unemployment rates of a selected country by country code of a selected year
              </div>
              <ApiContainer url={selectedYear} copy={true}/>

              <div className='mt-1' >
                <p className='px-2 mb-1 font-medium' >Usage example :-</p>
                <ApiContainer url={selectedYearExample} copy={true}/>
              </div>

              <p className='px-2 mb-1 font-medium' >Output example :-</p>
              <img src={ssSingleYear}
                className='h-auto w-2/5 px-2'
              ></img>
            </div>

            {/* 4th endpoint */}
            <div className='h-auto w-5/6 bg-gray-200 flex flex-col px-4 py-2 rounded-xl mb-2' >
                {/* Basic info */}
              <div className='h-[40px] w-full bg-gray-200 px-3 rounded-xl text-xl text-start flex' >
              <GoDotFill className='mt-[5px] mr-[2px]' /> Use this API endpoint to get the unemployment rates of a selected country by country code in range of years
              </div>
              <ApiContainer url={yearRange} copy={true}/>

              <div className='mt-1' >
                <p className='px-2 mb-1 font-medium' >Usage example :-</p>
                <ApiContainer url={yearRangeExample} copy={true}/>
              </div>

              <p className='px-2 mb-1 font-medium' >Output example :-</p>
              <img src={ssYearRange}
                className='h-auto w-2/5 px-2'
              ></img>
            </div>
        </>
      )}

      {isAdmin && (
        <>
          {/* edit endpoint */}
            <div className='h-auto w-5/6 bg-gray-200 flex flex-col px-4 py-2 rounded-xl mb-2' >
              <div className='h-[65px] w-full bg-gray-200 px-3 rounded-xl text-xl text-start flex' >
              <GoDotFill className='mt-[5px] mr-[2px]' /> Use this API endpoint to update or add new data to the main database (Note: Access has given to authorised Admins only who have the API key  )
              </div>
              <ApiContainer url={editUrl} copy={true}/>

              <div className='mt-1' >
                <p className='px-2 mb-1 font-medium' >Usage example :-</p>
                <ApiContainer url={editUrl} copy={true}/>

                <p className='px-2 mb-1 font-medium' >Pass the Headers like this which contains API KEY :-</p>
                <img src={ssHeader}
                  className='h-auto w-2/5 px-2'
                ></img>

                <p className='px-2 mb-1 font-medium' >Pass the Data to be added or updated like this in JSON format :-</p>
                <img src={ssBody}
                  className='h-auto w-2/5 px-2'
                ></img>
              </div>

              <p className='px-2 mb-1 font-medium' >Output example :-</p>
              <img src={editOutput}
                className='h-auto w-2/5 px-2'
              ></img>
            </div>
        </>
      )}
      

    </div>    
    </>
  )
}

export default App
