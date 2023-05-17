import Head from "next/head";
import { auth, db } from "../utils/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { useAuthState } from "react-firebase-hooks/auth";


const VoteTime = () => {
  const [playerData, setPlayerData] = useState([]);
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    const fetchData = async () => {
      const playersRef = collection(db, 'legendPoints');
      const playersQuery = query(playersRef, orderBy('totalPoints', 'desc'), limit(5)); // Adjust the limit as needed
      const unsubscribe = onSnapshot(playersQuery, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setPlayerData(data);
      });

      return () => unsubscribe();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (playerData.length > 0) {
      const chartData = {
        labels: playerData.map((player) => player.footballplayer),
        datasets: [{
          label: 'Total Points',
          data: playerData.map((player) => player.totalPoints),
          backgroundColor: 'black', // Adjust the colors as needed
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1
        }]
      };

      const chartOptions = {
        scales: {
          x: {
            beginAtZero: true,
            max: Math.max(...playerData.map((player) => player.totalPoints)) + 10, // Adjust the maximum value as needed
            ticks: {
              precision: 0
            }
          }
        }
      };

      const ctx = document.getElementById('chart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
      });
    }
  }, [playerData]);
  
  return (
    <div>
      <Head>
        <title>FVG</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="grid items-center justify-center gap-6 pt-20 md:pt-10 md:pb-12 lg:pt-8 lg:pb-10">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">Ranking 📈</h1>
          <p className="text-xl text-slate-600">Here, you can explore the final rankings of the greatest football players of all time as voted by our audience.</p>
        </div>

        <hr className="py-8 border-slate-200" />
        
        <div className="grid items-center justify-center gap-6 pt-20 md:pt-10 md:pb-12 lg:pt-8 lg:pb-10">
          <canvas id="chart"></canvas>
        </div>

      </div>
    </div>
  );  
}
 
export default VoteTime;
