
import React from 'react'
import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { BarChart, Bar } from 'recharts'

const data = [
    { month: 'Jan', sales: 10200 },
    { month: 'Feb', sales: 12300 },
    { month: 'Mar', sales: 9600 },
    { month: 'Apr', sales: 11000 },
    { month: 'May', sales: 14500 },
    { month: 'Jun', sales: 12000 },
    { month: 'Jul', sales: 17600 },
    { month: 'Aug', sales: 16100 },
    { month: 'Sep', sales: 13200 },
    { month: 'Oct', sales: 14800 },
    { month: 'Nov', sales: 18900 },
    { month: 'Dec', sales: 20700 },
]

const BarSalesChart = () => {
    return (
        <div className="w-full h-[370px] rounded-lg">
            <h3 className="text-lg font-bold">Monthly Sales (Bar View)</h3>
            <ResponsiveContainer width="100%" height="100%" className="text-sm md:text-md mt-4 rounded-lg py-2 bg-white shadow-sm">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(v) => `KES ${v.toLocaleString()}`} />
                    <Bar dataKey="sales" fill="#ff637e" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarSalesChart
