import React, { useEffect, useState } from 'react';
import './App.css'

function App() {
	let playesNotes = []

	let notes = [
		['A0',27.5, '1'],
		['B0',30.868, '2'],
		['C1',32.703, '3'],
		['D1',36.708, '4'],
		['E1',41.203, '5'],
		['F1',43.654, '6'],
		['G1',48.999, '7'],
		['A1',55, '8'],
		['B1',61.735, '9'],
		['C2',65.406, '0'],
		['D2',73.416, '-'],
		['E2',82.407, '='],
		['F2',87.307, 'q'],
		['G2',97.999, 'w'],
		['A2',110, 'e'],
		['B2',123.47, 'r'],
		['C3',130.81, 't'],
		['D3',146.83, 'y'],
		['E3',164.81, 'u'],
		['F3',174.61, 'i'],
		['G3',196, 'o'],
		['A3',220, 'p'],
		['B3',246.94, '['],
		['C4',261.63, ']'],
		['D4',293.66, 'a'],
		['E4',329.63, 's'],
		['F4',349.23, 'd'],
		['G4',392, 'f'],
		['A4',440, 'g'],
		['B4',493.88, 'h'],
		['C5',523.25, 'j'],
		['D5',587.32, 'k'],
		['E5',659.26, 'l'],
		['F5',698.46, ';'],
		['G5',783.99, "'"],
		['A5',880, 'z'],
		['B5',987.77, 'x'],
		['C6',1046.5, 'c'],
		['D6',1174.7, 'v'],
		['E6',1318.5, 'b'],
		['F6',1396.9, 'n'],
		['G6',1568, 'm'],
		['A6',1760, ','],
		['B6',1975.5, '.'],
		['C7',2093, '/'],
		['D7',2349.3, 'F2'],
		['E7',2637, 'F4'],
		['F7',2793.8, 'F8'],
		['G7',3136, 'und'],
		['A7',3520, 'und'],
		['B7',3951.1, 'und'],
		['C8',4186, 'und']
	]

	function play(ev, index){
		let audioContext = new AudioContext();
		var oscillator = audioContext.createOscillator();

		setTimeout(() => {
			oscillator.stop()
			audioContext.close()
		},250)

		oscillator.type = "square";
		oscillator.frequency.value = notes[index][1];
		oscillator.connect(audioContext.destination);
		oscillator.start();

		const elem = ev.target;
			elem.classList.add('click'); // Добавляем блоку класс .click
			setTimeout(function() {
			elem.classList.remove('click'); // Удаляем класс .click
		}, 1300);
	}

  // function playButton(ev){
  //   let allKeys = document.querySelectorAll('.white')
  //   for (let i = 0;i < allKeys.length;i++){
  //     if (allKeys[i].attributes.dataOnDownKey){
  //       if (allKeys[i].attributes.dataOnDownKey.value === ev.key){
  //         allKeys[i].click()
  //       }
  //     }
  //   }
  // }

	function playButtonHoba(index){
		for (let i = 0;i < playesNotes.length;i++){
			try{
				if (playesNotes[i].index === index){
					return 0;
				}
				console.log(playesNotes[i].index)
				console.log(index)
			}
			catch{
				break;
			}
		}

		let audioContext = new AudioContext();
		let oscillator = audioContext.createOscillator();

		oscillator.type = "square";
		oscillator.frequency.value = notes[index][1];
		oscillator.connect(audioContext.destination);
		oscillator.start();

		playesNotes.push({
			"osci":oscillator,
			"audi":audioContext,
			"index":index,
			"whatkey":notes[index][2]
		})
	}

	function playButton(ev){
		let allKeys = document.querySelectorAll('.keys > button')

		for (let i = 0;i < allKeys.length;i++){
			if (allKeys[i].attributes.dataondownkey.value === ev.key){
				playButtonHoba(allKeys[i].attributes.indexnotes.value)
				const elem = allKeys[i];
				elem.classList.add('click');
				break;
			}
		}
	}

	function stopButton(ev){
		for (let i = 0;i < playesNotes.length;i++){
			try{
				if (playesNotes[i].whatkey === ev.key){
					playesNotes[i].osci.stop()
					playesNotes[i].audi.close()
					playesNotes = playesNotes.filter(n => n !== playesNotes[i])
				}
			}
			catch{
				break
			}
		}
		const elems = document.querySelectorAll('.keys > button')
		for (let i = 0;i < elems.length;i++){
			if (elems[i].attributes.dataondownkey.value == ev.key){
				elems[i].classList.remove('click');
			}
		}
	}

	useEffect(() => {
		document.querySelector('html').addEventListener('keydown', playButton)
		document.querySelector('html').addEventListener('keyup', stopButton)
	}, [])

return (
    <div className="App">
    	<div className='keys'>
        {notes.map((note,index) =>
        	<button
				onClick={ev => {play(ev, index)}}
				key={index}
				className='white'
				dataondownkey={note[2]}
				indexnotes={index}
            >{note[0]}</button>
        )}
    </div>
    </div>
	);
}

export default App;