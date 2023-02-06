import { getLands } from '@/layout/API/add'
import Navbar from '@/layout/globalComponents/Navbar'
import SelectLand from '@/layout/Home/SelectLand'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {

  const [lands, setLands] = useState([])
  const [selectedLand, setSelectedLand] = useState(null)

  useEffect(() => {
    getLands(16).then(res => {
      // console.log(res.data)
      setLands(res.data)
    })
  }, [])


  return (
    <>
      <Head>
        <title>Agronomics LBS</title>
        <meta name="description" content="Agronomics Location Based Suitabity" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />

        <SelectLand lands={lands} setSelectedLand={setSelectedLand} selectedLand={selectedLand} />
      </main>
    </>
  )
}
