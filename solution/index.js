module.exports = function (Homework) {
	const length = (arr)  => new Promise(arr.length);
	const less = (Homework, a, b) => new Promise(Homework.less.bind(Homework, a, b));
	const add = (Homework, a, b) => new Promise(Homework.add.bind(Homework, a, b));
	const get = (arr, index) => new Promise(arr.get.bind(arr, index));

	return async (asyncArray, fn, initialValue, cb) => {

		const func = ()  => new Promise(fn);
		const len = await length(asyncArray);

		let i = 0;
		let prev = initialValue;
		let curr = 0;

		while (await less(Homework, i, len))
		{
			curr = await get(asyncArray, i);

			prev = await new Promise((resolve) => {
				fn(prev, curr, i, asyncArray, (res) => resolve(res));
			});

			i = await add(Homework, i, 1);
		}

		cb(prev);
	}
};