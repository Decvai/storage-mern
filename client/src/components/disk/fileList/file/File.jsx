import React from 'react';
import './file.scss';
import dirLogo from '../../../../assets/img/dir.svg';
import fileLogo from '../../../../assets/img/file.svg';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import { deleteFile, downloadFile } from '../../../../actions/file';
import sizeFormat from '../../../../utils/sizeFormat';

const File = ({ file }) => {
	const dispatch = useDispatch();
	const currentDir = useSelector(state => state.files.currentDir);
	const fileViews = useSelector(state => state.files.views);

	function openDirHandler() {
		dispatch(pushToStack(currentDir));
		dispatch(setCurrentDir(file._id));
	}

	function downloadClickHandler(e) {
		e.stopPropagation();
		downloadFile(file);
	}

	function deleteFileHandler(e) {
		e.stopPropagation();
		dispatch(deleteFile(file));
	}

	if (fileViews === 'list')
		return (
			<div className='file' onClick={() => file.type === 'dir' && openDirHandler()}>
				<img src={file.type === 'dir' ? dirLogo : fileLogo} alt='' className='file__img' />
				<div className='file__name'>{file.name}</div>
				<div className='file__date'>{file.date.slice(0, 10)}</div>
				<div className='file__size'>{sizeFormat(file.size)}</div>

				{file.type !== 'dir' && (
					<button onClick={e => downloadClickHandler(e)} className='file__btn file__download'>
						download
					</button>
				)}
				<button className='file__btn file__delete' onClick={e => deleteFileHandler(e)}>
					delete
				</button>
			</div>
		);

	if (fileViews === 'plate')
		return (
			<div className='file-plate' onClick={() => file.type === 'dir' && openDirHandler()}>
				<img src={file.type === 'dir' ? dirLogo : fileLogo} alt='' className='file-plate__img' />
				<div className='file-plate__name'>{file.name}</div>

				<div className='file-plate__btns'>
					{file.type !== 'dir' && (
						<button onClick={e => downloadClickHandler(e)} className='file-plate__btn file-plate__download'>
							download
						</button>
					)}
					<button className='file-plate__btn file-plate__delete' onClick={e => deleteFileHandler(e)}>
						delete
					</button>
				</div>
			</div>
		);
};

export default File;
