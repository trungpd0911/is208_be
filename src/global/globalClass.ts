export class responseData<D> {
	data: D | D[];
	// D is a generic type that will be used to define the type of the data property.
	statusCode: number;
	message: string;

	constructor(data: D | D[], statusCode: number, message: string) {
		this.data = data;
		this.statusCode = statusCode;
		this.message = message;

		return this;
	}
}

export class responseError {
	statusCode: number;
	message: string;
	error: string;

	constructor(statusCode: number, message: string) {
		this.statusCode = statusCode;
		if (statusCode === 400) this.error = 'Bad Request';
		if (statusCode === 401) this.error = 'Unauthorized';
		if (statusCode === 403) this.error = 'Forbidden';
		if (statusCode === 404) this.error = 'Not Found';
		if (statusCode === 500) this.error = 'Internal Server Error';
		this.message = message;

		return this;
	}
}
