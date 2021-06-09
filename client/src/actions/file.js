import axios from 'axios';
import { hideLoader, showLoader } from '../reducers/appReducer';
import { addFile, setFiles, deleteFileAction } from '../reducers/fileReducer';
import { addUploadFile, showUploader, changeUploadFile } from '../reducers/uploadReducer';
import { API_URL } from '../config';

export function getFiles(dirId, sort) {
	return async dispatch => {
		try {
			dispatch(showLoader());
			const url = new URL(`${API_URL}/api/files`);
			const params = {
				parent: dirId,
				sort,
			};
			Object.keys(params).forEach(key => params[key] && url.searchParams.append(key, params[key]));

			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			dispatch(setFiles(response.data));
			console.log(response);
		} catch (e) {
			alert(e.response?.data.message || e);
		} finally {
			dispatch(hideLoader());
		}
	};
}

export function createDir(dirId, name) {
	return async dispatch => {
		try {
			const response = await axios.post(
				`${API_URL}/api/files`,
				{
					name,
					type: 'dir',
					parent: dirId,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			dispatch(addFile(response.data));
			console.log(response);
		} catch (e) {
			alert(e.response?.data.message || e);
		}
	};
}

export function uploadFile(file, dirId) {
	return async dispatch => {
		try {
			const formData = new FormData();
			formData.append('file', file);
			if (dirId) {
				formData.append('parent', dirId);
			}
			const uploadFile = { name: file.name, progress: 0, id: Date.now() + Math.random() };
			dispatch(showUploader());
			dispatch(addUploadFile(uploadFile));
			const response = await axios.post(`${API_URL}/api/files/upload`, formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				onUploadProgress: progressEvent => {
					const totalLength = progressEvent.lengthComputable
						? progressEvent.total
						: progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
					if (totalLength) {
						uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength);
						dispatch(changeUploadFile(uploadFile));
					}
				},
			});

			dispatch(addFile(response.data));
			console.log(response);
		} catch (e) {
			alert(e.response?.data.message || e);
		}
	};
}

export async function downloadFile(file) {
	const response = await fetch(`${API_URL}/api/files/download?id=${file._id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});
	if (response.ok) {
		const blob = await response.blob();
		const downloadUrl = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = downloadUrl;
		link.download = file.name;
		document.body.appendChild(link);
		link.click();
		//todo clgs///////
		// link.remove();
	} else {
		alert("Error: response isn't okay");
	}
}

export function deleteFile(file) {
	return async dispatch => {
		try {
			const response = await axios.delete(`${API_URL}/api/files?id=${file._id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});

			dispatch(deleteFileAction(file._id));
			alert(response.data.message);
		} catch (e) {
			alert(e.response?.data.message || e);
		}
	};
}

export function searchFiles(searchName) {
	return async dispatch => {
		try {
			const response = await axios.get(`${API_URL}/api/files/search?search=${searchName}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});

			dispatch(setFiles(response.data));
		} catch (e) {
			alert(e.response?.data.message || e);
		} finally {
			dispatch(hideLoader());
		}
	};
}
