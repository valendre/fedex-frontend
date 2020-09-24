import React from "react";
import useRequest from "./useRequest";

export default function () {
    const [requestWithToken] = useRequest();

    function getCohortList() {
        const cohorts = requestWithToken("GET", "/cohorts", {});
        console.log(cohorts);
        return cohorts;

        //return cohorts.map((cohort) => {<option value={cohort.id}>{cohort.cohort_name}</option>});
    }

    return [getCohortList()];
}