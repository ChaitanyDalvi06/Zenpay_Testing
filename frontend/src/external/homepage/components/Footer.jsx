import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">ZenPay </span>
            </div>
            <p className="text-white/80 mb-4">Manage your finances effortlessly with our advanced banking solutions. Safe, fast, and designed for your everyday needs.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Pages</h3>
            <ul className="space-y-2 text-white/80"><li>Home</li><li>Pricing</li><li>About</li><li>Contact</li></ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-white/80"><li>Mission and Values</li><li>Team</li><li>Careers</li><li>Press</li></ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-white/80"><li>Blog</li><li>Help Center</li><li>Contact Us</li><li>FAQ</li></ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6">
          <div className="flex justify-between items-center"><p className="text-white/80 text-sm">© 2024 ZenPay . All rights reserved.</p></div>
        </div>
      </div>
    </footer>
  );
}
