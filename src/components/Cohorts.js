import React, {useEffect, useState} from 'react';
import useRequest from "../hooks/useRequest";


export default function () {
    const [requestWithToken] = useRequest();
    const [cohortsList, setCohortsList] = useState([]);
    requestWithToken("GET", "/cohorts", {})
        .then(response => {
            console.log(response.cohorts);
            setCohortsList(response.cohort);
        })

    useEffect(()=>{
        console.log('useEffect');
    },[cohortsList])


    return (
        <>
            <p>{cohortsList}</p>
            <select name="cars" id="cars">
            </select>
        </>
    );
}