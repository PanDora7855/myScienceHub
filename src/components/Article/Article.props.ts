export interface IArticles {
	id: number;
	title: string;
	annotation: string;
	createdAt: Date;
	updatedAt?: Date | undefined;
	authors: string[];
	tags: string[];
}
