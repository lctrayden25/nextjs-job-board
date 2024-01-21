"use client"
import Link from 'next/link'
import React from 'react'
import logo from "@/assets/logo.png"
import Image from 'next/image'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <header>
        <nav className='max-w-5xl m-auto px-3 py-5 flex items-center justify-between'>
            <Link href="/" className='flex items-center gap-3'>
                <Image src={logo?.src} width={40} height={40} alt="logo" />
                <span className='text-xl font-bold tracking-tight'>Job Board</span>
            </Link>
            <Button asChild>
                <Link href="/jobs/new">Post a job</Link>
            </Button>
        </nav>
    </header>
  )
}

export default Navbar