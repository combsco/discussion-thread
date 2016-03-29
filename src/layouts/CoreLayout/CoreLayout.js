import React, { PropTypes } from 'react'
import '../../styles/core.scss'

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function CoreLayout ({ children }) {
  return (
    <div>
      <section className='hero is-left'>
        <div className='hero-header'>
          <header className='header' style={{boxShadow: '0 1px 0 rgba(211,214,219,0.3)'}}>
            <div className='container'>
              <div className='header-left'>
                <a className='header-item' href='/'>
                  <h1 className='title' style={{color: '#E3472F'}}>Threads</h1>
                </a>
              </div>
              <div className='header-right'>
                <div className='header-item'>
                  <img src='https://s3.amazonaws.com/uifaces/faces/twitter/chadengle/24.jpg'
                    style={{borderRadius: '24px'}} />
                  <p style={{marginLeft: '5px'}}>Welcome back, Brady</p>
                </div>
              </div>
            </div>
          </header>
        </div>
      </section>
      {children}
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
