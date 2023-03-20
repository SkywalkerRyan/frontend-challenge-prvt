import { CatCardProps } from "@/types/global";

const CatCard: React.FC<CatCardProps> = ({
  nickname,
  imageURI,
  breed,
  breedId,
}) => {
  return (
    <div>
      <h2>{nickname}</h2>
      <img src={imageURI} alt={`Picture of ${nickname}`} />
      {/* 
      Monica said to comment these out for now. Maybe we'll use them later.
      <p>Breed: {breed}</p>
      <p>Breed ID: {breedId}</p> */}
    </div>
  );
};

const CatCardPanel = (props: { herd: CatCardProps[] }) => {
  console.log( "!!!!!!!!!!!!!!! : ", props );
  return (
    <>
      {props.herd.map((cat, idx) => (
        <CatCard {...cat} key={idx}/>
      ))}
    </>
  );
};
export default CatCardPanel;
