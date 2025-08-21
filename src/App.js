import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import UserProfilePage from './pages/UserProfilePage';
import RoomsPage from './pages/RoomsPage';
import NewRoomPage from './pages/NewRoomPage';
import OccupantsPage from './pages/OccupantsPage';
import NewOccupantPage from './pages/NewOccupantPage';
import RoomAssignmentsPage from './pages/RoomAssignmentsPage';
import NewRoomAssignmentPage from './pages/NewRoomAssignmentPage';
import PaymentRecordsPage from './pages/PaymentRecordsPage';
import NewPaymentRecordPage from './pages/NewPaymentRecordPage';
import SideNavBar from './components/SideNavBar';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(256); // 256px = w-64, 64px = w-16

  const handleSidebarResize = (isEnlarged) => {
    setSidebarWidth(isEnlarged ? 256 : 64);
  };

  return (
    <div className='App-container'>
      <Routes>
        <Route path='signup' element={<SignUpPage />} />
        <Route path='login' element={<LogInPage />} />

        <Route
          path='*'
          element={
            <div className='flex min-h-screen'>
              <SideNavBar onResize={handleSidebarResize} />
              <Header className='lg:hidden md:hidden' />
              <div 
                className='flex-1 min-h-screen transition-all duration-300 ease-in-out'
                style={{ marginLeft: `${sidebarWidth}px` }}
              >
                <div className='p-6'>
                  <Outlet />
                </div>
                <Footer />
              </div>
            </div>
          }
        >
            <Route
              path=''
              element={
                <PrivateRoute>
                  <LandingPage />
                </PrivateRoute>
              }
            />
            <Route
              path='profile'
              element={
                <PrivateRoute>
                  <UserProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path='rooms'
              element={
                <PrivateRoute>
                  <RoomsPage />
                </PrivateRoute>
              }
            >
              <Route
                path='add-room'
                element={
                  <PrivateRoute>
                    <NewRoomPage />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path='occupants'
              element={
                <PrivateRoute>
                  <OccupantsPage />
                </PrivateRoute>
              }
            >
              <Route
                path='add-occupant'
                element={
                  <PrivateRoute>
                    <NewOccupantPage />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path='room-assignments'
              element={
                <PrivateRoute>
                  <RoomAssignmentsPage />
                </PrivateRoute>
              }
            >
              <Route
                path='add-room-assignment'
                element={
                  <PrivateRoute>
                    <NewRoomAssignmentPage />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path='payment-records'
              element={
                <PrivateRoute>
                  <PaymentRecordsPage />
                </PrivateRoute>
              }
            >
              <Route
                path='add-payment-record'
                element={
                  <PrivateRoute>
                    <NewPaymentRecordPage />
                  </PrivateRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
