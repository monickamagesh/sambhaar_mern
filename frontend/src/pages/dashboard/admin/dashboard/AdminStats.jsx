import React from 'react'

const AdminStats = ({stats}) => {
    console.log(stats)
  return (
    <div className='my-5 space-y-4'>
        <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1'>
            <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary hover:scale-105 transition-all duration-200 cursor-pointer'>
                <h2 className='text-lg font-semibold mb-2'>Total Eearning</h2>
                <p className='text-xl font-bold '>₹ {stats?.totalEarnings}</p>
            </div>
            <div className='bg-white shadow-md rounded-lg p-6 border hover:border-primary border-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer'>
                <h2 className='text-lg font-semibold mb-2'>All Orders</h2>
                <p className='text-xl font-bold'>{stats?.totalOrders}</p>
            </div>
            <div className='bg-white shadow-md rounded-lg p-6 border hover:border-primary border-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer'>
                <h2 className='text-lg font-semibold mb-2'>All Users</h2>
                <p className='text-xl font-bold'>{stats?.totalUsers}</p>
            </div>
            <div className='bg-white shadow-md rounded-lg p-6 border hover:border-primary border-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer'>
                <h2 className='text-lg font-semibold mb-2'>Total Products</h2>
                <p className='text-xl font-bold'>{stats?.totalProducts}</p>
            </div>
        </div>
    </div>
  )
}

export default AdminStats