import nurse from '../../Images/nurse.png'
import logo from '../../Images/logo.png'

import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
const AngGaling = () => {
  const navigate = useNavigate()
  return (
      <div className='max-w-screen-2xl h-screen mx-auto bg relative'>
          <div className="w-full h-full flex flex-col justify-center items-center">
              
              <h4 className='text-8xl underline text-blue-600'><span className='text-red-800'>A</span><span className='text-green-800'>G</span></h4>

              <div className="flex flex-col w-full justify-center items-center xl:mt-[28px]">
                <h1 className="xl:text-5xl text-2xl txtspc2 xl:mb-4">Professional Healthcare.</h1>
                <h2 className="xl:text-5xl text-2xl txtspc2"><span className="font-bold">AngGaling</span> Theme</h2>

                <p className="xl:mt-8 mt-4 xl:text-xl text-md  xl:w-[53%] w-[80%] text-center text-[#595959]">A stunning theme geared towards all types of medical institutions and businesses in the health industry.</p>
              </div>

              <Link className='mt-8 px-8 py-2 bg-blue-600 text-white txtspc2 cursor-poi' to={'/login'}>
                   <button>Get Stared</button>
                </Link>

              <div className="absolute left-0 bottom-0 hidden xl:flex">
                  <img src={nurse} className='object-cover w-[710px]'/>
              </div>
          </div>
      </div>
  );
}

export default AngGaling