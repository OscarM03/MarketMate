// components/MetricCard.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MetricCardProps {
    title: string
    icon: React.ReactNode
    value: string | number
    extra?: string | React.ReactNode
    bgColor?: string
    iconColor?: string
}

const MetricCard = ({ title, icon, value, extra, bgColor = 'white', iconColor = 'text-muted-foreground' }: MetricCardProps) => {
    return (
        <Card className={`w-full shadow-md gap-3 border-none ${bgColor} h-36`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <div className={`p-1 rounded ${iconColor}`}>
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-lg md:text-2xl font-bold">{value}</div>
                {extra && <p className="text-xs text-muted-foreground mt-1">{extra}</p>}
            </CardContent>
        </Card>
    )
}

export default MetricCard
