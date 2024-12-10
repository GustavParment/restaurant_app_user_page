import BottomBar from '@/app/components/BottomBar'
import Navbar from '@/app/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow pt-20 m-10">
        
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-black">Settings Page</h1>
          <p className="text-black">Add your content in this section.</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  )
}

export default page
