import { Bars3Icon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Link, Outlet } from "react-router-dom";

import logo from '../assets/logo.png'

export default function Root() {

    const [options, setOptions] = useState([
    { 
        id: '1', name: 'Administracion', href: '/login', current: true, show: false,
        children:
        [
            {
                id: '11', name: 'Usuarios', href: '/users', current: true
            },
            {
                id: '12', name: 'Entrenadores', href: '/trainers', current: true
            },
            {
                id: '13', name: 'Clientes', href: '/clients', current: true
            }
        ]
    },
    { id: '2', name: 'Dashboard', href: '/dashboard', current: false, show: false, children:[] },
    { id: '3', name: 'Projects', href: '#', current: false, show: false, children:[] },
    { id: '4', name: 'Calendar', href: '#', current: false, show: false, children:[] },
    ])

    const [show, setShow] = useState(true);

    function toggle(boolean) {
        setShow(!boolean)
    }

    return (
        <React.Fragment>
            <div className="h-full">
                <div className={`fixed transition-all ease-in duration-200 ${show ? 'left-0' : 'phone:left-[-18rem] w-full'} phone:w-72 bg-gray-100 border-gray-200 border-[1px] flex flex-col h-full`}>
                    <div className="h-12 px-3">
                        {/* logo */}
                        <div className="flex flex-row h-full items-center py-8 px-2">
                            <img src={logo} alt="COACH SYSTEM" className="w-36"/>
                        </div>
                        <hr />
                        {/* sidenav */}
                        <div className="flex flex-col gap-1 px-2 py-5 ">
                            {
                                options.map(
                                    (item,i)=>(
                                        <div key={item.id}>
                                            <div  className="cursor-pointer flex justify-between items-center text-gray-500 hover:bg-gray-200 rounded-lg ">
                                                <Link
                                                    className="w-full flex justify-between items-center p-2"
                                                    onClick={()=>{
                                                        options[i].show = !item.show
                                                        setOptions([...options])
                                                    }}
                                                    {...(item.children.length==0 ? {to:item.href} : {})}
                                                >
                                                    {item.name}
                                                    {   item.children.length != 0 &&
                                                    <span className="z-40" >
                                                       {
                                                            item.show ?
                                                            <ChevronUpIcon className="h-5 w-5"/>
                                                            :
                                                            <ChevronDownIcon className="h-5 w-5"/>
                                                       } 
                                                    </span>
                                                }
                                                </Link>
                                               
                                            </div>
                                            {
                                                item.children.map(
                                                    (itemChild)=>(
                                                        <div key={itemChild.id} className={`${item.show ? 'block' : 'hidden'} ml-2 cursor-pointer flex justify-between items-center text-gray-500 hover:bg-gray-200 rounded-lg px-2 py-2`}>
                                                            <Link
                                                                className="w-full"
                                                                to={itemChild.href}
                                                            >
                                                            {itemChild.name}
                                                            </Link>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className={`ransition-all ease-in duration-200 ${!show ? 'ml-0' : 'phone:ml-[18rem]'} bg-gray-200 h-screen`}>
                    <Disclosure as="nav" className={`bg-gray-100   h-12 text-white px-3`}>
                        <div className="flex h-full items-center">
                            <div className="flex flex-row justify-between w-full">
                                <div className="cursor-pointer" onClick={()=>toggle(show)}>
                                    <Bars3Icon className="h-5 w-5 text-cyan-600"/>
                                </div>
                                <div className="flex justify-between gap-4 cursor-pointer">
                                    <img className="w-6 h-6 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                    <span className="text-cyan-600">Miguel Carrasco</span>
                                </div>
                            </div>
                        </div>
                    </Disclosure>
                    <div className="p-2">
                        <Outlet />
                    </div>
                </div>

            </div>
            
        </React.Fragment>
    )
}