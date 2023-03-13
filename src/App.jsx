import { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');

	useEffect(() => {
		socket.off('chat message');
		socket.on('chat message', (msg) => {
			setMessages((prevMessages) => {
				return [...prevMessages, msg];
			});
		});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		socket.emit('chat message', input);
		setInput('');
	};

	return (
		<div>
			{messages.map((message, index) => (
				<div key={index}>{message}</div>
			))}
			<form onSubmit={handleSubmit}>
				<input value={input} onChange={(e) => setInput(e.target.value)} />
				<button type='submit'>Send</button>
			</form>
		</div>
	);
}

export default App;
