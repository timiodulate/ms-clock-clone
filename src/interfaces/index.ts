// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export interface TaskProps {
	id?: number;
	completed?: boolean;
	name?: string;

	due_date?: any;
	schedule?:
		| any
		| { date: any; duration: "all day" | { start: any; end: any } };
	deadline?: any;
	repeat?: any;
	repeat_ends?: any;
}
export type User = TaskProps;
