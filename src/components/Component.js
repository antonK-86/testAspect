import React from "react";
import cls from "./Component.module.css";
import {
  contentSelector,
  sourceSelector,
  newValueSelector,
  errorSelector,
} from "../redux/selectors";
import {
  addSource,
  setNewValue,
  addContent,
  showError,
} from "../redux/content-reducer";
import { connect } from "react-redux";
import Content from "./Content";

const Component = ({
  content,
  source,
  newValue,
  error,
  addSource,
  setNewValue,
  addContent,
  showError,
}) => {
  //обработчик пути
  const handlerChangeRoute = (event) => {
    addSource(event.target.value);
  };

  //обработчик нового значения
  const handlerChangeValue = (event) => {
    setNewValue(event.target.value);
  };

  // {type: "label",props: {caption: "testing", visible: true, },}

  //обработчик кнопки применить
  const apply = () => {
    try {
      let val;

      // проверить новое значение на обьект
      if (newValue[0] === "{" && newValue[newValue.length - 1] === "}") {
        val = eval("(" + newValue + ")");
      }
      

      if (typeof eval(source) == "number") val = +newValue;
      if (typeof eval(source) == "boolean") val = Boolean(eval(newValue));
      if (typeof eval(source) == "string") val = newValue;

      const arrName = source.split(".").slice(0, 1).join();
      const elemName = source.split(".").slice(1).join(".");
      const arrContent = content.map((item) => {

        if (item === eval(arrName) && elemName) {
          eval("item." + elemName + "=val");
          return item;
        }

        if (item === eval(arrName) && !elemName) {
          eval("item = val");
          return item;
        } else return item;
      });

      if (eval(arrName) === undefined) {
        arrContent.push(eval("(" + newValue + ")"))
        }
      
      addContent(arrContent);
    } catch {
      showError(true);
    }
  };

  return (
    <div className={cls.component}>
      <header className={cls.header}>
        <div className={cls.header__item}>
          <label htmlFor="route">Путь</label>
          <input
            type="text"
            id="route"
            value={source}
            onChange={handlerChangeRoute}
          />
        </div>
        <div className={cls.header__item}>
          <label htmlFor="newValue">Новое значение</label>
          <input
            type="text"
            id="newValue"
            value={newValue}
            onChange={handlerChangeValue}
          />
        </div>
        <button onClick={apply}>Применить</button>
        {error ? <span className={cls.error}>Ошибка ввода поля "Путь" или поля "Новое значение"</span> : null}
      </header>
      <div className={cls.content}>
        <Content content={content} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  content: contentSelector(state),
  source: sourceSelector(state),
  newValue: newValueSelector(state),
  error: errorSelector(state),
});

export default connect(mapStateToProps, {
  addSource,
  setNewValue,
  addContent,
  showError,
})(Component);
