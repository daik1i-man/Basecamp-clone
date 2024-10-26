import React from 'react'
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { Rocket } from 'lucide-react';

function SkeletonComponent() {
    return (
        <Card className="shadow-none animate-pulse border border-solid border-blue-gray-100 mt-10 xl:w-[390px] md:w-[450px] sm:w-full mx-auto">
            <CardBody>
                <Rocket
                    className="mb-4 h-12 w-12 text-blue-gray-50"
                />
                <Typography variant="h4" color="blue-gray" className="mb-2 w-[40%] h-7 bg-blue-gray-50 rounded-md">
                </Typography>
                <Typography variant="h6" className='mb-2 mt-5 w-1/3 h-3 bg-blue-gray-50 rounded-md'>
                </Typography>
                <Typography variant="h6" className='mb-2 mt-5 w-1/2 h-3 bg-blue-gray-50 rounded-md'>
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 h-16">
                <Button size="sm" variant="text" className="w-1/2 h-10 flex items-center gap-2 py-3 bg-blue-gray-50 hover:bg-blue-gray-100">
                </Button>
            </CardFooter>
        </Card>
    )
}

export default SkeletonComponent;
