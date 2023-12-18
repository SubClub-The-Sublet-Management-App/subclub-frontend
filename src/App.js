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
              <div className='App-container grid grid-cols-4'>
                <SideNavBar />
                <div className='col-span-3'>
                  <h1 className='text-3xl font-bold underline'>Hello world!</h1>
                  <Outlet />
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
