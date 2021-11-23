/* eslint-disable jsx-a11y/iframe-has-title */
import { Fragment } from "react";

export const Map = () => {
  return (
    <Fragment>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8638558831753!2d105.74459305092608!3d21.03813279276447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b991d80fd5%3A0x53cefc99d6b0bf6f!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1637654073719!5m2!1svi!2s"
        width={600}
        height={450}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      />
    </Fragment>
  );
};
