const axios = require('axios');
const db = require('../db/mySql');
require('dotenv').config();

async function fetchEnemployementData(){
    const url = `https://api.worldbank.org/v2/country/all/indicator/SL.UEM.TOTL.ZS?date=2024&format=json&per_page=10000`;

    try{
        const res = await axios.get(url);
        const data = res.data[1];
        // console.log(data);

        for(const row of data){
            if(row.value == null) continue;

            const {id : country_code } = row.country;
            const year = parseInt(row.date);
            const unemployment_rate = row.value;

            const [country] = await db.query(
                `SELECT id FROM countries WHERE country_code = ?`,
                [country_code]
            );

            if(country.length){
                const country_id = country[0].id;
                await db.query(
                    `INSERT INTO countries_unemployment (country_id, year, unemployment_rate)
                    VALUES (?, ?, ?)`,
                    [country_id, year, unemployment_rate]
                );
            }

        }

        console.log("Data Inserted Successfully");
    }catch(err){
        console.log("Some error has occured : " ,err);
    }
};

fetchEnemployementData();