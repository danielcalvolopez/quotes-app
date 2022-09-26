import { useEffect } from "react";

import useHttp from "../../hooks/useHttp";
import useInput from "../../hooks/useInput";
import { addComment } from "../../lib/api";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const {
    value: enteredText,
    isValid: textIsValid,
    hasError: textHasError,
    valueChangeHandler: textChangeHandler,
    inputBlurHandler: textBlurHandler,
    reset: resetText,
  } = useInput((value) => value.trim() !== "");

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!textIsValid) {
      return;
    }

    sendRequest({ commentData: { text: enteredText }, quoteId: props.quoteId });
    resetText();
  };

  const textInputClasses = textHasError
    ? `${classes["control-invalid"]}`
    : `${classes.control}`;

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={textInputClasses} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea
          value={enteredText}
          id="comment"
          rows="5"
          onChange={textChangeHandler}
          onBlur={textBlurHandler}
        ></textarea>
        {textHasError && (
          <p className={classes["error-text"]}>Please enter a comment.</p>
        )}
      </div>
      <div className={classes.actions}>
        <button disabled={!textIsValid} className="btn">
          Add Comment
        </button>
      </div>
    </form>
  );
};

export default NewCommentForm;
