import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function ErrorPage() {
    return (
        <div className="h-screen mx-auto grid place-items-center text-center px-8">
            <div>
                <Typography
                    variant="h1"
                    color="blue-gray"
                    className="mt-10 !text-3xl !leading-snug md:!text-4xl"
                >
                  <p className="text-7xl">😤</p><br /> Error 404 <br /> It looks like something went wrong :(
                </Typography>
                <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
                    Don&apos;t worry, our team is already on it.Please try refreshing
                    the page or come back later.
                </Typography>
                <Link to='/'>
                    <Button color="gray" className="w-full px-4 md:w-[8rem]">
                        back home
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage;