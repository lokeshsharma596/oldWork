import React, { useEffect } from "react"
import BaseLayout from "../BaseLayout"
import { useSelector, useDispatch } from "react-redux"
import { fetchTicketsRequest } from "./actions"


const Index = (pops) => {


    const dispatch = useDispatch()

    const ticketData = useSelector(state => state.ticketReducer)

    useEffect(() => {
        dispatch(fetchTicketsRequest({ org_id: 'appyone', email: 'bineet@appypiellp.com' }))
    }, [])

    console.log(ticketData.tickets.length)
    return (
        <BaseLayout>
            <div className="mainFullWidth">
                <div className="tilesSection">
                    <div className="container">
                        <div className="row">

                            {(ticketData.tickets.length > 0) ?
                                <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                    <div className="panel panel-default help-desk-list">
                                        <ul>
                                            <li>   
                                                <h1>Status</h1>
                                            </li>
                                            {ticketData.tickets.map((ticket, i) => (
                                                <li key={i}>
                                                    <h3>{ticket.ticketStatus.name}</h3>
                                                </li>
                                            ))}

                                        </ul>
                                    </div>
                                </div>
                                : <p>Loader...</p>}
                        </div>

                    </div>
                </div>
            </div>
        </BaseLayout>

    )

}

export default Index;

