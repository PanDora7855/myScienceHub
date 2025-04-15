interface TabItem {
	label: string;
	linkTo: string;
	isActive: boolean;
}

export interface ITabs {
	tabs: TabItem[];
}
