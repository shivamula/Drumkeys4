// import React, { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './DrumKeys.css';
import Boom from './Assets/sounds/boom.wav';
import hihat from './Assets/sounds/hihat.wav';
import Openhat from './Assets/sounds/openhat.wav';
import kick from './Assets/sounds/kick.wav';
import snare from './Assets/sounds/snare.wav';
import tom from './Assets/sounds/tom.wav';
import ride from './Assets/sounds/ride.wav';
import clap from './Assets/sounds/clap.wav';

class Drumkeys extends React.Component {
  state = {
    active: null,
    volume: 0.5,
    pitch: 1,
  };

  playAudio = (e) => {
    e = e.toUpperCase();
    console.log("PLAYAUDIO EVENT:", e);
    let sample = document.getElementById("drum-pad-" + e);
    sample.currentTime = 0;

    sample.volume = this.state.volume;

    sample.playbackRate = this.state.pitch;

    sample.play();
  };

  handleClick = (e) => {
    console.log(e.target);
    console.log(e.target.name);
    this.playAudio(e.target.name);
    this.setState({
        active: e.target.value
      },
      //() => (document.querySelector("#display").innerText = this.state.active) //set the LED display
    );
  };

  handleKeyDown = (event) => {
    let keyCodes = [65, 83, 68, 70, 71, 72, 74, 75, 76];

    if (keyCodes.indexOf(event.keyCode) === -1) return;
    this.playAudio(event.key);
    console.log(event.target);
    //set the LED display
    document.querySelector("#display").innerText = event.target.value;
    this.setState({
      active: event.target.value
    });
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~");
  };

  handleVolume = (e) => {
    this.setState({
        volume: e.target.value * 0.01
      },
      () =>
      //Set the LED display
      (document.querySelector("#display").innerText =
        Math.round(this.state.volume * 100) + "%")
    );
  };

  handlePitch = (e) => {
    this.setState({
      pitch: e.target.value
    });
  };

  // MAIN RENDERING
  render() {
    const {
      active,
      volume,
      pitch
    } = this.state;
    return ( <div id = "drum-machine"
      onKeyDown = {
        (event) => this.handleKeyDown(event)
      }
      tabIndex = {
        0
      } >
      <div id = "wrapper-main" >
      < DrumPad btnClick = {
        (e) => this.handleClick(e)
      }
      instrument = {
        active
      }
      />

      </div> </div >
    );
  }
}

const DrumPad = ({
  btnClick
}) => {
  return ( <div className = "ui container-drum-pad" >
    <div className = "row-top" >
    <DrumPadBtn id = "A"
    btnClick = {
      btnClick
    }
    src = {
      Boom
    }
    instrument = "Boom"/>
    <DrumPadBtn id = "S"
    btnClick = {
      btnClick
    }
    src = {
      hihat
    }
    instrument = "Hihat" />
    <DrumPadBtn id = "D"
    btnClick = {
      btnClick
    }
    src = {
      Openhat
    }
    instrument = "Openhat"/>
    </div> 
    <div className = "row-mid" >
    <DrumPadBtn id = "F"
    btnClick = {
      btnClick
    }
    src = {
      snare
    }
    instrument = "Snare"/>

    <DrumPadBtn id = "G"
    btnClick = {
      btnClick
    }
    src = {
      tom
    }
    instrument = "Tom"/>
    </div> 
    <div className = "row-bottom" >
    < DrumPadBtn id = "H"
    btnClick = {
      btnClick
    }
    src = {
      clap
    }
    instrument = "clap" />
    <DrumPadBtn id = "J"
    btnClick = {
      btnClick
    }
    src = {
      kick
    }
    instrument = "Kick" />
    <DrumPadBtn id = "K"
    btnClick = {
      btnClick
    }
    src = {
      ride
    }
    instrument = "Ride"/>
    </div> 
    </div >
  );
};

const DrumPadBtn = ({
  id,
  btnClick,
  src,
  instrument
}) => {
  return ( <button className = "drum-pad"
      name = {
        id
      }
      value = {
        instrument
      }
      onClick = {
        btnClick
      } >
      <audio className = "clip"
      src = {
        src
      }
      type = "audio/mpeg"
      id = {
        `drum-pad-${id}`
      } >
      </audio> {
      id
    } </button>
);
};

const Volume = ({
  volume,
  onChange
}) => {
  return ( <div >
    <input type = "range"
    orient = "vertical"
    id = "volume-bar"
    value = {
      volume * 100
    }
    onChange = {
      onChange
    } >
    </input> 
    </div >
  );
};

const SampleDisplay = ({
  pitch
}) => {
  return ( <div className = "container-display" >
    <h1 id = "display" > {
      pitch
    } </h1>
    </div >
  );
};

const PitchShift = ({
  pitch,
  onChange
}) => {
  return ( <div className = "container-pitch" >
    <input id = "pitch-bar"
    type = "range"
    step = {
      0.01
    }
    min = {
      0.5
    }
    max = {
      2
    }
    value = {
      pitch
    }
    onChange = {
      onChange
    } >
    </input> < label id = "label-pitch" > Pitch </label> </div>
  );
};
export default Drumkeys;
ReactDOM.render( < Drumkeys/> , document.querySelector("#root"));