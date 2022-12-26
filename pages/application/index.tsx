import Head from 'next/head'
import SearchInput from '../../components/searchInput/SearchInput.comp'

export default function Home() {
  return (
    <>
      <Head>
        <title>Admin Console</title>
        <meta name="description" content="Admin console" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>Admin Console</div>
        <SearchInput handleSearch={() => {}} />
      </main>
    </>
  )
}
