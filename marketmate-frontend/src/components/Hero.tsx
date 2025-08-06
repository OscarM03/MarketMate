import { assets } from '@/assets';
import { motion } from 'framer-motion';
import React from 'react';

const images = [
    assets.image1,
    assets.image2,
    assets.image3,
    assets.image4,
    assets.image5,
    assets.image6,
    assets.image7,
    assets.image8,
    assets.image9,
    assets.image10,
    assets.image11,
    assets.image12,
];

const Hero = () => {
    // Responsive widths
    // const mobileWidth = 90;
    // const desktopWidth = 200;
    // const visiblePart = mobileWidth / 2;
    // const overlapOffset = mobileWidth - visiblePart;

    return (
        <div className="screen-w relative overflow-hidden h-[160px] sm:h-[200px] flex items-center bg-white rounded-md mt-6">
            <div className="relative h-[250px] w-full">
                {/* Static First Image */}
                <div className="absolute top-0 left-0 z-50">
                    <img
                        src={images[0]}
                        className="h-60 w-[90px] sm:w-[200px] object-cover"
                        alt="Static Hero"
                    />
                </div>

                {/* Animated Images */}
                {images.slice(1, -1).map((src, index) => (
                    <motion.div
                        key={index}
                        className="absolute top-0"
                        style={{
                            left: `calc(${(index + 1)} * 45px + ${index * 5}%)`, // rough overlap spacing that scales
                            zIndex: 49 - index,
                        }}
                        initial={{ x: 100, opacity: 0, rotateZ: 10 }}
                        animate={{ x: 0, opacity: 1, rotateZ: 10 }}
                        transition={{
                            delay: index * 1,
                            duration: 0.8,
                            type: 'spring',
                        }}
                    >
                        <div className="relative">
                            <img
                                src={src}
                                className="h-60 w-[90px] sm:w-[200px] object-cover rounded shadow transition-all duration-300"
                                alt={`Image ${index + 2}`}
                            />
                            <div className="absolute top-0 right-0 h-full w-[4px] bg-white shadow" />
                        </div>
                    </motion.div>
                ))}

                {/* Static Final Image */}
                <div className="absolute top-0 right-0 z-50">
                    <img
                        src={images[images.length - 1]}
                        className="h-60 w-[90px] sm:w-[200px] object-cover rounded-r-2xl shadow"
                        alt="Static Final"
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
