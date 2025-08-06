import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { assets } from '@/assets'
import { Link } from 'react-router'

const categories = [
    { name: "Vegetables", icon: assets.vegetable },
    { name: "Drinks", icon: assets.drinks },
    { name: "Fruits", icon: assets.fruits },
    { name: "Electronics", icon: assets.electronics },
    { name: "Medicine", icon: assets.medicine },
    { name: "Vegetables", icon: assets.vegetable },
    { name: "Drinks", icon: assets.drinks },
    { name: "Fruits", icon: assets.fruits },
    { name: "Electronics", icon: assets.electronics },
    { name: "Medicine", icon: assets.medicine },

]

const Categories = () => {
    return (
        <div className="screen-w relative w-full mt-6">
            <Carousel className="w-full ">
                <CarouselContent className='overflow-x-auto remove-scrollbar'>
                    {categories.map((category, index) => (
                        <CarouselItem key={index} className="w-full basis-1/4 sm:basis-1/6 md:basis-1/7 lg:basis-1/8 2xl:basis-1/8">
                            <div className="">
                                <Card className='p-0 border-none shadow-none'>
                                    <Link to="/">
                                        <CardContent className="border p-0 border-gray-200 rounded-xl flex flex-col items-center gap-2 py-1 cursor-pointer">
                                            <img
                                                src={category.icon}
                                                alt={category.name}
                                                className=" object-cover rounded-t-xl"
                                            />
                                            <div className="">
                                                <h3 className="text-sm ">{category.name}</h3>
                                            </div>
                                        </CardContent>
                                    </Link>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="-left-1  md:-left-10 top-1/2 -translate-y-1/2 z-10 bg-white max-md:hidden" size="sm" />
                <CarouselNext className="-right-1 md:-right-10 top-1/2 -translate-y-1/2 z-10 max-md:hidden" />
            </Carousel>
        </div>
    )
}

export default Categories
