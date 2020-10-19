import { useHistory } from "react-router-dom"
import React, { useEffect } from "react"
import BaseLayout from "../BaseLayout"



const Index = () => {

    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            history.push("/")
        }, 4000)
    }, [])

    return (
        <BaseLayout>
            <div className="mainFullWidth">
                <div className="no-content-display">
                    <div className="no-content-data">
                        <img src='/images/no-data.svg' />
                        <p>Invalid URL, Redirecting to HomePage</p>
                     
                    </div>
                </div>
            </div>
        </BaseLayout>

    )

}

export default Index;

