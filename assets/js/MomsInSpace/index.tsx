import React from 'react';
import client from './client';
import { ApolloProvider } from "@apollo/client";
import wormTimeSlots from './wormTimeSlots';

const WormsInSpace = () => {
    return <ApolloProvider client={client}><wormTimeSlots /></ApolloProvider>
}

export default WormsInSpace;