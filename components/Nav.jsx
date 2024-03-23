"use client";

import Link from 'next/link';
import Image from 'next/image';
import NavButton from '@components/NavButton';
import { useState } from 'react';

const Nav = () => {

    return (
        <nav className="sticky flex w-full min-h-[64px] h-[64px] z-20 bg-gray-200 border-b-gray-300 border-b box-content shadow-nav">
            <Link href="/" className='flex gap-2 flex-center'>
                <Image
                    src="/assets/icons/faceit-logo.svg"
                    alt="FACEIT Logo"
                    width={30}
                    height={30}
                    className='object-contain px-[16px] w-16'
                />
            </Link>
            <NavButton href="/" text="Home" />
            <NavButton href="/widget-editor" text="Widget Editor" />
        </nav>
    )
}

export default Nav