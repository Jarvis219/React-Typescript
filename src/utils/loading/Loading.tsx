import "./loading.css";
export const Loading = () => {
  return (
    <div className='body-loading'>
      <div className='spinner-box_loading'>
        <div className='blue-orbit_loading leo_loading' />
        <div className='green-orbit_loading leo_loading' />
        <div className='red-orbit_loading leo_loading' />
        <div className='white-orbit_loading w1_loading leo_loading' />
        <div className='white-orbit_loading w2_loading leo_loading' />
        <div className='white-orbit_loading w3_loading leo_loading' />
      </div>
    </div>
  );
};
