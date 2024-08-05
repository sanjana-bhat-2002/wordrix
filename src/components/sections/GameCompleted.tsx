import React from 'react'
import { Button } from '../ui/button'

const GameCompleted = () => {
  return (
    <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
    <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="/read.svg"/>
    <div className="text-center lg:w-2/3 w-full">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-300">Nice try! Come back tomorrow for a new word</h1>
      
      <div className="flex justify-center">
        
        <Button variant="default" className="text-white">Profile</Button>
      </div>
    </div>
  </div>
</section>
  )
}

export default GameCompleted