import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile, searchFiles } from '../../actions/file';
import { showLoader } from '../../reducers/appReducer';
import FileList from './fileList/FileList';
import './disk.scss';
import Popup from './Popup';
import { popFromStack, setCurrentDir, setFileViews, setPopupDisplay } from '../../reducers/fileReducer';
import Uploader from './uploader/Uploader';

const Disk = () => {
	const dispatch = useDispatch();
	const currentDir = useSelector(state => state.files.currentDir);
	const dirStack = useSelector(state => state.files.dirStack);
	const loader = useSelector(state => state.app.loader);
	const [dragEnter, setDragEnter] = useState(false);
	const [sort, setSort] = useState('type');
	const [searchName, setSearchName] = useState('');
	const [searchTimeout, setSearchTimeout] = useState(false);

	function searchChangeHandler(e) {
		setSearchName(e.target.value);

		if (searchTimeout) clearTimeout(searchTimeout);
		dispatch(showLoader());
		if (e.target.value) {
			setSearchTimeout(
				setTimeout(
					value => {
						dispatch(searchFiles(value));
					},
					500,
					e.target.value
				)
			);
		} else {
			dispatch(getFiles(currentDir, 'type'));
		}
	}

	useEffect(() => {
		dispatch(getFiles(currentDir, sort));
	}, [currentDir, sort]);

	function showPopupHandler() {
		dispatch(setPopupDisplay('flex'));
	}

	function backDirHandler() {
		dispatch(setCurrentDir(dirStack[dirStack.length - 1]));
		dispatch(popFromStack());
	}

	function fileUploadHandler(event) {
		const files = [...event.target.files];
		files.forEach(file => dispatch(uploadFile(file, currentDir)));
	}

	function dragEnterHandler(e) {
		e.preventDefault();
		e.stopPropagation();
		setDragEnter(true);
	}

	function dragLeaveHandler(e) {
		e.preventDefault();
		e.stopPropagation();
		setDragEnter(false);
	}

	function dropHandler(e) {
		e.preventDefault();
		e.stopPropagation();
		const files = [...e.dataTransfer.files];
		files.forEach(file => dispatch(uploadFile(file, currentDir)));
		setDragEnter(false);
	}

	return !dragEnter ? (
		<div className='disk' onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
			<div className='disk__btns'>
				{currentDir && (
					<button className='disk__back' onClick={() => backDirHandler()}>
						Back
					</button>
				)}
				<button className='disk__create' onClick={() => showPopupHandler()}>
					Create
				</button>

				<div className='disk__upload'>
					<label htmlFor='disk__upload-input' className='disk__upload-label'>
						Upload file
					</label>
					<input multiple={true} onChange={event => fileUploadHandler(event)} type='file' id='disk__upload-input' className='disk__upload-input' />
				</div>
			</div>
			<div className='disk__btns-bottom'>
				<select value={sort} onChange={e => setSort(e.target.value)} className='disk__select'>
					<option value='name'>By name</option>
					<option value='type'>By type</option>
					<option value='date'>By date</option>
				</select>

				<input type='text' value={searchName} onChange={e => searchChangeHandler(e)} className='navbar__search' placeholder='Enter filename' />

				<div className='disk__display'>
					<button className='disk__plate' onClick={() => dispatch(setFileViews('plate'))}></button>
					<button className='disk__list' onClick={() => dispatch(setFileViews('list'))}></button>
				</div>
			</div>

			{loader ? (
				<div className='loader'>
					<div className='lds-roller'>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			) : (
				<FileList />
			)}

			<Popup />
			<Uploader />
		</div>
	) : (
		<div className='drop-area' onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
			Drag files here
		</div>
	);
};

export default Disk;
