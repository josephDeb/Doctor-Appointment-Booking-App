import nurse from '../../Images/nurse.png'
import logo from '../../Images/logo.png'
const AngGaling = () => {
  return (
      <div className='max-w-screen-2xl h-screen mx-auto bg relative'>
          <div className="w-full h-full flex flex-col justify-center items-center">
              
              <img src={logo} className='w-[440px] fixed top-0'/>

              <div className="flex flex-col w-full justify-center items-center xl:mt-[62px]">
                <h1 className="xl:text-5xl text-2xl txtspc2 xl:mb-4">Professional Healthcare.</h1>
                <h2 className="xl:text-5xl text-2xl txtspc2"><span className="font-bold">AngGaling</span> Theme</h2>

                <p className="xl:mt-8 mt-4 xl:text-xl text-md  xl:w-[53%] w-[80%] text-center text-[#595959]">A stunning theme geared towards all types of medical institutions and businesses in the health industry.</p>

                <button className='mt-8 w-[170px] h-[44px] bg-blue-600 text-white txtspc2 cursor-pointer'>Get Stared</button>
              </div>

              <div className="absolute left-0 bottom-0 hidden xl:flex">
                  <img src={nurse} className='object-cover w-[710px]'/>
              </div>
          </div>
      </div>
  );
}

export default AngGaling