// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export interface TaskProps {
	id?: number;
	completed?: boolean;
	name?: string;
	due_date?: { time: any; date: any } | any;
	schedule?: {
		start: { moment?: any; time: any; date: any } | any;
		end: { time: any; date: any } | any;
		duration: number | "all day";
	};
	deadline?: { time: any; date: any } | any;
	repeat?: any;
	repeat_ends?: any;
}
export type User = TaskProps;
