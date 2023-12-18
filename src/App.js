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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App-container flex'>
      <div className='flex-grow'>
        <ToastContainer />

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

                  <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='profile' element={<UserProfilePage />} />
                    <Route path='rooms' element={<Outlet />}>
                      <Route index element={<RoomsPage />} />
                      <Route path='add-room' element={<NewRoomPage />} />
                    </Route>
                    <Route path='occupants' element={<Outlet />}>
                      <Route index element={<OccupantsPage />} />
                      <Route
                        path='add-occupant'
                        element={<NewOccupantPage />}
                      />
                    </Route>
                    <Route path='room-assignments' element={<Outlet />}>
                      <Route index element={<RoomAssignmentsPage />} />
                      <Route
                        path='add-room-assignment'
                        element={<NewRoomAssignmentPage />}
                      />
                    </Route>
                    <Route path='payment-records' element={<Outlet />}>
                      <Route index element={<PaymentRecordsPage />} />
                      <Route
                        path='add-payment-record'
                        element={<NewPaymentRecordPage />}
                      />
                    </Route>
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
