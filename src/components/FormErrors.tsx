const Error = ({ errorsArr }: { errorsArr: string[] }) => {
  return (
    <ul className=" text-red-600 text-sm  mb-2">
      {errorsArr.map((error: string, i: number) => (
        <li key={i}>{error}</li>
      ))}
    </ul>
  );
};
export default Error;
