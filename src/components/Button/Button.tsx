import Button from "@material-tailwind/react/Button";

export default function ButtonUI1({
  text,
  className,
  color = "lightBlue",
  size,
}: any) {
  return (
    <Button
      className={className}
      color={color}
      buttonType='filled'
      size={size}
      rounded={false}
      block={false}
      iconOnly={false}
      ripple='light'>
      {text}
    </Button>
  );
}
