interface IProps {
  text: string;
}
const NoResults = ({ text }: IProps) => {
  return (
    <section className="flex flex-col justify-center items-center h-full w-full">
      <p className="font-semibold text-md text-gray-600">{text}</p>
    </section>
  );
};

export default NoResults;
