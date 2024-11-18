import React from 'react'

const AdminStats = ({stats}) => {
    console.log(stats)
  return (
    <section>
    <div className="">
          <h2 className="text-xl font-bold mb-4 mt-4">Summary</h2>
          <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1'>
            <div className='bg-white shadow-md rounded-lg p-6 border-b-4 border-[#ff1a1a] hover:scale-105 transition-all duration-200 cursor-pointer'>
                <h2 className='text-lg font-semibold mb-2'>Total Earning</h2>
                <p className='text-xl font-bold '>₹ {stats?.totalEarnings?.toFixed(2)}</p>
            </div>
            <div className='bg-white shadow-md rounded-lg p-6 border-b-4  border-[#d9ff00] hover:scale-105 transition-all duration-200 cursor-pointer'>
                <h2 className='text-lg font-semibold mb-2'>All Orders</h2>
                <p className='text-xl font-bold'>{stats?.totalOrders}</p>
            </div>
            <div className='bg-white shadow-md rounded-lg p-6 border-b-4 border-[#ffa200] hover:scale-105 transition-all duration-200 cursor-pointer'>
                <h2 className='text-lg font-semibold mb-2'>All Users</h2>
                <p className='text-xl font-bold'>{stats?.totalUsers}</p>
            </div>
            <div className='bg-white shadow-md rounded-lg p-6 border-b-4 border-[#ffd000]  hover:scale-105 transition-all duration-200 cursor-pointer'>
                <h2 className='text-lg font-semibold mb-2'>Total Products</h2>
                <p className='text-xl font-bold'>{stats?.totalProducts}</p>
            </div>
        </div>
        </div>
    
    </section>
    
  )
}

export default AdminStats