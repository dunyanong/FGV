import Head from 'next/head'
import Image from 'next/image'

import LegendaryPlayers from '../public/legend-images/legends.png';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Goat Voting</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <section className="md:px-10 lg:px-20 grid items-center justify-center gap-6 pt-20 pb-8 md:pt-10 md:pb-12 lg:pt-3 lg:pb-10">
        <Image src={LegendaryPlayers} width={800} height={450} alt='alt' priority={true}/>
        <div className="flex flex-col items-start gap-4 lg:w-[52rem]">
          <h1 className="text-3xl font-bold leading-[1.1] tracking-tighter sm:text-5xl md:text-6xl">
            The G.O.A.T Voting 
          </h1>
          <p className="max-w-[42rem] leading-normal text-slate-700 sm:text-xl sm:leading-8">
            Who&#39;s the Greatest of All Time? Vote for your football legends now!
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="auth/Login" legacyBehavior>
            <a
              className="inline-flex items-center justify-center text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-slate-100 bg-slate-900 text-white hover:bg-slate-700 h-11 px-8 rounded-md"              
            >
              Vote Now
            </a>
          </Link>
          <a
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center text-sm font-medium transition-colors focus:outline-none focus:ring-2  disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-slate-100 bg-transparent border border-slate-200 hover:bg-slate-100 h-11 px-8 rounded-md"
            href="https://github.com/dunyanong/GoatVote"
          >
            GitHub
          </a>
        </div>
      </section>

    </div>
  )
}
