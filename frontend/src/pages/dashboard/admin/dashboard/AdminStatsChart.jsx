import React from 'react'
import { Doughnut, Line } from 'react-chartjs-2';
import 'chart.js/auto'
const AdminStatsChart = ({ stats }) => {
    console.log(stats)
    const doughnutData = {
        labels: ['Total Orders', 'Total Products', 'Total Reviews', 'Total Users'],
        datasets: [
            {
                label: "Admin Stats",
                data: [
                    stats?.totalOrders,
                    stats?.totalProducts,
                    stats?.totalReviews,
                    stats?.totalUsers,
                ],
                backgroundColor: [
                    '#990026',
                    '#E4003A',
                    '#EB5B00',
                    '#ffc233',
                ],
                hoverBackgroundColor: [
                    '#b3002d',
                    '#ff1a53',
                    '#ff711a',
                    '#ffd980',
                ]
            }
        ]
    }

    const data =  new Array(12).fill(0);
    // map correct months
    stats?.monthlyEarnings.forEach((entry) => {
        data[entry.month - 1] = entry.earnings;
    })

    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Monthly Earnings',
                data, 
                fill: false,
                backgroundColor: '#ff4e03 ',
                borderColor: '#ff4e03 ',
                tension: 0.1, 
            }
        ]
    }
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <div className='mt-12 space-y-12'>
            <h2 className='text-xl font-semibold mb-4'>Admin Stats Overview</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* pie chart */}
                <div className='max-h-96 md:h-96 w-full'>
                    <Doughnut data={doughnutData} options={options}/>
                </div>

                {/* line chart */}
                <div className='max-h-96 md:h-96 w-full'>
                    <Line data={lineData} options={options}/>
                </div>
            </div>
        </div>
    )
}

export default AdminStatsChart