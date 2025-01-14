import { InterpolateFunction, SelectableValue } from '@grafana/data';
import { CodeLanguage, FormElementType } from '../constants';

export type QueryField = SelectableValue<string> & {
  refId?: string;
};

/**
 * Form Element Base
 */
export interface FormElementBase {
  /**
   * Uid
   *
   * @type {string}
   */
  uid: string;

  /**
   * Id
   *
   * @type {string}
   */
  id: string;

  /**
   * Title
   *
   * @type {string}
   */
  title: string;

  /**
   * Type
   *
   * @type {FormElementType}
   */
  type: FormElementType;

  /**
   * Label Width
   *
   * @type {number | null}
   */
  labelWidth: number | null;

  /**
   * Width
   *
   * @type {number | null}
   */
  width: number | null;

  /**
   * Tooltip
   *
   * @type {string}
   */
  tooltip: string;

  /**
   * Section's Name
   *
   * @type {string}
   */
  section: string;

  /**
   * Unit
   *
   * @type {string}
   */
  unit: string;

  /**
   * Value
   *
   * @type {any}
   */
  value?: any;

  /**
   * Show If
   *
   * @type {string}
   */
  showIf?: string;

  /**
   * Field Name
   */
  fieldName?: string;

  /**
   * Query Field
   */
  queryField?: QueryField;
}

/**
 * String Options
 */
export interface StringOptions {
  /**
   * Hidden
   *
   * @type {boolean}
   */
  hidden: boolean;

  /**
   * Value
   *
   * @type {string}
   */
  value: string;
}

/**
 * Code Options
 */
export interface CodeOptions {
  /**
   * Height
   *
   * @type {number}
   */
  height: number;

  /**
   * Language
   *
   * @type {CodeLanguage}
   */
  language: CodeLanguage;
}

/**
 * Slider Options
 */
export interface SliderOptions {
  /**
   * Maximum Value
   *
   * @type {number}
   */
  max: number;

  /**
   * Minimum Value
   *
   * @type {number}
   */
  min: number;

  /**
   * Step
   *
   * @type {number}
   */
  step: number;

  /**
   * Value
   *
   * @type {number}
   */
  value: number;
}

/**
 * Number Options
 */
export interface NumberOptions {
  /**
   * Maximum Value
   *
   * @type {number | null}
   */
  max: number | null;

  /**
   * Minimum Value
   *
   * @type {number}
   */
  min: number | null;

  /**
   * Value
   *
   * @type {number | null}
   */
  value: number | null;
}

/**
 * Textarea Options
 */
export interface TextareaOptions {
  /**
   * Rows
   *
   * @type {number}
   */
  rows: number;
}

/**
 * Select Options
 */
export interface SelectOptions {
  /**
   * Options
   *
   * @type {SelectableValue[]}
   */
  options?: SelectableValue[];
}

/**
 * Date Time Options
 */
export interface DateTimeOptions {
  /**
   * Min Date
   *
   * @type {string}
   */
  min?: string;

  /**
   * Max Date
   *
   * @type {string}
   */
  max?: string;

  /**
   * Value
   *
   * @type {string}
   */
  value: string;
}

/**
 * File Options
 */
export interface FileOptions {
  /**
   * Value
   *
   * @type {File[] | null}
   */
  value: File[] | null;

  /**
   * Accept
   */
  accept: string;
}

/**
 * Form Element
 */
export type FormElement = FormElementBase &
  (
    | ({ type: FormElementType.STRING } & StringOptions)
    | ({ type: FormElementType.CODE } & CodeOptions)
    | ({ type: FormElementType.SLIDER } & SliderOptions)
    | ({ type: FormElementType.NUMBER } & NumberOptions)
    | ({ type: FormElementType.TEXTAREA } & TextareaOptions)
    | ({ type: FormElementType.SELECT } & SelectOptions)
    | ({ type: FormElementType.MULTISELECT } & SelectOptions)
    | ({ type: FormElementType.RADIO } & SelectOptions)
    | ({ type: FormElementType.DISABLED } & SelectOptions)
    | ({ type: FormElementType.DISABLED_TEXTAREA } & TextareaOptions)
    | { type: FormElementType.PASSWORD }
    | ({ type: FormElementType.DATETIME } & DateTimeOptions)
    | { type: FormElementType.SECRET }
    | { type: FormElementType.BOOLEAN }
    | ({ type: FormElementType.FILE } & FileOptions)
  );

/**
 * Show If Helper
 */
export type ShowIfHelper = (params: {
  elements: FormElement[];
  replaceVariables: InterpolateFunction;
}) => boolean | undefined;

/**
 * Local Form Element
 */
export type LocalFormElement = FormElement & {
  /**
   * Helpers
   */
  helpers: {
    /**
     * Show If Function
     *
     * @type {ShowIfHelper}
     */
    showIf: ShowIfHelper;
  };
};

/**
 * FormElementByType
 */
export type FormElementByType<ElementType, Type> = Extract<ElementType, { type: Type }>;
