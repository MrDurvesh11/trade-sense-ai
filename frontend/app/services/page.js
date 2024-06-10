"use client"
import AlgoTrader from '@/components/AlgoTrader';
import StockAnalyzer from '@/components/StockAnalyzer';
import FInChat from '@/components/FInChat';
import NavBar from '@/components/Navbar';
import SideBar from '@/components/SideBar'
import React from 'react'

export default function page() {
    const [content, setContent] = React.useState('algo-trader');

    return (
        <>
            <NavBar />
            <SideBar setContent={setContent} />
            <div class="p-4 sm:ml-64">
                <div class="rounded-lg mt-20">
                    {content === 'algo-trader' && <AlgoTrader />}
                    {content === 'stock-analyzer' && <StockAnalyzer />}
                    {content === 'finchat' && <FInChat />}
                </div>
            </div>
        </>
    )
}
