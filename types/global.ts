export interface UserData {
	id: number;
	firstName: string;
	lastName: string;
	wallet: number;
	herd: CatCardProps[];
}

export interface CatCardProps {
	nickname: string;
	imageID: string;
	imageURI: string;
	breed?: string;
	breedId?: string;
	width?: number;
	height?: number;
}

export type DropDownProps = {
	handleChange: (event: string) => void;
};
