import React, { useState } from 'react';
// import styles from './styles.module.css';

export default function Modal({ isOpen, onClose, children }) {
	// destructured elems, such that when we set those
	// in the parent component, it'll use them here by the same name

	if(!isOpen)
		return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">

			<div className="bg-gray-300 rounded-lg p-8">
				content: { children }
				<button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	)
}