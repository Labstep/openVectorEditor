import React from "react";

import { reduxForm } from "redux-form";
import { startCase } from "lodash";
import { withProps } from "recompose";
import { InputField, withDialog } from "teselagen-react-components";
import { compose } from "redux";
import { Button, Intent, Classes } from "@blueprintjs/core";
import classNames from "classnames";
import "./simpleDialog.css";

// TODO: move to TRC
export class SimpleGenericDialogForm extends React.Component {
  render() {
    const {
      hideModal,
      handleSubmit,
      fields,
      buttonText = "OK",
      showCancel = true,
      onSubmit,
      invalid,
      extraProps = {}
    } = this.props;
    return (
      <div
        className={classNames(
          Classes.DIALOG_BODY,
          "tg-min-width-dialog simple-dialog"
        )}
      >
        {fields.map((field, i) => {
          const { component, isRequired, ...props } = field;
          const FieldComp = component || InputField;
          const fieldProps = {
            autoFocus: i === 0,
            ...props,
            ...extraProps[props.name]
          };
          fieldProps.label =
            fieldProps.label || startCase(fieldProps.name) + ":";
          if (isRequired) fieldProps.validate = required;
          return <FieldComp key={field.name} {...fieldProps} />;
        })}
        <div className="dialog-buttons">
          {showCancel && <Button onClick={hideModal} text="Cancel" />}
          <Button
            onClick={handleSubmit(data => {
              if (onSubmit) onSubmit(data);
              hideModal();
            })}
            intent={Intent.PRIMARY}
            text={buttonText}
            disabled={invalid}
          />
        </div>
      </div>
    );
  }
}

function required(val) {
  if (!val) return "Required";
}

export default function createSimpleDialog(props) {
  return compose(
    withDialog({
      isDraggable: true,
      width: 400,
      ...props.dialogProps
    }),
    reduxForm({
      form: props.formName
    }),
    withProps(props)
  )(SimpleGenericDialogForm);
}