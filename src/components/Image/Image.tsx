import Image from "@material-tailwind/react/Image";

export default function ImageUI({ photo }) {
  return <Image src={photo} rounded={false} raised={false} alt='Image' />;
}
