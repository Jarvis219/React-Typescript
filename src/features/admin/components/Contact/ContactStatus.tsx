import { Fragment, memo, useEffect, useState } from "react";
import { ColorBackground } from "constants/color";
import { ContactStatuss } from "constants/contact";

const ContactStatus = ({ statusItem, data, handleUpdateContact }) => {
  const [status, setStatus] = useState<Array<string>>([]);

  useEffect(() => {
    if (statusItem === ContactStatuss.NotSeen) {
      setStatus([ContactStatuss.NotSeen, ContactStatuss.Seen]);
    } else {
      setStatus([ContactStatuss.Seen]);
    }

    return () => setStatus([]);
  }, [statusItem, data]);
  const setDataStatus = async (e: any) => {
    await handleUpdateContact(
      Object.assign({}, data, { status: e.target.value })
    );
  };
  return (
    <Fragment>
      <select
        style={{ backgroundColor: ColorBackground.blue }}
        className="rounded py-2 px-3  text-white"
        onChange={(e) => setDataStatus(e)}
        value=""
      >
        {status.map((item: string, index: number) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </Fragment>
  );
};

export default memo(ContactStatus);
