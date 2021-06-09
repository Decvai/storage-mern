import React from 'react';
import { useSelector } from 'react-redux';
import './fileList.scss';
import File from './file/File';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const FileList = () => {
	const files = useSelector(state => state.files.files);
	const fileViews = useSelector(state => state.files.views);

	if (!files.length) {
		return <div className='loader'>No files</div>;
	}

	if (fileViews === 'list') {
		return (
			<div className='filelist'>
				<div className='filelist__header'>
					<div className='filelist__name'>Name</div>
					<div className='filelist__date'>Date</div>
					<div className='filelist__size'>Size</div>
				</div>
				<TransitionGroup>
					{files.map(file => (
						<CSSTransition key={file._id} timeout={500} classNames={'file'} exit={false}>
							<File file={file} />
						</CSSTransition>
					))}
				</TransitionGroup>
			</div>
		);
	}

	if (fileViews === 'plate') {
		return (
			<div className='fileplate'>
				{files.map(file => (
					<File key={file._id} file={file} />
				))}
			</div>
		);
	}
};

export default FileList;
