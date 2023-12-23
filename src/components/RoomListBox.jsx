import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaCheck, FaChevronDown } from 'react-icons/fa';
import useFetch from '../functions/useFetch';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function RoomListBox({ onRoomSelect, value }) {
  // Fetch rooms data
  const { data: rooms, isLoading, error } = useFetch(`${backendUrl}/rooms`);
  // initialise selection state
  const [selected, setSelected] = useState(value || null);

  useEffect(() => {
    if (rooms && rooms.length > 0) {
      setSelected(rooms[0]);
    }
  }, [rooms]);

  useEffect(() => {
    if (selected) {
      onRoomSelect(selected._id);
    }
  }, [selected, onRoomSelect]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className=''>
      <Listbox value={selected} onChange={setSelected}>
        <div className='relative mt-1'>
          <Listbox.Button className='relative w-full cursor-default rounded-md bg-gray-50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
            <span className='block truncate'>
              {selected ? selected.name : 'Select a room'}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <FaChevronDown
                className='h-5 w-5 text-lightPrimary'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
              {rooms.data.map((room, roomIdx) => (
                <Listbox.Option
                  key={roomIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-100 text-primary' : 'text-gray-600'
                    }`
                  }
                  value={room}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-normal' : 'font-normal'
                        }`}
                      >
                        {room.name}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-lightPrimary'>
                          <FaCheck className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
