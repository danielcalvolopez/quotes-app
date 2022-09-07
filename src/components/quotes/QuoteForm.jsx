import { useState } from "react";
import { Prompt } from "react-router-dom";
import useInput from "../../hooks/useInput";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const {
    value: enteredAuthor,
    isValid: authorIsValid,
    hasError: authorHasError,
    valueChangeHandler: authorChangeHandler,
    inputBlurHandler: authorBlurHandler,
    reset: resetAuthor,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredText,
    isValid: textIsValid,
    hasError: textHasError,
    valueChangeHandler: textChangeHandler,
    inputBlurHandler: textBlurHandler,
    reset: resetText,
  } = useInput((value) => value.trim() !== "");

  const [isEntering, setIsEntering] = useState(false);

  let formIsValid = false;

  if (authorIsValid && textIsValid) {
    formIsValid = true;
  }

  function submitFormHandler(event) {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetAuthor();
    resetText();
    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  const textInputClasses = textHasError
    ? `${classes["control-invalid"]}`
    : `${classes.control}`;

  const authorInputClasses = authorHasError
    ? `${classes["control-invalid"]}`
    : `${classes.control}`;

  return (
    <>
      <Prompt
        when={isEntering}
        message={(location) =>
          "Are you sure you want to leave? All your entered data will be lost!"
        }
      />
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={authorInputClasses}>
            <label htmlFor="author">Author</label>
            <input
              onChange={authorChangeHandler}
              onBlur={authorBlurHandler}
              value={enteredAuthor}
              type="text"
              id="author"
            />
            {authorHasError && (
              <p className={classes["error-text"]}>Please enter an author.</p>
            )}
          </div>
          <div className={textInputClasses}>
            <label htmlFor="text">Text</label>
            <textarea
              onChange={textChangeHandler}
              onBlur={textBlurHandler}
              value={enteredText}
              id="text"
              rows="5"
            ></textarea>
            {textHasError && (
              <p className={classes["error-text"]}>Please enter a text.</p>
            )}
          </div>
          <div className={classes.actions}>
            <button
              disabled={!formIsValid}
              onClick={finishEnteringHandler}
              className="btn"
            >
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
