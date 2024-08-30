import { FaFacebook, FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa';

const Footer = () => {
  let year = new Date().getFullYear();

  return (
    <footer className="bg-slate-700 text-slate-200 font-light flex flex-col-reverse justify-center px-5 py-5 md:flex-row md:justify-between lg:px-20">
      <p className="text-center mt-3 md:mt-0"><small>&copy; {year} MoonShot :: All Right Resevered.</small></p>

      {/* container holding the footer contact links */}
      <div className="flex gap-5 mx-auto md:mx-0">
        <a href="https://linkedin.com/in/PhilipOyelegbin" target="_blank" rel="noopener noreferrer"><FaLinkedinIn className='w-6 h-6'/></a>

        <a href="https://mobile.facebook.com/philip.oyelegbin" target="_blank" rel="noopener noreferrer"><FaFacebook className='w-6 h-6'/></a>

        <a href="https://mobile.twitter.com/OyelegbinPhilip" target="_blank" rel="noopener noreferrer"><FaTwitter className='w-6 h-6'/></a>

        <a href="https://github.com/PhilipOyelegbin" target="_blank" rel="noopener noreferrer"><FaGithub className='w-6 h-6'/></a>
      </div>
    </footer>
  )
}

export default Footer