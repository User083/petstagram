interface IProps {
  text: string;
}
const NoResults = ({ text }: IProps) => {
  return (
    <div className="flex items-center justify center">
      <p className="text-md">{text}</p>
    </div>
  );
};

export default NoResults;
