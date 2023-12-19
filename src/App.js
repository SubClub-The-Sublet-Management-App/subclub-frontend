import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
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
  return (
    <div className='App-container flex'>
      <div className='flex-grow'>
        <Routes>
          <Route path='signup' element={<SignUpPage />} />
          <Route path='login' element={<LogInPage />} />

          <Route
            path='*'
            element={
              <div className='App-container flex lg:flex-row'>
                <SideNavBar className='lg:w-1/4 md:w-auto sm:w-autho sm:h-6' />
                <Header className='h-auto w-3/4 righ-0' />
                <div className='w-full pt-16 pb-16 mx-6 lg:w-3/4'>
                  <h1 className='text-3xl font-bold underline'>Hello world!</h1>

                  <Outlet />
                  <Footer className='self-end' />
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
    </div>
  );
}

export default App;
