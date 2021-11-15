import Image from "@material-tailwind/react/Image";

export default function ImageUI({ photo }: any) {
  if (photo === undefined) {
    photo = "https://picsum.photos/200/300";
  }
  return <Image src={photo} rounded={false} raised={false} alt="Image" />;
}
