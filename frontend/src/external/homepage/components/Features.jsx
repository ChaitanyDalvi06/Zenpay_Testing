import React from 'react';
import Card from './ui/Card';

export default function Features() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-16">Upcoming Milestones</h2>
        <div className="relative flex items-center justify-center">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-lg w-64">
            <h3 className="text-sm font-medium mb-2">Exchange Rate</h3>
            <div className="text-sm mb-1">1 USD = 14.685 IDR</div>
            <div className="mt-2 text-sm text-center">International<br/>Money Transfer</div>
          </div>
          <div className="relative w-[300px] h-[600px] bg-white rounded-[3rem] shadow-xl border-8 border-gray-800 flex items-center justify-center">
            <div className="p-4 pt-8 text-center">
              <p className="text-sm">Welcome back, Andy!</p>
              <h3 className="text-2xl font-bold mt-1">$20,884.99</h3>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-lg w-64">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Withdraw<br/>Money Easily</h3>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><span className="text-primary">↓</span></div>
            </div>
            <div className="mb-4">
              <div className="text-sm text-gray-600">Wallet Balance</div>
              <div className="text-2xl font-bold">$98,481.44</div>
            </div>
            <button className="w-full bg-primary text-white py-2 rounded-lg text-sm">Withdraw</button>
            <div className="text-center text-xs text-gray-500 mt-2">Fund Wallet</div>
          </div>
        </div>
      </div>
    </section>
  );
}
