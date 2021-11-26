import moment from 'moment';
import { Line } from 'react-chartjs-2';
import {
	Chart,
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Title,
	Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import times from 'helpers/Time';
import { OrderStatus } from 'constants/order';

Chart.register(
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Title,
	Tooltip
);

const initialState: { time: string; price: number } = {
	time: times[0],
	price: 0,
};

export const ChartDashboard = ({ orders }) => {
	const [data1, setData1] =
		useState<{ time: string; price: number }>(initialState);
	const [data2, setData2] =
		useState<{ time: string; price: number }>(initialState);
	const [data3, setData3] =
		useState<{ time: string; price: number }>(initialState);
	const [data4, setData4] =
		useState<{ time: string; price: number }>(initialState);
	const [data5, setData5] =
		useState<{ time: string; price: number }>(initialState);
	const [data6, setData6] =
		useState<{ time: string; price: number }>(initialState);
	const [data7, setData7] =
		useState<{ time: string; price: number }>(initialState);
	const [dataCpl1, setDataCpl1] =
		useState<{ time: string; price: number }>(initialState);
	const [dataCpl2, setDataCpl2] =
		useState<{ time: string; price: number }>(initialState);
	const [dataCpl3, setDataCpl3] =
		useState<{ time: string; price: number }>(initialState);
	const [dataCpl4, setDataCpl4] =
		useState<{ time: string; price: number }>(initialState);
	const [dataCpl5, setDataCpl5] =
		useState<{ time: string; price: number }>(initialState);
	const [dataCpl6, setDataCpl6] =
		useState<{ time: string; price: number }>(initialState);
	const [dataCpl7, setDataCpl7] =
		useState<{ time: string; price: number }>(initialState);
	useEffect(() => {
		orders.forEach((item) => {
			if (moment(item.updatedAt).format('DD/MM') === times[0]) {
				setData1((state) => {
					return { ...state, price: state.price + item.price };
				});
			}

			if (moment(item.updatedAt).format('DD/MM') === times[1]) {
				setData2((state) => {
					return { ...state, price: state.price + item.price };
				});
			}
			if (moment(item.updatedAt).format('DD/MM') === times[2]) {
				setData3((state) => {
					return { ...state, price: state.price + item.price };
				});
			}
			if (moment(item.updatedAt).format('DD/MM') === times[3]) {
				setData4((state) => {
					return { ...state, price: state.price + item.price };
				});
			}
			if (moment(item.updatedAt).format('DD/MM') === times[4]) {
				setData5((state) => {
					return { ...state, price: state.price + item.price };
				});
			}
			if (moment(item.updatedAt).format('DD/MM') === times[5]) {
				setData6((state) => {
					return { ...state, price: state.price + item.price };
				});
			}
			if (moment(item.updatedAt).format('DD/MM') === times[6]) {
				setData7((state) => {
					return { ...state, price: state.price + item.price };
				});
			}
			if (
				moment(item.updatedAt).format('DD/MM') === times[0] &&
				item.status === OrderStatus.complete
			) {
				setDataCpl1((state) => {
					return { ...state, price: state.price + item.price };
				});
			}
			if (
				moment(item.updatedAt).format('DD/MM') === times[1] &&
				item.status === OrderStatus.complete
			) {
				setDataCpl2((state) => {
					return { ...state, price: state.price + item.price };
				});
			}
			if (
				moment(item.updatedAt).format('DD/MM') === times[2] &&
				item.status === OrderStatus.complete
			) {
				setDataCpl3((state) => {
					return { ...state, price: state.price + item.price };
				});
			}
			if (
				moment(item.updatedAt).format('DD/MM') === times[3] &&
				item.status === OrderStatus.complete
			) {
				setDataCpl4((state) => {
					return { ...state, price: state.price + item.price };
				});
			}
			if (
				moment(item.updatedAt).format('DD/MM') === times[4] &&
				item.status === OrderStatus.complete
			) {
				setDataCpl5((state) => {
					return { ...state, price: state.price + item.price };
				});
			}
			if (
				moment(item.updatedAt).format('DD/MM') === times[5] &&
				item.status === OrderStatus.complete
			) {
				setDataCpl6((state) => {
					return { ...state, price: state.price + item.price };
				});
			}
			if (
				moment(item.updatedAt).format('DD/MM') === times[6] &&
				item.status === OrderStatus.complete
			) {
				setDataCpl7((state) => {
					return { ...state, price: state.price + item.price };
				});
			}
		});
	}, [orders]);
	const data = {
		labels: [
			times[0],
			times[1],
			times[2],
			times[3],
			times[4],
			times[5],
			times[6],
		],
		datasets: [
			{
				label: 'Orders',
				data: [
					data1?.price,
					data2?.price,
					data3?.price,
					data4?.price,
					data5?.price,
					data6?.price,
					data7?.price,
				],
				fill: true,
				backgroundColor: 'rgba(75,192,192,0.2)',
				borderColor: 'rgba(75,192,192,1)',
			},
			{
				label: 'Orders complete',
				data: [
					dataCpl1?.price,
					dataCpl2?.price,
					dataCpl3?.price,
					dataCpl4?.price,
					dataCpl5?.price,
					dataCpl6?.price,
					dataCpl7?.price,
				],
				fill: false,
				borderColor: '#742774',
			},
		],
	};
	return (
		<div className='text-center font-bold w-[85%] ml-[6%] lg:ml-[7%] '>
			<h2 className='text-2xl'>Chart order & orders complete ($)</h2>
			<Line data={data} />
		</div>
	);
};
