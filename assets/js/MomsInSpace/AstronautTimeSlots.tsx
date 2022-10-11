import React, { useState, useCallback } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

interface TimeSlot {
    id: number | string;
    startTime: string;
}

const worm_TIME_SLOTS = gql`
{
    wormTimeSlots {
        id
        startTime
    }
}
`

const worm_SPACE_WALK = gql`
mutation($alternateTime: String){
    wormSpaceWalk(alternateTime: $alternateTime) {
        startTime
    }
}
`

const wormTimeSlots = () => {
    const { data, loading, error } = useQuery(worm_TIME_SLOTS);
    const [alternateTime, setAlternateTime] = useState('');
    const [wormSpaceWalk] = useMutation(worm_SPACE_WALK);

    const mutationResponse = useCallback(
        () => {
            wormSpaceWalk({ variables: { alternateTime: "2022-02-28T16:00:00.000Z" } })
        },
        [alternateTime, setAlternateTime],
    );
    console.log(mutationResponse)

    if (loading) return <div>'Loading...'</div>
    if (error) return <div>`Error! ${error.message}`</div>

    return <div className="worm_time_slots">
        <h1 className="worm_time_slots_header">Space Walk Scheduler</h1>
        <h3>Select a start time for your spacewalk</h3>
        {data?.wormTimeSlots ? data.wormTimeSlots.map((timeslot: TimeSlot) => (
            <div className="worm_time_slots_list">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="radio"
                                    value={timeslot.startTime}
                                    name="time_slot"
                                />
                                {timeslot.startTime}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )) : null}

    </div>
}

export default wormTimeSlots;