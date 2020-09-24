import React, { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import CohortSingleton from './CohortSingleton';

export default function (props) {
  const [requestWithToken] = useRequest();
  const [cohortsList, setCohortsList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  
  useEffect(() => {
    async function fetchCohorts() {
      let response = await requestWithToken("GET", "/cohorts", {});
      setCohortsList(response.cohorts);
    }
    fetchCohorts();
  }, [selectedValue]);
  return (
    <>
      <select
        name="cohorts"
        id="cohorts"
        placeholder="Select Option"
        onChange={(event) => {
          setSelectedValue(event.target.value);
        }}
      >
        <option value="">Select a cohort!</option>
        {cohortsList.map((cohort) => (
          <option value={cohort.cohort_id}>{cohort.cohort_name}</option>
        ))}
      </select>
      {selectedValue ? <h2>{cohortsList[selectedValue-1].cohort_name}</h2> : null}
      {selectedValue ? <CohortSingleton id={selectedValue} /> : null}
    </>
  );
}
