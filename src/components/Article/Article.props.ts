export interface IArticles {
	id: number;
	title: string;
	abstract: string;
	created_at: Date;
	updated_at?: Date | undefined;
	profiles: IProfiles[];
	tags: ITags[];
}

export interface ITags {
	id: number;
	name: string;
	publications: number | null;
}

export interface IProfiles {
	id: number;
	login: string;
	password: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	country: string;
	academic_degree: string;
	vac: string;
	appointment: string;
	Publications: IArticles[] | null;
	SubscribersList: null;
	MySubscribesList: null;
}
