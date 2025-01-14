import React, { useCallback } from 'react';
import { StandardEditorProps } from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';
import { CodeEditor, CodeEditorSuggestionItem, CodeEditorSuggestionItemKind } from '@grafana/ui';
import { CodeEditorHeight, CodeEditorSuggestions, CodeLanguage, TestIds } from '../../constants';

/**
 * Monaco
 */
import type * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';

/**
 * Properties
 */
interface Props extends StandardEditorProps<string, any, any> {}

/**
 * Custom Code Editor
 */
export const CustomCodeEditor: React.FC<Props> = ({ value, item, onChange }) => {
  /**
   * Language
   */
  const language = item.settings?.language || CodeLanguage.JAVASCRIPT;

  /**
   * Template Service to get Variables
   */
  const templateSrv = getTemplateSrv();

  /**
   * Format On Mount
   */
  const onEditorMount = (editor: monacoType.editor.IStandaloneCodeEditor) => {
    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run();
    }, 100);
  };

  /**
   * Suggestions
   *
   * Will skip adding suggestions if settings are not defined to avoid duplicates
   */
  const getSuggestions = useCallback((): CodeEditorSuggestionItem[] => {
    if (!item.settings?.suggestions) {
      return [];
    }

    /**
     * Add Variables
     */
    const suggestions = templateSrv.getVariables().map((variable) => {
      return {
        label: `\$\{${variable.name}\}`,
        kind: CodeEditorSuggestionItemKind.Property,
        detail: variable.description ? variable.description : variable.label,
      };
    });

    return [...CodeEditorSuggestions, ...suggestions];
  }, [templateSrv, item.settings?.suggestions]);

  /**
   * Return
   */
  return (
    <div data-testid={TestIds.customCodeEditor.root}>
      <CodeEditor
        language={language}
        showLineNumbers={true}
        showMiniMap={(value && value.length) > 100}
        value={value}
        height={`${CodeEditorHeight}px`}
        onBlur={onChange}
        onSave={onChange}
        monacoOptions={{ formatOnPaste: true, formatOnType: true }}
        onEditorDidMount={onEditorMount}
        getSuggestions={getSuggestions}
      />
    </div>
  );
};
