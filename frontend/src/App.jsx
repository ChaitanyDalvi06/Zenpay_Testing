// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/navbar/Navbar';
// import Dashboard from './pages/Dashboard/Dashboard';
// import Transactions from './pages/Transactions';
// import AIAdvisor from './pages/AIAdvisor';
// import Login from './pages/Authentication/Login';
// import PaymentForm from './components/payment/PaymentForm';
// import Signup from './pages/Authentication/Signup';
// import Settings from './pages/Settings';
// import { ToastContainer } from 'react-toastify';
// import Profile from './pages/profile/Profile';
// import { ApolloProvider } from '@apollo/client';
// import { client } from '../apolloClient';


// function App() {
//   const [navbarVisible, setNavbarVisible] = useState(true);

//   return (
//     <ApolloProvider client={client}>
//     <Router>
//       <div>
//         {navbarVisible && <Navbar />}
//         <div>
//           <Routes>
//             <Route path="/" element={null} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/transactions" element={<Transactions />} />
//             <Route path="/advisor" element={<AIAdvisor />} />
//             <Route path="/login" element={<Login setNavbarVisible={setNavbarVisible} />} />
//             <Route path="/signup" element={<Signup setNavbarVisible={setNavbarVisible} />} />
//             <Route path="/settings" element={<Settings />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/payment" element={<PaymentForm />} />
//           </Routes>
//           <ToastContainer />
//         </div>
//       </div>
//     </Router>
//     </ApolloProvider>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import Transactions from './pages/Transactions';
import AIAdvisor from './pages/AIAdvisor';
import Login from './pages/Authentication/Login';
import PaymentForm from './components/payment/PaymentForm';
import RazorpayHome from './external/razorpay/pages/HomePage';
import IntegratedHome from './external/homepage/Home';
import Signup from './pages/Authentication/Signup';
import Settings from './pages/Settings';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/profile/Profile';
import { ApolloProvider } from '@apollo/client';
import { client } from '../apolloClient';

function App() {
  const [navbarVisible, setNavbarVisible] = useState(true);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {navbarVisible && <Navbar />}
          <div>
            <Routes>
              <Route path="/" element={<IntegratedHome />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/advisor" element={<AIAdvisor />} />
              <Route path="/login" element={<Login setNavbarVisible={setNavbarVisible} />} />
              <Route path="/signup" element={<Signup setNavbarVisible={setNavbarVisible} />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/payment" element={<PaymentForm />} />
              <Route path="/razorpay" element={<RazorpayHome />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
