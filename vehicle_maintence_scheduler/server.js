import express from "express"
import cors from "cors"

const app = express()
const PORT = 3000
const API = "http://20.207.122.201/evaluation-service/"

app.use(cors())
app.use(express.json())

let depots = []
let vehicles = []

const fetchDepots = async () => {
    const data = await fetch(API + "depots")
    const data2 = await data.json()
    depots = data2["depots"]
    console.log("successfully fetched");

    fetchVehicles()
}


const fetchVehicles = async () => {
    const data = await fetch(API + "vehicles")
    const data2 = await data.json()
    depots = data2["vehicles"]
    console.log("successfully fetched");

    vehiclesMaintenanceSchedular()
}


let results = []
const vehiclesMaintenanceSchedular = () => {
    const sortedDeports = depots.sort((a, b) => a["MechanicHours"] - b["MechanicHours"])
    const sortedVehicles = depots.sort((a, b) => (a["Duration"] - b["Duration"] || b["Impact"] - a["Impact"])) // sorting as desc(Impact) and asc(duration)


    // the depots with less mechanicHours will get vehicles task with less time and more impact rates
    let i = 0;
    let j = 0;
    sortedDeports.forEach(depot => {
        let countTime = 0;
        let countImpact = 0;
        results.push({
            depotID: depot.ID,
            vehicleTaskIDs : [],
            countImpact : 0
        });

        while (i < sortedVehicles.length) {
            const vehicles = sortedVehicles[i];
            if (countTime + vehicles["Duration"] > depot.MechanicHours) {
                results[j].countImpact = countImpact;
                break
            }

            countTime += vehicles["Duration"]
            countImpact += vehicles["Impact"];
            results[j].vehicleTaskIDs.push(vehicles["TaskID"]);
            i++;
        }

        j++;
    })

    return results;
}



app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})