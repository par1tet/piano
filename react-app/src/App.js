import React, { useEffect, useState } from 'react';
import './App.css'

function App() {
	let playesNotes = []
	const [stepsInWave, setStepsInWave] = useState(5758)

	let whiteKeysNote = [
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
		['G7',3136, 'nt'],
	]

	let blackKeysNote = [
		['A0',27.5, '1', ''],
		['B0',30.868, '2', 'hide'],
		['C1',32.703, '3', ''],
		['D1',36.708, '4', ''],
		['E1',41.203, '5', 'hide'],
		['F1',43.654, '6', ''],
		['G1',48.999, '7', ''],
		['A0',27.5, '1', ''],
		['B0',30.868, '2', 'hide'],
		['C1',32.703, '3', ''],
		['D1',36.708, '4', ''],
		['E1',41.203, '5', ''],
		['G1',48.999, '7', 'hide'],
		['A0',27.5, '1', ''],
		['B0',30.868, '2', ''],
		['C1',32.703, '3', 'hide'],
		['D1',36.708, '4', ''],
		['E1',41.203, '5', ''],
		['F1',43.654, '6', ''],
		['G1',48.999, '7', 'hide'],
		['A0',27.5, '1', ''],
		['B0',30.868, '2', ''],
		['C1',32.703, '3', 'hide'],
		['D1',36.708, '4', ''],
		['E1',41.203, '5', ''],
		['F1',43.654, '6', ''],
		['G1',48.999, '7', 'hide'],
		['A0',27.5, '1', ''],
		['B0',30.868, '2', ''],
		['C1',32.703, '3', 'hide'],
		['D1',36.708, '4', ''],
		['E1',41.203, '5', ''],
		['F1',43.654, '6', ''],
		['G1',48.999, '7', 'hide'],
		['A0',27.5, '1', ''],
		['A0',27.5, '1', ''],
		['C1',32.703, '3', 'hide'],
		['D1',36.708, '4', ''],
		['E1',41.203, '5', ''],
		['F1',43.654, '6', ''],
		['G1',48.999, '7', 'hide'],
		['A0',27.5, '1', ''],
		['A0',27.5, '1', ''],
		['C1',32.703, '3', 'hide'],
		['D1',36.708, '4', ''],
		['E1',41.203, '5', ''],
		['F1',43.654, '6', ''],
		['G1',48.999, '7', 'hide'],
	]

	function play(ev, index){
		let audioContext = new AudioContext();
		let output = audioContext.createGain()
	
		let volume = audioContext.createGain();
		let pan = audioContext.createStereoPanner();
	
		volume.gain.value = 1;
		pan.pan.value = 0;
	
		output.connect(volume);
		volume.connect(pan);
		pan.connect(audioContext.destination);

		var oscillator = audioContext.createOscillator();

		setTimeout(() => {
			oscillator.stop()
		},250)

		oscillator.type = "sine";
		oscillator.frequency.value = whiteKeysNote[index][1];
		oscillator.connect(audioContext.destination);

		oscillator.type = "square";
		// oscillator.frequency.value = notes[index][1];f

		let steps = +(document.querySelector('.sentezator > .set-steps > input').value);
		console.log(steps)
		console.log(+(document.querySelector('.sentezator > .set-steps > input').value))

		let imag = new global.Float32Array(steps);
		let real = new global.Float32Array(steps);
		
		for (var i = 1; i < steps; i++) {
			imag[i] = 1 / (i * Math.PI);
		}
		
		const wave = audioContext.createPeriodicWave(real, imag);

		oscillator.setPeriodicWave(wave);

		oscillator.start(0);

		const elem = ev.target;
			elem.classList.add('click'); // Добавляем блоку класс .click
			setTimeout(function() {
			elem.classList.remove('click'); // Удаляем класс .click
		}, 1300);
	}

	function playButtonHoba(index){
		for (let i = 0;i < playesNotes.length;i++){
			try{
				// if (playesNotes[i].index === index){
				// 	playesNotes[i].osci.stop()
				// 	playesNotes[i].audi.close()
				// 	playesNotes = playesNotes.filter(n => n !== playesNotes[i])
				// }
				if (playesNotes[i].index === index){
					return 0;
				}
			}
			catch{
				break;
			}
		}

		let keys = [...whiteKeysNote, ...blackKeysNote]

		let audioContext = new AudioContext();
		let output = audioContext.createGain()
	
		let volume = audioContext.createGain();
		let pan = audioContext.createStereoPanner();
	
		volume.gain.value = 0;
		pan.pan.value = 0;
	
		output.connect(volume);
		volume.connect(audioContext.destination);

		let oscillator = audioContext.createOscillator();

		// oscillator.frequency.value = notes[index][1];f

		let steps = +(document.querySelector('.sentezator > .set-steps > input').value);

		let imag = new global.Float32Array(steps);
		let real = new global.Float32Array(steps);
		
		for (var i = 1; i < steps; i++) {
			imag[i] = 1 / (i * Math.PI);
		}
		
		const wave = audioContext.createPeriodicWave(real, imag);

		oscillator.setPeriodicWave(wave);

		oscillator.frequency.setValueAtTime(keys[index][1], audioContext.currentTime);
		oscillator.connect(output);
		oscillator.start();

		function release(){
			const interg = setInterval(() => {
				volume.gain.value -= 0.008
				if (volume.gain.value < 0){
					for (let i = 0;i < playesNotes.length;i++){
						try{
							if (playesNotes[i].whatkey === keys[index][2]){
								playesNotes[i].audi.close()
								playesNotes = playesNotes.filter(n => n !== playesNotes[i])
							}
						}
						catch{
							break
						}
					}
					let blackKeys = document.querySelectorAll('.keys > .black-keys > button')
					let whiteKeys = document.querySelectorAll('.keys > .white-keys > button')
					let elems = [...whiteKeys,...blackKeys]
					for (let i = 0;i < elems.length;i++){
						if (elems[i].attributes.dataondownkey.value === keys[index][2]){
							elems[i].classList.remove('click');
						}
					}
					clearInterval(interg)
				}
			},10)
		}

		function sustein(){
			setTimeout(() => {
				release()
			}, 200)
		}

		function decay(){
			const interg = setInterval(() => {
				volume.gain.value -= 0.1
				if (volume.gain.value < 0.74){
					sustein()
					clearInterval(interg)
				}
			},3)
		}

		const interd = setInterval(() => {
			volume.gain.value += 0.25
			if (volume.gain.value > 1){
				clearInterval(interd)
				setTimeout(() => {
					decay()
				}, 80)
			}
		},2)

		playesNotes.push({
			"audi":audioContext,
			"index":index,
			"whatkey":keys[index][2]
		})
	}

	function playButton(ev){
		let blackKeys = document.querySelectorAll('.keys > .black-keys > button')
		let whiteKeys = document.querySelectorAll('.keys > .white-keys > button')
		let allKeys = [...whiteKeys,...blackKeys]

		for (let i = 0;i < allKeys.length;i++){
			if (allKeys[i].attributes.dataondownkey.value === ev.key){
				const elem = allKeys[i];
				elem.classList.remove('click');
				for (let i = 0;i < playesNotes.length;i++){
					if (playesNotes[i].whatkey === ev.key){
						playesNotes[i].audi.close()
						playesNotes = playesNotes.filter(n => n !== playesNotes[i])
					}
				}
				playButtonHoba(allKeys[i].attributes.indexnotes.value)
				elem.classList.add('click');
				break;
			}
		}
	}

	function stopButton(ev){
		const elems = document.querySelectorAll('.keys > button')
		for (let i = 0;i < elems.length;i++){
			if (elems[i].attributes.dataondownkey.value === ev.key){
				elems[i].classList.remove('click');
			}
		}
	}

	useEffect(() => {
		document.querySelector('html').addEventListener('keydown', playButton)
		// document.querySelector('html').addEventListener('keyup', stopButton)
	}, [])

return (
    <div className="App">
			<div className='sentezator'>
				<div className='keys'>
					<div className='white-keys'>
						{whiteKeysNote.map((note,index) =>
							<button
								onClick={ev => {play(ev, index)}}
								key={index}
								className='white'
								dataondownkey={note[2]}
								indexnotes={index}
							><div><span className='key'>{note[2]}</span><span className='note'>{note[0]}</span></div></button>
						)}
					</div>
					<div className='black-keys'>
						{blackKeysNote.map((note,index) =>
							<button
								onClick={ev => {play(ev, index)}}
								key={index}
								className={'black '+note[3]}
								dataondownkey={note[2]}
								indexnotes={index}
							><div><span className='key'>{note[2]}</span><span className='note'>{note[0]}</span></div></button>
						)}
					</div>
				</div>

				<div className='set-steps'>
					<input type='range' value={stepsInWave} onChange={e => setStepsInWave(e.target.value)} min="2" max="10000"></input>
					<span>Steps in wave: {stepsInWave}</span>
				</div>
			</div>
    </div>
	);
}

export default App;