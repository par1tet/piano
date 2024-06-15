import React, { useEffect } from 'react';
import './App.css'

function App() {
  let notes = [
    ['A0',27.5],
    ['B0',30.868],
    ['C1',32.703],
    ['D1',36.708],
    ['E1',41.203],
    ['F1',43.654],
    ['G1',48.999],
    ['A1',55],
    ['B1',61.735],
    ['C2',65.406],
    ['D2',73.416],
    ['E2',82.407],
    ['F2',87.307],
    ['G2',97.999],
    ['A2',110],
    ['B2',123.47],
    ['C3',130.81],
    ['D3',146.83],
    ['E3',164.81],
    ['F3',174.61],
    ['G3',196],
    ['A3',220],
    ['B3',246.94],
    ['C4',261.63],
    ['D4',293.66],
    ['E4',329.63],
    ['F4',349.23],
    ['G4',392],
    ['A4',440],
    ['B4',493.88],
    ['C5',523.25],
    ['D5',587.32],
    ['E5',659.26],
    ['F5',698.46],
    ['G5',783.99],
    ['A5',880],
    ['B5',987.77],
    ['C6',1046.5],
    ['D6',1174.7],
    ['E6',1318.5],
    ['F6',1396.9],
    ['G6',1568],
    ['A6',1760],
    ['B6',1975.5],
    ['C7',2093],
    ['D7',2349.3],
    ['E7',2637],
    ['F7',2793.8],
    ['G7',3136],
    ['A7',3520],
    ['B7',3951.1],
    ['C8',4186]
  ]


  function play(ev, index){
    let audioContext = new AudioContext();
    var oscillator = audioContext.createOscillator();

    setTimeout(() => {
      oscillator.stop()
      oscillator = null;
      audioContext = null;
    },200)

    oscillator.type = "square";
    oscillator.frequency.value = notes[index][1];
    oscillator.connect(audioContext.destination);
    oscillator.start();

    const elem = ev.target;
    elem.classList.add('click'); // Добавляем блоку класс .click
    setTimeout(function() {
        elem.classList.remove('click'); // Удаляем класс .click через 400ms
    }, 1300);
  }


  return (
    <div className="App">
      <div className='keys'>
        {notes.map((note,index) =>
          <button onClick={ev => {play(ev, index)}} key={index} className='white'>{note[0]}</button>
        )}
      </div>
    </div>
  );
}

export default App;