export interface ITabHandle {
	label: string;
	linkTo: string;
}

export interface IRouteHandle {
	title?: string;
	secondTitle?: string;
	tabs?: ITabHandle[];
}
