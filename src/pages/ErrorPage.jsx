import { useRouteError } from "react-router-dom"
import svgNotFound from '../assets/undraw_coffee_break_h3uu.svg'

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <>
            <div className="m-auto h-screen w-full flex flex-col tablet:flex-row justify-center items-center gap-4">
                <div className="flex flex-col justify-center items-center">
                    <div className="text-cyan-600 font-bold text-6xl tablet:text-9xl">404</div>
                    <span>Esta página no existe.</span>
                </div>
                <img src={svgNotFound} className="w-60 tablet:w-96" alt="" />
            </div>
        </>
    )
}