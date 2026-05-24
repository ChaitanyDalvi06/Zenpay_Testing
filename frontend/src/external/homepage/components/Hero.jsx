import React from 'react';
import Button from './ui/Button';

export default function Hero() {
  return (
    <div className="pt-12 pb-8 md:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-6">Pay Smarter.<br/>Live Better.</h1>
            <p className="text-gray-600 text-lg mb-8">Manage your finances effortlessly with our advanced banking solutions. Safe, fast, and designed for your everyday needs.</p>
            <div className="flex flex-wrap gap-4">
              <Button>Get Started Today</Button>
              <Button variant="secondary">Learn More →</Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-primary p-8 rounded-lg shadow-lg text-white h-[300px] flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">We Provide Best Services</h3>
              <p className="text-lg opacity-80">Trusted by millions worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
