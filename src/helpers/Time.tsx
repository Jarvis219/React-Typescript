import moment from 'moment';
let times: string[] = [];
const dateToFormat = new Date();

for (let index = 6; index >= 0; index--) {
	times.push(moment(dateToFormat).add(-index, 'd').format('DD/MM'));
}

export default times;
