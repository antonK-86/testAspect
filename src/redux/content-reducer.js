const initialState = {
  content: [
    {
      type: "panel",
      props: {
        width: 500,
        height: 200,
        visible: true,
      },
      content: [
        {
          type: "panel",
          props: {
            width: 200,
            height: 100,
            visible: true,
          },
        },
        {
          type: "button",
          props: {
            caption: "button",
            width: 100,
            height: 50,
            visible: true,
          },
        },
      ],
    },
    {
      type: "label",
      props: {
        caption: "test",
        visible: true,
      },
    },
    {
      type: "button",
      props: {
        caption: "button",
        width: 100,
        height: 50,
        visible: true,
      },
    },
  ],
  source: "",
  newValue: '',
  error: false,
};

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD-SOURCE":
      return {
        ...state,
        source: action.payload,
      };
    case "SET-NEW-VALUE":
      return {
        ...state,
        newValue: action.payload,
      };
    case "ADD-NEW-ELEM-TO-CONTENT":
      return {
        ...state,
        content: [...action.payload],
      };
    case "THROW-ERROR":
      return {
        ...state,
        error: action.err,
      };
    default:
      return state;
  }
};

export default contentReducer;

// action creators для изменения state
export const addSource = (payload) => ({
  type: "ADD-SOURCE",
  payload,
});

export const setNewValue = (payload) => ({
  type: "SET-NEW-VALUE",
  payload,
});

export const addContent = (payload) => ({
  type: "ADD-NEW-ELEM-TO-CONTENT",
  payload,
});

export const showError = (err) => ({
  type: "THROW-ERROR",
  err,
});


