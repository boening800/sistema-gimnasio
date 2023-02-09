import { LockClosedIcon } from '@heroicons/react/20/solid'
import React from 'react'

import logo from '../assets/logo.png'

export default function Login() {
  return (
    <React.Fragment>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Bienvenid@!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Este es un sistema de prueba.
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Correo
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                  placeholder="Correo"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Constraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                  placeholder="Constraseña"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Recordar cuenta
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-cyan-600 hover:text-cyan-500">
                  Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-cyan-500 group-hover:text-cyan-400" aria-hidden="true" />
                </span>
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}