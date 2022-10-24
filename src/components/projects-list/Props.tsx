export interface ProjectProps {
	id: number | null;
	image: { src: string | any[] | any; alt: string } | null;
	title: string | null;
	description: string | null;
	categories: string[] | null;
	tools: string[] | null;
	link: string | null;
	bgPosition?: any;
}

export interface ClassProp {
	className?: string;
}
