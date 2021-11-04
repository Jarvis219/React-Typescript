import { Fragment, memo, useEffect, useState } from "react";
import { ProductStatus } from "constants/product";

const StatusProduct = ({ statusItem, id }: any) => {
  const [status, setStatus] = useState<Array<string>>([]);

  useEffect(() => {
    const checkStatus = () => {
      if (
        statusItem === ProductStatus.public ||
        statusItem === ProductStatus.private
      ) {
        setStatus([
          ProductStatus.public,
          ProductStatus.private,
          ProductStatus.delete,
        ]);
      } else {
        setStatus([ProductStatus.delete]);
      }
    };
    checkStatus();
  }, [statusItem]);
  return (
    <Fragment>
      <select>
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
