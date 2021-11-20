import { UserAuth } from "constants/user";
import { useEffect, useState } from "react";

export default function Radio({ permission, name, handlePermission }: any) {
  const [admin, setAdmin] = useState<boolean>(false);
  const [member, setMember] = useState<boolean>(false);
  useEffect(() => {
    if (permission === UserAuth.admin) {
      setAdmin(true);
    } else {
      setMember(true);
    }
  }, [permission]);

  const handleRadio = async (data: string): Promise<void> => {
    await handlePermission(data);
    if (+data === UserAuth.admin) {
      setMember(false);
      setAdmin(true);
    } else {
      setAdmin(false);
      setMember(true);
    }
  };
  return (
    <div className='mt-2 flex items-center gap-3'>
      <div>
        <label className='inline-flex items-center'>
          <input
            type='radio'
            name={`radio${name}`}
            value={1}
            checked={admin}
            onChange={(e) => handleRadio(e.target.value)}
          />
          <span className='ml-2'>Admin</span>
        </label>
      </div>
      <div>
        <label className='inline-flex items-center'>
          <input
            type='radio'
            name={`radio${name}`}
            value={0}
            checked={member}
            onChange={(e) => handleRadio(e.target.value)}
          />
          <span className='ml-2'>Member</span>
        </label>
      </div>
    </div>
  );
}
