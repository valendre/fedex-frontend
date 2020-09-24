import React, {useEffect, useState} from 'react';
import useRequest from "../hooks/useRequest";


export default function () {
    const [requestWithToken] = useRequest();
    const [cohortsList, setCohortsList] = useState([]);

    useEffect(()=>{
      async function fetchCohorts() {
        let response = await requestWithToken("GET", "/cohorts", {});
        setCohortsList(response.cohorts);
      }
      fetchCohorts();
    },[])


    return (
        <>
            {cohortsList.map(cohort => <div>{cohort.cohort_name}</div>)}
            <select name="cars" id="cars">
            </select>
        </>
    );
}