'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image"

const levels = [
  {
    word: ['R','A','T','O','N'],
    images: ['/images/RATON/RATON1.jpg', '/images/RATON/RATON2.jpg', '/images/RATON/RATON3.jpg', '/images/RATON/RATON4.jpg'],
    letters: ['A', 'R', 'W', 'T', 'L', 'S', 'F', 'E', 'T', 'G', 'O', 'D', 'N', 'I']
  },
]

const Game = () => {
  const [level, setLevel] = useState(0)
  const [word, setWord] = useState([])
  const [isWinner, setIsWinner] = useState(false)
  const [lettersSelected, setLettersSelected] = useState([])

  useEffect(()=>{
    const isEqual = JSON.stringify(word) === JSON.stringify(levels[level].word);
    if(isEqual){
      setIsWinner(true)
    } else {
      setIsWinner(false)
    }
  }, [word])

  useEffect(()=>{
    const newWord = levels[level].word.map(letter=>'*')
    setWord(newWord)
  }, [level])

  const onClickLetter = (letter) => {
    let newWord = [...word]
    newWord[newWord.indexOf('*')] = letter
    setWord([...newWord])
  }

  console.log(word)

  return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="flex">
          <div className="buttonStart w-[500px] h-[500px] bg-white flex flex-wrap justify-around items-center">
            {
              levels[level].images.map((img, i) => (
                  <div key={i} className="w-[200px] h-[200px] rounded-md overflow-hidden">
                    <Image src={img} alt={img} width={200} height={200}/>
                  </div>
              ))
            }
          </div>
          <div className="grid grid-cols-2 gap-2 ml-4">
            {
              levels[level].letters.map((letter, i) => (
                  <button key={i} className={`buttonLetter ${i === 3 && 'buttonLetterSelected'}`} onClick={()=>onClickLetter(letter)}>
                    {
                      letter
                    }
                  </button>
              ))
            }
          </div>
        </div>
        <div className="flex items-center gap-4 mt-8">
          {
            word.map((n, i)=>(
                <div key={i} className="w-12 h-12 bg-white font-bold rounded-md flex justify-center items-center">
                  {
                    n === '*' ? '' : n
                  }
                </div>
            ))
          }
        </div>
        {
          isWinner &&
            <div className="absolute top-0 left-0 w-full h-full bg-black/20 backdrop-blur-md flex flex-col justify-center items-center">
              <h2 className="text-4xl text-white font-bold mb-8">
                Genial!, Has pasado este nivel
              </h2>
              <button className="bg-green-400 px-8 py-4 rounded-full font-bold" onClick={()=>setLevel(1)}>
                Siguiente Nivel
              </button>
            </div>
        }
      </div>
  )
}

export default Game