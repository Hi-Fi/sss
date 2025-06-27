export function getIndex(value, arr, prop) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i][prop] === value) {
			return i;
		}
	}
	return -1; //to handle the case where the value doesn't exist
}

export async function toBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}
