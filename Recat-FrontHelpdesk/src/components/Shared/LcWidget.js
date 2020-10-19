import { useEffect, useState } from 'react';
import Head from 'next/head';


const LcWidget = () => {
    const [domainName, setDomainName] = useState('')

    useEffect(() => {
        const domainname = window.location.hostname.split('.')[0]
        setDomainName(domainname)
    },[])

    return (
        <Head>
            {(domainName === "appy-pie-knowledge") ?
                <script id="appyWidget" src="https://chat.appypie.com/widget/build.js?cid=159473436134679785-159473436263787222" />
                : null}
        </Head>
    )
}

export default LcWidget;