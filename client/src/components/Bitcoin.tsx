import React from 'react'
import axios from 'axios'
import cors from 'cors'

function Bitcoin() {
    const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    const qString = "?CMC_PRO_API_KEY=cce87ebd-aca9-4f37-b822-75a972468e5a" + "&start=1&limit=5&convert=USD";

    const result = axios.get(url + qString)
    console.log(result)

    return (
        <div>
            
        </div>
    )
}

export default Bitcoin
