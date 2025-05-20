export interface IArticle {
	id: number;
	title: string;
	abstract: string;
	created_at: Date;
	updated_at?: Date | undefined;
	profiles: IProfile[] | null;
	tags: ITag[] | null;
	file_link: string;
	owner_id: number;
	owner: IProfile | null;
}

export interface ITag {
	id: number;
	name: string;
	publications: IArticle[];
}

export interface IProfile {
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
	Publications: IArticle[] | null;
	SubscribersList: null;
	MySubscribesList: null;
}
