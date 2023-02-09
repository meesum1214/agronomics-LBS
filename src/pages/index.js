import Footer from '../layout/globalComponents/Footer'
import Navbar from '../layout/globalComponents/Navbar'
import SelectLand from '../layout/Home/SelectLand'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getLands } from '../layout/API/add'
import { useRouter } from 'next/router'
import Loader from '../layout/globalComponents/Loader'

export default function Home() {

  const [lands, setLands] = useState([])
  const [selectedLand, setSelectedLand] = useState(null)
  const router = useRouter()
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    
    if (localStorage.getItem('lbs-token-7878p') === null) {
      router.push('/login')
    } else {
      let user = localStorage.getItem('lbs-user-app-web')
      getLands(JSON.parse(user).id).then(res => {
        setLands(res.data)
        setLoader(false)
      }).catch(err => {
        console.log(err)
        setLoader(false)
      })
    }

  }, [])


  return (
    <>
      <Loader LoadingState={loader} />
      <Head>
        <title>Agronomics LBS</title>
        <meta name="description" content="Agronomics Location Based Suitabity" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <SelectLand lands={lands} setSelectedLand={setSelectedLand} selectedLand={selectedLand} />
      <Footer />
    </>
  )
}
