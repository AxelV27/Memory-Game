import { useState } from 'react'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'

export default function App() {
    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, setEmojisData] = useState([])
    console.log(emojisData)
    
    async function startGame(e) {
        e.preventDefault()

        try{
            const response =  await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature")
             
            if(!response.ok){
                throw new Error("Could not fetch data from API")
            }

            const data = await response.json()
            const dataSample = data.slice(0, 5)
            console.log(data)

            setEmojisData(dataSample)
            setIsGameOn(true)
        } catch(err){
            console.error(err)
        }
        
    }
    
    function turnCard() {
        console.log("Memory card clicked")
    }
    
    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && <Form handleSubmit={startGame} />}
            {isGameOn && <MemoryCard handleClick={turnCard} />}
        </main>
    )
}