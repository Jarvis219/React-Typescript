import { Fragment, useEffect, useState, memo } from "react";
import { ProductStatus } from "constants/product";
import { ColorBackground } from "constants/color";

const StatusProduct = ({ statusItem, data, getDataStatus }: any) => {
  const [status, setStatus] = useState<Array<string>>([]);
  useEffect(() => {
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
    return () => setStatus([]);
  }, [statusItem]);

  const setDataStatus = async (e: any) => {
    await getDataStatus(Object.assign({}, data, { status: e.target.value }));
  };

  return (
    <Fragment>
      <select
        style={{ backgroundColor: ColorBackground.blue }}
        className='rounded py-2 px-3  text-white'
        onChange={(e) => setDataStatus(e)}
        value=''>
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
