import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { Text } from "../Text";
import { Button } from "../Button";
import { Link } from "../Link";

class Component extends React.Component {
  static displayName = "Legal";

  static propTypes = {
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    energy: PropTypes.object.isRequired,
    audio: PropTypes.object.isRequired,
    sounds: PropTypes.object.isRequired,
    className: PropTypes.any,
    opaque: PropTypes.bool,
    onLinkStart: PropTypes.func,
    onLinkEnd: PropTypes.func,
  };

  render() {
    const {
      theme,
      classes,
      energy,
      audio,
      sounds,
      className,
      opaque,
      onLinkStart,
      onLinkEnd,
      ...etc
    } = this.props;
    const { animate, duration } = energy;
    const show = energy.entering || energy.entered;

    return (
      <div className={cx(classes.root, className)} {...etc}>
        <Link
          // className={classes.link}
          href="https://github.com/Aakash074"
          target="github"
          onMouseEnter={() => sounds.hover.play()}
          onLinkStart={onLinkStart}
          onLinkEnd={onLinkEnd}
        >
          <Button animation={{ animate, show, duration }} stableTime noText>
            <div>
              <img
                src="https://avatars.githubusercontent.com/u/47667315?v=4"
                alt="aakash"
                style={{ height: "270px" }}
              />
            </div>
          </Button>
        </Link>
      </div>
    );
  }
}

export { Component };
