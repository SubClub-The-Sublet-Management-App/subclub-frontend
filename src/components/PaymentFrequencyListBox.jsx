import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaCheck, FaChevronDown } from 'react-icons/fa';

const paymentFrequency = [
  { frequency: 'Weekly' },
  { frequency: 'Fortnightly' },
  { frequency: 'Monthly' },
];

export default function PaymentFrequencyListBox({ onChange }) {
  const [selected, setSelected] = useState(paymentFrequency[0]);

  const handleSelect = (frequency) => {
    setSelected(frequency);
    onChange(frequency);
  };
  return (
    <div className=''>
      <Listbox value={selected} onChange={handleSelect}>
        <div className='relative mt-1'>
          <Listbox.Button className='relative w-full cursor-default rounded-md  bg-gray-50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
            <span className='block truncate'>{selected.frequency}</span>
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
              {paymentFrequency.map((frequency, frequencyIdx) => (
                <Listbox.Option
                  key={frequencyIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-100 text-primary' : 'text-gray-600'
                    }`
                  }
                  value={frequency}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-normal' : 'font-normal'
                        }`}
                      >
                        {frequency.frequency}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-lightPrimary'>
                          <FaCheck className='h-4 w-4' aria-hidden='true' />
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
