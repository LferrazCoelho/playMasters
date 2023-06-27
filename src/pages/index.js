import Image from 'next/image'
import Link from 'next/link';
import { useState, useEffect } from "react"

const URL_API = "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/"

export default function Home() {

  const [loading, setLoading] = useState(false);
  const [statusApi, setStatusApi] = useState(0);
  const [listGames, setListGames] = useState(null);
  const [endTime, setEndTime] = useState(false);
  const [msgPage, setMsgPage] = useState(false);

  const controller = new AbortController()
  const signal = controller.signal

  const fetchData = async () => {
    try {
      setLoading(true)

      setTimeout(stopWatch, 5000)

      const response = await fetch(URL_API, {
        method: 'GET',
        signal: signal,
        headers: {
          "dev-email-address": "lferraz.dev@gmail.com"
        },
      })

      const data = await response.json()

      setStatusApi(response.status)
      setListGames(data)

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  function stopWatch() {
    setEndTime(true)
    controller.abort()
  }

  return (
    <main className="flex justify-center items-center w-screen min-h-screen p-10 md:p-24">
      <div>
        { loading && !listGames &&
          <div className="flex flex-col justify-center items-center">
            <Image
              className=""
              src="/loading.svg"
              alt="Carregando a lisat de jogos"
              width={100}
              height={100}
              priority
            />
            <p className="animate-pulse">Loading Games list</p>
          </div>
        }

        { endTime && !listGames &&
          <div className="flex flex-col justify-center items-center">
            <Image
              className="m-8"
              src="/endtime.png"
              alt="Carregando a lisat de jogos"
              width={80}
              height={80}
              priority
            />
            <p className="w-80 text-center">The server took a while to respond, please try again later.</p>
            <button className="bg-gray-700 m-8 py-2 px-3 rounded-lg hover:bg-gray-800" onClick={() => window.location.reload()}>refresh page</button>
          </div>
        }

        { statusApi >= 500 &&
          <div className="flex flex-col justify-center items-center">
            <Image
              className="m-8"
              src="/apifail.png"
              alt="Carregando a lisat de jogos"
              width={80}
              height={80}
              priority
            />
            <p className="w-80 text-center">The server failed to respond, try reloading the page.</p>
            <button className="bg-gray-700 m-8 py-2 px-3 rounded-lg hover:bg-gray-900" onClick={() => window.location.reload()}>reload page</button>
          </div>
        }
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {statusApi == 200 && listGames.map((item, key) =>
            <div className="bg-gray-700 rounded-lg m-4 text-gray-200" key={key}>
              <Image
                className="rounded-t-lg w-full object-cover object-center"
                src={item.thumbnail}
                alt="Carregando a lisat de jogos"
                width={100}
                height={100}
                priority
              />
              <div className="p-4">
                <p className="mb-2 font-bold">
                  {item.title}
                </p>
                <p className="text-sm">
                  Genre: {item.genre}
                </p>
                <p className="text-sm">
                  Platform: {item.platform}
                </p>
                <p className="text-sm mb-2">
                  Publisher: {item.publisher}
                </p>
                <Link 
                  className="w-full text-gray-800 bg-gray-200 my-4 py-2 px-3 rounded-lg hover:bg-gray-400"
                  href={item.freetogame_profile_url}
                  >
                  to play
                </Link>
              </div>
            </div>
        )}
      </div>


    </main>
  )
}

        // "id": 521,
        // "title": "Diablo Immortal",
        // "thumbnail": "https://www.freetogame.com/g/521/thumbnail.jpg",
        // "short_description": "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
        // "game_url": "https://www.freetogame.com/open/diablo-immortal",
        // "genre": "MMOARPG",
        // "platform": "PC (Windows)",
        // "publisher": "Blizzard Entertainment",
        // "developer": "Blizzard Entertainment",
        // "release_date": "2022-06-02",
        // "freetogame_profile_url": "https://www.freetogame.com/diablo-immortal"    