import { Fragment, memo, useEffect, useState } from "react";
import { OrderStatus } from "constants/order";

const StatusOrder = ({ statusItem, data, getDataStatus }: any) => {
  const [status, setStatus] = useState<Array<string>>([]);
  useEffect(() => {
    if (statusItem === OrderStatus.unconfirmed) {
      setStatus([
        OrderStatus.unconfirmed,
        OrderStatus.confirmed,
        OrderStatus.complete,
        OrderStatus.cancelled,
      ]);
    } else {
      setStatus([
        OrderStatus.confirmed,
        OrderStatus.complete,
        OrderStatus.cancelled,
      ]);
    }
    return () => setStatus([]);
  }, [statusItem]);

  const setDataStatus = async (e: any) => {
    await getDataStatus(Object.assign({}, data, { status: e.target.value }));
  };
  return (
    <Fragment>
      <select
        className="rounded py-2 px-3 bg-blue-100 text-gray-700"
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

export default memo(StatusOrder);
