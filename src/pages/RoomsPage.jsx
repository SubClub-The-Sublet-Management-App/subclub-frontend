import { Outlet, useMatch } from 'react-router-dom';

export default function RoomsPage() {
  const match = useMatch('/rooms');
  const showContent = match != null;

  return (
    <div>
      <h1 className='text-left text-3xl font-bold leading-9 tracking-tight text-gray-900'>
        Rooms
      </h1>
      {showContent && <div> Another content of room</div>}
      <Outlet />
    </div>
  );
}
