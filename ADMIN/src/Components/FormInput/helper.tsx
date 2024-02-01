import { InputText } from './InputText'
import InputDate from './InputDate/InputDate'
import InputCheckbox from './InputCheckbox/InputCheckbox'
import InputSelect from './InputSelect/InputSelect'
import InputRadio from './InputRadio/InputRadio'
import { InputNumber } from './InputNumber'

export const typeInputComponent = {
  InputText: 'input-text',
  InputNumber: 'input-number',
  InputCheckbox: 'Input-checkbox',
  InputSwitch: 'Input-switch',
  InputRadio: 'Input-radio',
  InputSelect: 'Input-select',
  InputTextArea: 'Input-textArea',
  InputDate: 'Input-date',
  InputPriority: 'input-priority',
  InputDob: 'Input-dob'
}

export const InputComponent = {
  [typeInputComponent.InputText]: {
    Component: InputText,
    onChange: 'onChangeValue',
    onBlurInputText: 'onBlurInputText',
    value: 'valueText',
    onBlur: 'onBlur',
    label: 'label'
  },
  [typeInputComponent.InputNumber]: {
    Component: InputNumber,
    onChange: 'onChangeValue',
    onBlurInputNumber: 'onBlurInputNumber',
    value: 'valueText',
    onBlur: 'onBlur',
    label: 'label'
  },
  [typeInputComponent.InputRadio]: {
    Component: InputRadio,
    onChange: 'onChangeValue',
    value: 'value',
    options: 'options',
    isDisable: 'isDisable'
  },
  [typeInputComponent.InputCheckbox]: {
    Component: InputCheckbox,
    onChange: 'onChangeValue',
    value: 'value',
    options: 'options'
  },
  [typeInputComponent.InputSelect]: {
    Component: InputSelect,
    onChange: 'onChangeValue',
    value: 'value',
    options: 'options',
    minWidth: 'minWidth',
    placeholder: 'placeholder',
    bg: 'bg',
    boxWrap: 'boxWrap',
    selectWidth: 'selectWidth'
  },
  [typeInputComponent.InputDate]: {
    Component: InputDate,
    label: 'label',
    placeholder: 'placeholder',
    value: 'value',
    onChange: 'onChangeValue'
  }
}

export const typeTextInput = {
  text: 'text',
  password: 'password',
  moneyDecimal: 'moneyDecimal',
  date: 'date',
  decimal: 'decimal',
  trimMiddleText: 'trimMiddleText'
}
