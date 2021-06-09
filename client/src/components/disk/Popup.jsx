import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDir } from '../../actions/file';
import { setPopupDisplay } from '../../reducers/fileReducer';
import Input from '../../utils/input/Input';

const Popup = () => {
	const [dirName, setDirName] = useState('');
	const popupDisplay = useSelector(state => state.files.popupDisplay);
	const dispatch = useDispatch();
	const currentDir = useSelector(state => state.files.currentDir);

	function createDirHandler() {
		dispatch(createDir(currentDir, dirName));
		setDirName('');
		dispatch(setPopupDisplay('none'));
	}

	return (
		<div className='popup' style={{ display: popupDisplay }} onClick={() => dispatch(setPopupDisplay('none'))}>
			<div className='popup__content' onClick={e => e.stopPropagation()}>
				<div className='popup__header'>
					<div className='popup__title'>Create new dir</div>
					<div className='popup__close' onClick={() => dispatch(setPopupDisplay('none'))} style={{ cursor: 'pointer' }}>
						X
					</div>
				</div>
				<Input type='text' placeholder='Enter dir name...' value={dirName} setValue={setDirName} />
				<button className='popup__create' onClick={() => createDirHandler()}>
					Create
				</button>
			</div>
		</div>
	);
};

export default Popup;
