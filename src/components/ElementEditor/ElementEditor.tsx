import React, { ChangeEvent } from 'react';
import { SelectableValue } from '@grafana/data';
import {
  CodeEditor,
  Field,
  InlineField,
  InlineFieldRow,
  Input,
  RadioButtonGroup,
  Select,
  useStyles2,
} from '@grafana/ui';
import {
  CodeEditorHeight,
  CodeLanguage,
  CodeLanguageOptions,
  FormElementType,
  FormElementTypeOptions,
  RequestMethod,
  StringElementOptions,
  TestIds,
} from '../../constants';
import { LocalFormElement, QueryField } from '../../types';
import { FormatNumberValue, GetElementWithNewType, ToNumberValue } from '../../utils';
import { ElementDateEditor } from '../ElementDateEditor';
import { ElementOptionsEditor } from '../ElementOptionsEditor';
import { Styles } from './ElementEditor.styles';

/**
 * Properties
 */
interface Props {
  /**
   * Element
   */
  element: LocalFormElement;

  /**
   * On Change
   */
  onChange: (element: LocalFormElement, checkConflict?: boolean) => void;

  /**
   * On Change Option
   */
  onChangeOption: (
    element: LocalFormElement,
    updatedOption: SelectableValue,
    value?: SelectableValue,
    checkConflict?: boolean
  ) => boolean;

  /**
   * Layout Section Options
   */
  layoutSectionOptions: SelectableValue[];

  /**
   * Initial Request Method
   */
  initialMethod?: RequestMethod;

  /**
   * Query Fields
   */
  queryFields: QueryField[];

  /**
   * Is Query Fields Enabled
   */
  isQueryFieldsEnabled: boolean;
}

/**
 * Element Editor
 */
