import React from 'react';
import './Land.css';
import right from './ri1.png';
import ReactTypingEffect from 'react-typing-effect';


const Land = () => {
  return (
    <div id = 'home-section'>
    <div className='landPg'>
      <div className='column' id='left'>

        <div className='heading'>
          <h1>WE BRING EMPOWERMENT TO TUTORING SERVICES</h1>
        </div>
        <div className='subHeading'>
          {" "} 
          <ReactTypingEffect
            text={["From Questions To Knowledge", "From Potential To Performance", "From Theory To Practice" , "From Understanding To Excellence"]} // Ensure this is always an array
            speed={100}
            loop
            eraseSpeed={20}
            eraseDelay={2000}
            typingDelay={500}
            cursorChar=">"
            showCursor={true}
          />

        </div>

        <div className='buttonHome'>
          <div className='btn1' style = {{width : '20rem' , color : 'white'}}>
            <button> Find A Tutor</button>
          </div>
          <div className='btn2'>
            <button> Become A Tutor </button>
          </div>
        </div>
      </div>
      <div className='column' id='right'>
        <img src={right} alt='img' style={{ width: '500px', height: 'auto' }} />
      </div>
    </div>
    </div>
  )
}

export default Land