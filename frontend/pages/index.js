import Link from 'next/link'
import Head from 'next/head'
import {useRouter} from 'next/router'
import React, { useState } from 'react'
import axios from 'axios'
import IcBaselineArrowCircleDown from '~icons/ic/baseline-arrow-circle-down.jsx'

export default function Home() {

  const router = useRouter()
  let file = null;

  // Error Message
  const [isVisible, setIsVisible] = useState(false);


  function handleFile(event) {
    event.preventDefault();
    file = event.target.files[0]
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (file != null) {    
      setIsVisible(false)

      let formData = new FormData();
      formData.append('file', file);

      axios.post('http://192.168.1.229:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => { 
        let data = response.data
        router.push({pathname: 'result', query: {minsWatched: data[0], videosWatched: data[1], channels: data[2], searches: data[3], comments: data[4], liked: data[5], image: data[6]}})
       }).catch(error => {
       if (error.response.status == 400) {
          setIsVisible(true)
        }
    });
    }
  }
  
  return (
    <div className="w-screen h-screen bg-background font-sans">
      <Head>
        <title>YouTube Wrapped</title>
        <meta name="description" content="What have you been up to this year?" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="snap-y snap-mandatory scroll-smooth overflow-y-scroll text-white content-center justify-center text-center h-screen scrollbar">
        <div className="snap-center snap-normal flex flex-col w-full h-full justify-center content-center items-center gap-y-16"> 
          <h1 className="text-7xl lg:text-9xl font-bold">YouTube<br />Wrapped</h1>
          <Link href="#how" scroll={true} replace><IcBaselineArrowCircleDown className="text-link hover:text-on w-16 h-16 animate-bounce transition ease-in-out delay-100 duration-300"/></Link>
        </div>

        <div className="snap-center snap-normal flex flex-col h-full content-center justify-center items-center gap-y-6 sm:gap-y-4 md:gap-y-6 lg:gap-y-12" id="how"> 
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold">How to download your data</h2>
          <ol className="px-8 text-sm sm:text-xs md:px-0 md:text-base lg:px-0  list-decimal text-left">
            <li>Head to <a className="text-link hover:text-on underline transistion duration-300 ease-in-out" target="_blank" rel="noreferrer" href="https://takeout.google.com">Google Takeout</a> and sign in</li>
            <li>Select "YouTube and YouTube Music" </li>
            <li>Hit next step and configure your preferences </li>
            <li>Ensure the file type is .zip and create the export</li>
            <li>Once the export is finished ensure it has the following files:</li>
            <ol className="list-disc pl-5">
                <li>search-history.html</li>
                <li>watch-history.html</li>
                <li>my-comments.html</li>
                <li>subscriptions.csv</li>
            </ol>
            <li>Remove any unnessary files for a speedy upload, for example any videos</li>
            <li>Upload the required files as in the .zip format</li>
          </ol>
          <Link href="#upload" scroll={true} replace><IcBaselineArrowCircleDown className="text-link hover:text-on w-16 h-16 animate-bounce transition ease-in-out delay-100 duration-300"/></Link>
        </div>

        <div className="snap-center snap-normal flex flex-col h-full content-center justify-center items-center gap-y-12" id="upload"> 
          <h2 className="text-2xl md:text-3xl font-bold">Upload your data</h2>
            {isVisible && <div className="bg-[#7A3897] p-5 rounded-lg">
            <h1 className="font-bold font-2xl text-left">An error occurred</h1>
            <p>Please ensure you uploaded the correct file.</p>
            </div>}
          <form  className="flex flex-col gap-y-4 " onSubmit={handleSubmit}>
            <input type="file" id="file" accept=".zip" onChange={handleFile} hidden/>
            <label className="bg-link py-4 px-8 rounded-full hover:bg-on transition ease-in-out delay-100 duration-300" htmlFor="file">Select File</label>
            <input className="bg-link py-4 px-8 rounded-full hover:bg-on transition ease-in-out delay-100 duration-300" type="submit" value="Upload File" />
          </form>
  
        </div>
      </main>

      <footer className="">
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className="">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a> */}
      </footer>
    </div>
  )
}