export const ElementEditor: React.FC<Props> = ({
  element,
  onChange,
  onChangeOption,
  layoutSectionOptions,
  initialMethod,
  isQueryFieldsEnabled,
  queryFields,
}) => {
  /**
   * Styles
   */
  const styles = useStyles2(Styles);

  /**
   * Return
   */
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Id" grow labelWidth={8} invalid={element.id === ''}>
          <Input
            placeholder="Id"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onChange(
                {
                  ...element,
                  id: event.target.value,
                },
                true
              );
            }}
            value={element.id}
            data-testid={TestIds.formElementsEditor.fieldId}
          />
        </InlineField>

        {element.type === FormElementType.STRING && (
          <InlineField data-testid={TestIds.formElementsEditor.fieldVisibility}>
            <RadioButtonGroup
              options={StringElementOptions}
              value={!!element.hidden}
              onChange={(value) => {
                onChange({
                  ...element,
                  hidden: value,
                });
              }}
            />
          </InlineField>
        )}
      </InlineFieldRow>

      <InlineFieldRow>
        <InlineField label="Type" grow labelWidth={8}>
          <Select
            options={FormElementTypeOptions}
            onChange={(event: SelectableValue) => {
              onChange(GetElementWithNewType(element, event?.value), true);
            }}
            value={FormElementTypeOptions.find((type) => type.value === element.type)}
            aria-label={TestIds.formElementsEditor.fieldType}
          />
        </InlineField>

        <InlineField
          label="Width"
          labelWidth={12}
          tooltip="Element will grow to max length if not specified. Some elements does not support adjusting width."
        >
          <Input
            placeholder="auto"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onChange({
                ...element,
                width: ToNumberValue(event.target.value),
              });
            }}
            value={FormatNumberValue(element.width)}
            min={0}
            type="number"
            data-testid={TestIds.formElementsEditor.fieldWidth}
          />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField label="Label" grow labelWidth={8} invalid={element.title === ''}>
          <Input
            placeholder="Label"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onChange({
                ...element,
                title: event.target.value,
              });
            }}
            value={element.title}
            data-testid={TestIds.formElementsEditor.fieldLabel}
          />
        </InlineField>

        <InlineField label="Label Width" labelWidth={12}>
          <Input
            placeholder="auto"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onChange({
                ...element,
                labelWidth: ToNumberValue(event.target.value),
              });
            }}
            value={FormatNumberValue(element.labelWidth)}
            type="number"
            data-testid={TestIds.formElementsEditor.fieldLabelWidth}
          />
        </InlineField>
      </InlineFieldRow>

      <InlineFieldRow>
        <InlineField label="Tooltip" grow labelWidth={8}>
          <Input
            placeholder="Tooltip"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onChange({
                ...element,
                tooltip: event.target.value,
              });
            }}
            value={element.tooltip}
            data-testid={TestIds.formElementsEditor.fieldTooltip}
          />
        </InlineField>

        <InlineField label="Unit" labelWidth={12}>
          <Input
            placeholder="Unit"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onChange({
                ...element,
                unit: event.target.value,
              });
            }}
            value={element.unit}
            data-testid={TestIds.formElementsEditor.fieldUnit}
          />
        </InlineField>
      </InlineFieldRow>

      {layoutSectionOptions.length > 0 && (
        <InlineFieldRow>
          <InlineField label="Section" grow labelWidth={8}>
            <Select
              options={layoutSectionOptions}
              onChange={(event: SelectableValue) => {
                onChange({
                  ...element,
                  section: event?.value,
                });
              }}
              value={layoutSectionOptions.find((section) => section.value === element.section)}
              aria-label={TestIds.formElementsEditor.fieldSection}
            />
          </InlineField>
        </InlineFieldRow>
      )}

      {element.type === FormElementType.SLIDER && (
        <InlineFieldRow>
          <InlineField label="Min" labelWidth={8}>
            <Input
              placeholder="Min"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange({
                  ...element,
                  min: Number(event.target.value),
                });
              }}
              type="number"
              width={10}
              value={element.min}
              data-testid={TestIds.formElementsEditor.fieldSliderMin}
            />
          </InlineField>
          <InlineField label="Max" labelWidth={8}>
            <Input
              placeholder="Max"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange({
                  ...element,
                  max: Number(event.target.value),
                });
              }}
              type="number"
              width={10}
              value={element.max}
              data-testid={TestIds.formElementsEditor.fieldSliderMax}
            />
          </InlineField>
          <InlineField label="Step" labelWidth={8}>
            <Input
              placeholder="Step"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange({
                  ...element,
                  step: Number(event.target.value),
                });
              }}
              type="number"
              width={10}
              value={element.step}
              data-testid={TestIds.formElementsEditor.fieldSliderStep}
            />
          </InlineField>
        </InlineFieldRow>
      )}

      {element.type === FormElementType.NUMBER && (
        <InlineFieldRow>
          <InlineField label="Min" labelWidth={8}>
            <Input
              placeholder="Min"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange({
                  ...element,
                  min: ToNumberValue(event.target.value),
                });
              }}
              type="number"
              width={10}
              value={FormatNumberValue(element.min)}
              data-testid={TestIds.formElementsEditor.fieldNumberMin}
            />
          </InlineField>
          <InlineField label="Max" labelWidth={8}>
            <Input
              placeholder="Max"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange({
                  ...element,
                  max: ToNumberValue(event.target.value),
                });
              }}
              type="number"
              width={10}
              value={FormatNumberValue(element.max)}
              data-testid={TestIds.formElementsEditor.fieldNumberMax}
            />
          </InlineField>
        </InlineFieldRow>
      )}

      {element.type === FormElementType.DATETIME && (
        <>
          <ElementDateEditor
            label="Min"
            onChange={(value) =>
              onChange({
                ...element,
                min: value,
              })
            }
            value={element.min}
            data-testid={TestIds.formElementsEditor.fieldMinDate}
          />
          <ElementDateEditor
            label="Max"
            onChange={(value) =>
              onChange({
                ...element,
                max: value,
              })
            }
            value={element.max}
            data-testid={TestIds.formElementsEditor.fieldMaxDate}
          />
        </>
      )}

      {(element.type === FormElementType.TEXTAREA || element.type === FormElementType.DISABLED_TEXTAREA) && (
        <InlineFieldRow>
          <InlineField label="Rows" labelWidth={8}>
            <Input
              placeholder="Rows"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange({
                  ...element,
                  rows: Number(event.target.value),
                });
              }}
              type="number"
              width={10}
              value={element.rows}
              min={2}
              data-testid={TestIds.formElementsEditor.fieldTextareaRows}
            />
          </InlineField>
        </InlineFieldRow>
      )}

      {element.type === FormElementType.CODE && (
        <InlineFieldRow>
          <InlineField label="Language" grow labelWidth={10}>
            <Select
              options={CodeLanguageOptions}
              onChange={(event: SelectableValue) => {
                onChange({
                  ...element,
                  language: event?.value,
                });
              }}
              value={CodeLanguageOptions.find((language) => language.value === element.language)}
              aria-label={TestIds.formElementsEditor.fieldCodeLanguage}
            />
          </InlineField>
          <InlineField label="Height" labelWidth={12} tooltip="Code Editor height in px">
            <Input
              placeholder="Height"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange({
                  ...element,
                  height: Number(event.target.value),
                });
              }}
              type="number"
              value={element.height}
              min={0}
              data-testid={TestIds.formElementsEditor.fieldCodeHeight}
            />
          </InlineField>
        </InlineFieldRow>
      )}

      {initialMethod === RequestMethod.DATASOURCE && (
        <InlineFieldRow>
          <InlineField
            grow={true}
            label="Field Name"
            labelWidth={14}
            tooltip="Specify a field name from the Data Source response"
          >
            <Input
              value={element.fieldName || ''}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange({
                  ...element,
                  fieldName: event.target.value,
                });
              }}
              data-testid={TestIds.formElementsEditor.fieldNamePicker}
            />
          </InlineField>
        </InlineFieldRow>
      )}
      {isQueryFieldsEnabled && (
        <InlineFieldRow>
          <InlineField grow={true} label="Query Field" labelWidth={14} tooltip="Specify a field name from the Query">
            <Select
              value={element.queryField?.value}
              options={queryFields}
              onChange={(item) => {
                onChange({
                  ...element,
                  queryField: item,
                });
              }}
              aria-label={TestIds.formElementsEditor.fieldFromQueryPicker}
              isClearable={true}
            />
          </InlineField>
        </InlineFieldRow>
      )}

      {element.type === FormElementType.FILE && (
        <InlineFieldRow>
          <InlineField
            grow={true}
            label="Accept"
            labelWidth={14}
            tooltip="Specify comma-separated file extensions or keep blank to allow any file"
          >
            <Input
              value={element.accept || ''}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange({
                  ...element,
                  accept: event.target.value,
                });
              }}
              data-testid={TestIds.formElementsEditor.fieldAccept}
            />
          </InlineField>
        </InlineFieldRow>
      )}

      {(element.type === FormElementType.RADIO ||
        element.type === FormElementType.SELECT ||
        element.type === FormElementType.MULTISELECT ||
        element.type === FormElementType.DISABLED) && (
        <div className={styles.optionsContainer} data-testid={TestIds.formElementsEditor.options}>
          <ElementOptionsEditor
            options={element.options}
            onChange={(options) =>
              onChange({
                ...element,
                options,
              })
            }
            onChangeItem={(updated, original, checkConflict) => {
              return onChangeOption(element, updated, original, checkConflict);
            }}
          />
        </div>
      )}

      <Field label="Show if returned value is true">
        <CodeEditor
          value={element.showIf || ''}
          language={CodeLanguage.JAVASCRIPT}
          height={`${CodeEditorHeight}px`}
          onBlur={(code) => {
            onChange({
              ...element,
              showIf: code,
            });
          }}
          monacoOptions={{ formatOnPaste: true, formatOnType: true }}
          showLineNumbers={true}
          aria-label={TestIds.formElementsEditor.fieldShowIf}
        />
      </Field>
    </>
  );
};
