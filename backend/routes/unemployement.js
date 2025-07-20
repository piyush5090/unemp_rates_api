const express = require("express");
const router = express.Router();
const db = require("../db/mysql");
const verifyApiKey = require("../middlewares/verifyApiKey");

router.get("/country/:code", async (req,res) => {
    const { code } = req.params;
    try{
        const [country] = await db.query(
            `SELECT id FROM countries WHERE country_code = ?`,
            [code]
        );

        if(!country.length) return res.status(404).json({message: "Country not found"});

        const [data] = await db.query(
            `SELECT year, unemployment_rate FROM countries_unemployment WHERE country_id = ? 
            ORDER BY year ASC`,
            [country[0].id]
        );

        res.json(data);
    }catch(err){
        res.status(500).json({message: "Internal Server error", error : err.message});
    }
});

router.get("/country/:code/year/:year",async (req,res) => {
    const code = req.params.code;
    const year = req.params.year;
    
    try{
        const [data] = await db.query(
            `SELECT c1.country_name, c2.year, c2.unemployment_rate FROM countries AS c1
            INNER JOIN countries_unemployment AS c2 ON c1.id = c2.country_id 
            WHERE c1.country_code = ? AND c2.year = ?`,
            [code,year]
        );

        res.json(data);
    }catch(err){
        res.status(500).json({message: "Internal Server error", error : err.message});
    }
});

router.get("/country/:code/fromyear/:fromYear/toyear/:toYear",async (req,res) => {
    const code = req.params.code;
    const fromYear = req.params.fromYear;
    const toYear = req.params.toYear;

    try{
        if(toYear < fromYear) res.status(400).json({message : "Bad request"});

        const [data] = await db.query(
            `SELECT c1.country_name, c2.year, c2.unemployment_rate FROM countries AS c1
            INNER JOIN countries_unemployment AS c2 ON c1.id = c2.country_id 
            WHERE c1.country_code = ? AND c2.year BETWEEN ? AND ?`,
            [code, fromYear, toYear]
        );

        res.json(data);
    }catch(err){
        res.status(500).json({message: "Internal Server error", error : err.message});
    }
});


router.get("/all/country", async (req,res) => {
    try{
        const [data] = await db.query(
            `SELECT c1.country_name, c2.year, c2.unemployment_rate FROM countries AS c1
            INNER JOIN countries_unemployment AS c2 ON c1.id = c2.country_id`
        );

        res.json(data);
    }catch(err){
        res.status(500).json({message: "Internal Server error"});
    }
});

router.post("/edit", verifyApiKey, async (req,res) => {

    const { action, country_code, year, unemployment_rate } = req.body;

    if(!["add", "update"].includes(action)){
        return res.status(400).json({message : "bad Request : invalid Action"});
    }

    try{
        const [country] = await db.query(
            `SELECT id FROM countries WHERE country_code = ?`, [country_code]
        );

        if(!country.length){
            return res.status(404).json({message : "Country not found"});
        }

        let country_id = country[0].id;

        if(action == "add"){
            await db.query(
                `REPLACE INTO countries_unemployment (country_id, year, unemployment_rate)
                VALUES (?, ?, ?)`,
                [country_id, year, unemployment_rate]
            );

            res.json({message : "Data Added or replaced successfully"});
        };

        if(action == "update"){
            const [existing] = await db.query(
                "SELECT * FROM countries_unemployment WHERE country_id = ? AND year = ?",
                [country_id, year]
        );

        if(!existing.length){
            return res.status(404).json({message : "Record not found"});
        }

        await db.query(
            `UPDATE countries_unemployment SET unemployment_rate = ?    
            WHERE country_id = ? AND year = ?`, [unemployment_rate,country_id, year]
        );

        return res.json({message : "Record updates successfully"});
        }
    }catch(err){
        res.status(500).json({message: "Internal Server error" ,error : err.message});
    }
})

module.exports = router;