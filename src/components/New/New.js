import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import './New.css';

const New = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [pass, setPass] = useState('');
    const create = true;

    return (
      <>
       <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <span role="img" aria-label="emoji">💬</span>
              CHAT
            </Link>
          </div>
        </nav>
      </div>
        <div className="joinOuterContainer">
      <div className="joinInnerContainer">
      <p style={{fontFamily: "monospace"}} className="heading brand-logo "><span role="img" aria-label="emoji">💬</span>CREATE</p>
        <p className="head">
          <Link style={{color: "white"}} to="/"> Back to Join ?</Link>
        </p>
        <div>
          <input placeholder="Username" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Set room name" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <div>
          <input placeholder="Set password" className="joinInput mt-20" type="text" onChange={(event) => setPass(event.target.value)} />
        </div>
        <Link to={`/chat?create=${create}&name=${name}&room=${room}&pass=${pass}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
    </>
    )
};

export default New;