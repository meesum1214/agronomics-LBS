import Navbar from '@/layout/globalComponents/Navbar'
import SelectLand from '@/layout/Home/SelectLand'
import Head from 'next/head'

export default function Home() {
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

        <SelectLand />
      </main>
    </>
  )
}
