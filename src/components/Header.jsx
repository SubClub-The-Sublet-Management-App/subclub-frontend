import logo from '../assets/images/sub-club-logo.svg';

export default function Header() {
  return (
    <div className='lg:hidden md:hidden absolute right-2 top-6 '>
      <img src={logo} alt='Logo' className='h-8' />
    </div>
  );
}
