import { Fragment, memo, useEffect, useState } from "react";
import { ProductStatus } from "constants/product";

const StatusProduct = ({ statusItem, data, getDataStatus }: any) => {
  const [status, setStatus] = useState<Array<string>>([]);

  const checkStatus = () => {
    if (statusItem === ProductStatus.public) {
      setStatus([
        ProductStatus.public,
        ProductStatus.private,
        ProductStatus.delete,
      ]);
    } else if (statusItem === ProductStatus.private) {
      setStatus([
        ProductStatus.private,
        ProductStatus.public,
        ProductStatus.delete,
      ]);
    } else {
      setStatus([ProductStatus.delete]);
    }
  };
  useEffect(() => {
    checkStatus();
  }, [statusItem]);

  const setDataStatus = async (e: any) => {
    await getDataStatus(Object.assign({}, data, { status: e.target.value }));
    checkStatus();
  };
  console.log(status);
  return (
    <Fragment>
      <select
        className="rounded py-2 px-3 bg-blue-100 text-gray-700"
        onChange={(e) => setDataStatus(e)}
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
export default memo(StatusProduct);
