import { CatCardProps } from "@/types/global";

import styles from "@/styles/CatCardPanel.module.css";

const CatCard: React.FC<CatCardProps> = ({ nickname, imageURI, breed, breedId }) => {
	return (
		<div className={styles.herdBox}>
			<h2>{nickname}</h2>
			<img className={styles.herdImage} src={imageURI} alt={`Picture of ${nickname}`} />
			{/* 
      Monica said to comment these out for now. Maybe we'll use them later.
      <p>Breed: {breed}</p>
      <p>Breed ID: {breedId}</p> */}
		</div>
	);
};

const CatCardPanel = (props: { herd: CatCardProps[] }) => {
	return (
		<>
			{props.herd.map((cat, idx) => (
				<CatCard {...cat} key={idx} />
			))}
		</>
	);
};
export default CatCardPanel;
