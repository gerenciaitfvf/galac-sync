import axios from "axios";

export const getLastUpdateTable = (tablename : string) => {

    if(!tablename)
        return Promise.reject("getLastUpdateTable: table name is required");

    const options = {
        "method" : "GET",
        "url" :  `${process.env.GALAC_AWS_URL}/mcs/${tablename}`,
        "headers" : {
            "access-token-galac-fvf" : `${process.env.GALAC_ACCESS_TOKEN}`
        }
    }

    return axios.request(options)
    .then((response)=>{
        if(response.data.status != "success") {
            return Promise.reject(response.data);
        }

        return Promise.resolve({
            status : "success",
            statuscode : 200,
            data : response.data.data
        })
    }).catch((e)=>{
        return Promise.resolve({
            status : "error",
            statuscode : "MSC01",
            data : e
        });
    })
}

export const touchLastUpdateTable = (tablename : string) => {

    if(!tablename)
        return Promise.reject("touchLastUpdateTable: table name is required");

    const options = {
        "method" : "PATCH",
        "url" :  `${process.env.GALAC_AWS_URL}/mcs/${tablename}`,
        "headers" : {
            "access-token-galac-fvf" : `${process.env.GALAC_ACCESS_TOKEN}`
        }
    }

    return axios.request(options)
    .then((response)=>{
        if(response.data.status != "success") {
            return Promise.reject(response.data);
        }

        return Promise.resolve({
            status : "success",
            statuscode : 200,
            data : response.data.data
        })
    }).catch((e)=>{
        return Promise.resolve({
            status : "error",
            statuscode : "MSC02",
            data : e
        });
    })
}
export const touchLastUpdateTableId = (tablename : string, id: number) => {

    if(!tablename)
        return Promise.reject("touchLastUpdateTable: table name is required");

    const options = {
        "method" : "PATCH",
        "url" :  `${process.env.GALAC_AWS_URL}/mcs/${tablename}/${id}`,
        "headers" : {
            "access-token-galac-fvf" : `${process.env.GALAC_ACCESS_TOKEN}`
        }
    }

    return axios.request(options)
    .then((response)=>{
        if(response.data.status != "success") {
            return Promise.reject(response.data);
        }

        return Promise.resolve({
            status : "success",
            statuscode : 200,
            data : response.data.data
        })
    }).catch((e)=>{
        return Promise.resolve({
            status : "error",
            statuscode : "MSC03",
            data : e
        });
    })
}