import React from "react";
import cls from "./Content.module.css";

function Content({ content }) {
  const renderContent = content.map((item) => {
    if (!item || !item.props) return null;

    const styles = {
      width: item.props.width,
      height: item.props.height,
    };

    if (item.type === "panel" && item.props.visible) {
      return (
        <div className={cls.content__panel} style={styles} key={item.type}>
          {item.content && item.content.length ? (
            <Content content={item.content} />
          ) : null}
        </div>
      );
    }
    if (item.type === "label" && item.props.visible) {
      return (
        <span className={cls.content__label} key={item.type}>
          {item.props.caption}
        </span>
      );
    }
    if (item.type === "button" && item.props.visible) {
      return (
        <button className={cls.content__button} style={styles} key={item.type}>
          {item.props.caption}
        </button>
      );
    }
  });
  return <div className={cls.content__wrapper}>{renderContent}</div>;
}

export default Content;
