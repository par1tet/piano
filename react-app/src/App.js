import React, { cloneElement, useEffect, useState } from 'react';
import './App.css'

function App() {
	let playesNotes = []
	const [stepsInWave, setStepsInWave] = useState(5758)
	const [volumeOfAllNotes, setVolume] = useState(100)
	const [whiteKeysNote, setWhiteKeysNote] = useState([
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
	])

	const [blackKeysNote, setBlackKeysNote] = useState([
		['A#0',29.14, 'Q', ''],
		['',null, '', 'hide'],
		['C#1',34.65, 'W', ''],
		['D#1',38.89, 'E', ''],
		['',null, '', 'hide'],
		['F#1',46.25, 'R', ''],
		['G#1',51.91, 'T', ''],
		['A#1',58.27, 'Y', ''],
		['',null, '', 'hide'],
		['C#2',69.30, 'U', ''],
		['D#2',36.708, 'I', ''],
		['F#2',92.50, 'O', ''],
		['',48.999, '', 'hide'],
		['G#2',103.83, 'P', ''],
		['B0',30.868, '2', ''],
		['',32.703, '', 'hide'],
		['D1',36.708, '4', ''],
		['E1',41.203, '5', ''],
		['F1',43.654, '6', ''],
		['',48.999, '', 'hide'],
		['A0',27.5, '1', ''],
		['B0',30.868, '2', ''],
		['',32.703, '', 'hide'],
		['D1',36.708, '4', ''],
		['E1',41.203, '5', ''],
		['F1',43.654, '6', ''],
		['',48.999, '', 'hide'],
		['A0',27.5, '1', ''],
		['B0',30.868, '2', ''],
		['',32.703, '', 'hide'],
		['D1',36.708, '4', ''],
		['E1',41.203, '5', ''],
		['F1',43.654, '6', ''],
		['',48.999, '', 'hide'],
		['A0',27.5, '1', ''],
		['A0',27.5, '1', ''],
		['',32.703, '', 'hide'],
		['D1',36.708, '4', ''],
		['E1',41.203, '5', ''],
		['F1',43.654, '6', ''],
		['',48.999, '', 'hide'],
		['A0',27.5, '1', ''],
		['A0',27.5, '1', ''],
		['',32.703, '', 'hide'],
		['D1',36.708, '4', ''],
		['E1',41.203, '5', ''],
		['F1',43.654, '6', ''],
		['',48.999, '', 'hide'],
	])

	const [attack, setAttack] = useState(1)
	const [decay, setDecay] = useState(1600)
	const [susteinLevel, setSusteinLevel] = useState(400)
	const [susteinTime, setSusteinTime] = useState(3000)
	const [relay, setRelay] = useState(240)
	const [bias1, setBias1] = useState(0)
	const [bias2, setBias2] = useState(0)
	const [bias3, setBias3] = useState(0)
	const [bias4, setBias4] = useState(0)
	const [bias5, setBias5] = useState(0)
	const [bias6, setBias6] = useState(0)

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

		let volumeOfAllNotesT = +(document.querySelector('.sentezator > .settings > .set-volume > input').value);

		let keys = [...whiteKeysNote, ...blackKeysNote]

		let audioContext = new AudioContext();
		let output = audioContext.createGain()
	
		let volume = audioContext.createGain();
		let pan = audioContext.createStereoPanner();
	
		volume.gain.value = 0;
		pan.pan.value = 0;
	
		output.connect(volume);
		volume.connect(audioContext.destination);
	{
		let oscillator1 = audioContext.createOscillator();

		// oscillator.frequency.value = notes[index][1];f

		// let steps = +(document.querySelector('.sentezator > .settings > .set-steps > input').value);

		// let imag = new global.Float32Array(steps);
		// let real = new global.Float32Array(steps);
		
		// for (var i = 1; i < steps; i++) {
		// 	imag[i] = 1 / (i * Math.PI);
		// }

		oscillator1.type = document.querySelectorAll('.set-osc')[0].children[5].value
		console.dir(document.querySelectorAll('.set-osc')[0].children[8].checked)

		// const wave = audioContext.createPeriodicWave(real, imag);

		// oscillator.setPeriodicWave(wave);
		oscillator1.frequency.setValueAtTime(((keys[index][1] + +(document.querySelectorAll('.set-osc')[0].children[2].value))), audioContext.currentTime);
		oscillator1.connect(output);
		if (document.querySelectorAll('.set-osc')[0].children[8].checked === false){
			oscillator1.start();
			console.log(24)
		}
	}

	{
		let oscillator2 = audioContext.createOscillator();

		// oscillator.frequency.value = notes[index][1];f

		// let steps = +(document.querySelector('.sentezator > .settings > .set-steps > input').value);

		// let imag = new global.Float32Array(steps);
		// let real = new global.Float32Array(steps);
		
		// for (var i = 1; i < steps; i++) {
		// 	imag[i] = 1 / (i * Math.PI);
		// }

		oscillator2.type = document.querySelectorAll('.set-osc')[1].children[5].value

		// const wave = audioContext.createPeriodicWave(real, imag);

		// oscillator.setPeriodicWave(wave);
		oscillator2.frequency.setValueAtTime(((keys[index][1] + +(document.querySelectorAll('.set-osc')[1].children[2].value))), audioContext.currentTime);
		oscillator2.connect(output);
		oscillator2.start();
	}

	{
		let oscillator3 = audioContext.createOscillator();

		// oscillator.frequency.value = notes[index][1];f

		// let steps = +(document.querySelector('.sentezator > .settings > .set-steps > input').value);

		// let imag = new global.Float32Array(steps);
		// let real = new global.Float32Array(steps);
		
		// for (var i = 1; i < steps; i++) {
		// 	imag[i] = 1 / (i * Math.PI);
		// }

		oscillator3.type = document.querySelectorAll('.set-osc')[2].children[5].value

		// const wave = audioContext.createPeriodicWave(real, imag);

		// oscillator.setPeriodicWave(wave);
		oscillator3.frequency.setValueAtTime(((keys[index][1] + +(document.querySelectorAll('.set-osc')[2].children[2].value))), audioContext.currentTime);
		oscillator3.connect(output);
		oscillator3.start();
	}

	{
		let oscillator4 = audioContext.createOscillator();

		// oscillator.frequency.value = notes[index][1];f

		// let steps = +(document.querySelector('.sentezator > .settings > .set-steps > input').value);

		// let imag = new global.Float32Array(steps);
		// let real = new global.Float32Array(steps);
		
		// for (var i = 1; i < steps; i++) {
		// 	imag[i] = 1 / (i * Math.PI);
		// }

		oscillator4.type = document.querySelectorAll('.set-osc')[3].children[5].value

		// const wave = audioContext.createPeriodicWave(real, imag);

		// oscillator.setPeriodicWave(wave);
		oscillator4.frequency.setValueAtTime(((keys[index][1] + +(document.querySelectorAll('.set-osc')[3].children[2].value))), audioContext.currentTime);
		oscillator4.connect(output);
		oscillator4.start();
	}

	{
		let oscillator5 = audioContext.createOscillator();

		// oscillator.frequency.value = notes[index][1];f

		// let steps = +(document.querySelector('.sentezator > .settings > .set-steps > input').value);

		// let imag = new global.Float32Array(steps);
		// let real = new global.Float32Array(steps);
		
		// for (var i = 1; i < steps; i++) {
		// 	imag[i] = 1 / (i * Math.PI);
		// }

		oscillator5.type = document.querySelectorAll('.set-osc')[4].children[5].value

		// const wave = audioContext.createPeriodicWave(real, imag);

		// oscillator.setPeriodicWave(wave);
		oscillator5.frequency.setValueAtTime(((keys[index][1] + +(document.querySelectorAll('.set-osc')[4].children[2].value))), audioContext.currentTime);
		oscillator5.connect(output);
		oscillator5.start();
	}

	{
		let oscillator6 = audioContext.createOscillator();

		// oscillator.frequency.value = notes[index][1];f

		// let steps = +(document.querySelector('.sentezator > .settings > .set-steps > input').value);

		// let imag = new global.Float32Array(steps);
		// let real = new global.Float32Array(steps);
		
		// for (var i = 1; i < steps; i++) {
		// 	imag[i] = 1 / (i * Math.PI);
		// }

		oscillator6.type = document.querySelectorAll('.set-osc')[5].children[5].value

		// const wave = audioContext.createPeriodicWave(real, imag);

		// oscillator.setPeriodicWave(wave);
		oscillator6.frequency.setValueAtTime(((keys[index][1] + +(document.querySelectorAll('.set-osc')[5].children[2].value))), audioContext.currentTime);
		oscillator6.connect(output);
		oscillator6.start();
	}

		function release(){
			const interg = setInterval(() => {
				volume.gain.value = 0
				if (volume.gain.value <= 0){
					volume.gain.value = 0;
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
			},(+(document.querySelectorAll('.set-ADSR > input')[4].value)))
		}

		let susteinTime = (+(document.querySelectorAll('.set-ADSR > input')[3].value))
		function sustein(){
			setTimeout(() => {
				release()
			}, susteinTime)
		}

		let susteinLevel = (+(document.querySelectorAll('.set-ADSR > input')[2].value))
		function decay(){
			const interg = setInterval(() => {
				volume.gain.value = ((susteinLevel / 1000) * (volumeOfAllNotesT / 100))
				// if (volume.gain.value <= ((susteinLevel / 1000) * (volumeOfAllNotesT / 100))){
				sustein()
				clearInterval(interg)
				// }
			},(+(document.querySelectorAll('.set-ADSR > input')[1].value)))
		}

		let attackTime = (+(document.querySelectorAll('.set-ADSR > input')[0].value))
		const interd = setInterval(() => {
			if (attackTime > 100){
				volume.gain.value += (1 * (volumeOfAllNotesT / 100))
			}else{
				volume.gain.value += (1 * (volumeOfAllNotesT / 100))
			}
			if (volume.gain.value >= (1 * (volumeOfAllNotesT / 100))){
				clearInterval(interd)
				decay()
			}
		},attackTime)

		playesNotes.push({
			"audi":audioContext,
			"index":index,
			"whatkey":keys[index][2],
			"isUp": false,
			"mainInterval":interd
		})
	}

	function playButton(ev){
		let blackKeys = document.querySelectorAll('.keys > .black-keys > button')
		let whiteKeys = document.querySelectorAll('.keys > .white-keys > button')
		let allKeys = [...whiteKeys,...blackKeys]

		for (let i = 0;i < allKeys.length;i++){
			if (allKeys[i].attributes.dataondownkey.value === ev.key){
				for (let i = 0;i < playesNotes.length;i++){
					if (playesNotes[i].whatkey === ev.key){
						if (playesNotes[i].isUp === false){
							return 0;
						}
						playesNotes[i].audi.close()
						playesNotes = playesNotes.filter(n => n !== playesNotes[i])
					}
				}
				const elem = allKeys[i];
				playButtonHoba(allKeys[i].attributes.indexnotes.value)
				elem.classList.add('click');
				break;
			}
		}
	}

	function stopButton(ev){
		let blackKeys = document.querySelectorAll('.keys > .black-keys > button')
		let whiteKeys = document.querySelectorAll('.keys > .white-keys > button')
		let elems = [...whiteKeys,...blackKeys]

		for (let i = 0;i < elems.length;i++){
			if (elems[i].attributes.dataondownkey.value === ev.key){
				elems[i].classList.remove('click');
				for (let i = 0;i < playesNotes.length;i++){
					if (playesNotes[i].whatkey === ev.key){
						playesNotes[i].isUp = true
						playesNotes[i].audi.close()
						clearInterval(playesNotes[i].mainInterval)
						playesNotes = playesNotes.filter(n => n !== playesNotes[i])
					}
				}
			}
		}
	}

	function changeKeyWhite(e,index){
		setWhiteKeysNote(whiteKeysNote.filter((n,inde) => {
			if(inde === index)
			{
				n[2] = e.target.value
			}
			return n
		}))
	}

	function changeKeyBlack(e,index){
		setBlackKeysNote(blackKeysNote.filter((n,inde) => {
			if(inde === index)
			{
				n[2] = e.target.value
			}
			return n
		}))
	}

	useEffect(() => {
		document.querySelector('html').addEventListener('keydown', playButton)
		document.querySelector('html').addEventListener('keyup', stopButton)
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
							><div><span className='note'>{note[0]}</span><input
								type='text'
								className='key'
								value={note[2]}
								onClick={(e) => {e.stopPropagation()}}
								onChange={e => {changeKeyWhite(e,index)}}
								></input></div></button>
						)}
					</div>
					<div className='black-keys'>
						{blackKeysNote.map((note,index) =>
							<button
								onClick={ev => {play(ev, index)}}
								key={index}
								className={'black '+note[3]}
								dataondownkey={note[2]}
								indexnotes={index + 49}
							><div><span className='note'>{note[0]}</span><input
								type='text'
								className='key'
								value={note[2]}
								onClick={(e) => {e.stopPropagation()}}
								onChange={(e) => {changeKeyBlack(e,index)}}
							></input></div></button>
						)}
					</div>
				</div>
				<div className='settings'>
					<div className='set-steps'>
						<input type='range' onChange={e => setStepsInWave(e.target.value)} min="2" max="10000" value={stepsInWave}></input><span>Steps in wave: {stepsInWave}</span><br></br>
					</div>
					<div className='set-volume'>
						<input type='range' onChange={e => setVolume(e.target.value)} min="1" max="100" value={volumeOfAllNotes}></input><span>Volume: {volumeOfAllNotes}</span>
					</div>
					<div className='set-ADSR'>
						<h4>ADSR</h4>
						<input type='range' onChange={e => setAttack(e.target.value)} min="1" max="1000" value={attack}></input><span>Attack: {attack}</span><br></br>

						<input type='range' onChange={e => setDecay(e.target.value)} min="1" max="3000" value={decay}></input><span>Decay: {decay}</span><br></br>

						<input type='range' onChange={e => setSusteinLevel(e.target.value)} min="1" max="1000" value={susteinLevel}></input><span>Sustein level: {susteinLevel}</span><br></br>

						<input type='range' onChange={e => setSusteinTime(e.target.value)} min="1" max="10000" value={susteinTime}></input><span>Sustein time: {susteinTime}</span><br></br>

						<input type='range' onChange={e => setRelay(e.target.value)} min="1" max="1000" value={relay}></input><span>Relay: {relay}</span><br></br>
					</div>
					<div className='oscils'>
						<div className='set-osc'>
							<h4>OSC 1</h4>
							<span>bias:</span><input type='number' min="-1000" max="1000" value={bias1} onChange={e => {setBias1(e.target.value)}} step={1}></input><br></br>
							<span>Type wave: </span>
							<select>
								<option value="sine" selected>sine</option>
								<option value="square">square</option>
								<option value="triangle">triangle</option>
								<option value="sawtooth">sawtooth</option>
							</select><br></br>
							<span>Disable: </span>
							<input type='checkbox'></input>
						</div>
						<div className='set-osc'>
							<h4>OSC 2</h4>
							<span>bias:</span><input type='number' min="-1000" max="1000" value={bias2} onChange={e => {setBias2(e.target.value)}} step={1}></input><br></br>
							<span>Type wave: </span>
							<select>
								<option value="sine" selected>sine</option>
								<option value="square">square</option>
								<option value="triangle">triangle</option>
								<option value="sawtooth">sawtooth</option>
							</select>
						</div>
						<div className='set-osc'>
							<h4>OSC 3</h4>
							<span>bias:</span><input type='number' min="-1000" max="1000" value={bias3} onChange={e => {setBias3(e.target.value)}} step={1}></input><br></br>
							<span>Type wave: </span>
							<select>
								<option value="sine" selected>sine</option>
								<option value="square">square</option>
								<option value="triangle">triangle</option>
								<option value="sawtooth">sawtooth</option>
							</select>
						</div>
						<div className='set-osc'>
							<h4>OSC 4</h4>
							<span>bias:</span><input type='number' min="-1000" max="1000" value={bias4} onChange={e => {setBias4(e.target.value)}} step={1}></input><br></br>
							<span>Type wave: </span>
							<select>
								<option value="sine" selected>sine</option>
								<option value="square">square</option>
								<option value="triangle">triangle</option>
								<option value="sawtooth">sawtooth</option>
							</select>
						</div>
						<div className='set-osc'>
							<h4>OSC 5</h4>
							<span>bias:</span><input type='number' min="-1000" max="1000" value={bias5} onChange={e => {setBias5(e.target.value)}} step={1}></input><br></br>
							<span>Type wave: </span>
							<select>
								<option value="sine" selected>sine</option>
								<option value="square">square</option>
								<option value="triangle">triangle</option>
								<option value="sawtooth">sawtooth</option>
							</select>
						</div>
						<div className='set-osc'>
							<h4>OSC 6</h4>
							<span>bias:</span><input type='number' min="-1000" max="1000" value={bias6} onChange={e => {setBias6(e.target.value)}} step={1}></input><br></br>
							<span>Type wave: </span>
							<select>
								<option value="sine" selected>sine</option>
								<option value="square">square</option>
								<option value="triangle">triangle</option>
								<option value="sawtooth">sawtooth</option>
							</select>
						</div>
					</div>

				</div>
			</div>
    </div>
	);
}

export default App;