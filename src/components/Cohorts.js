import React, {useEffect} from 'react';
import useRequest from "../hooks/useRequest";
import {useState} from 'react';
import useCohorts from "../hooks/useCohorts";

export default function () {
    const [cohortsList] = useCohorts();

    return (
        <>
            <select name="cars" id="cars">
            </select>
        </>
    );
}