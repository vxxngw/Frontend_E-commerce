import React from 'react'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewLetter/NewsLetter'
import DescribeUs from '../Components/DescribeUs/DescribeUs'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-brands-svg-icons";
const Shop = () => {
    return (
        <div>
            <Popular />
            <NewCollections />
            <DescribeUs />
        </div>
    )
}

export default Shop