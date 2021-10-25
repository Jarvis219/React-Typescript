export const Hobby = ({ hobbies }: any) => {
  console.log(hobbies);
  return (
    <div>
      <ul>
        {hobbies.map((item: any, index: number) => (
          <li key={index}>
            {item.name} : {item.email}
          </li>
        ))}
      </ul>
    </div>
  );
};
