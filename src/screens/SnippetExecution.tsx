import { Box, Typography, Chip, Autocomplete, TextField } from "@mui/material";
import { highlight, languages } from "prismjs";
import Editor from "react-simple-code-editor";
import { Bòx } from "../components/snippet-table/SnippetBox.tsx";
import { useState } from "react";

type SnippetExecutionProps = {
  executionOutput?: string[];
  onInputsChange?: (inputs: string[]) => void;
  isRunning?: boolean;
}

export const SnippetExecution = ({ executionOutput = [], onInputsChange, isRunning = false }: SnippetExecutionProps) => {
  const [inputs, setInputs] = useState<string[]>([]);

  return (
    <>
      <Box mb={2}>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          Output:
        </Typography>
        <Bòx flex={1} overflow={"auto"} minHeight={200} bgcolor={'black'} color={'white'} code={executionOutput.join('\n')} data-testid="execution-output">
          <Editor
            value={executionOutput.join('\n')}
            padding={10}
            onValueChange={() => { }} // Read-only
            highlight={(code) => highlight(code, languages.js, 'javascript')}
            readOnly
            style={{
              fontFamily: "monospace",
              fontSize: 17,
            }}
          />
        </Bòx>
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          Input:
        </Typography>
        <Autocomplete
          multiple
          size="small"
          id="snippet-execution-input"
          freeSolo
          value={inputs}
          onChange={(_, value) => {
            setInputs(value);
            if (onInputsChange) {
              onInputsChange(value);
            }
          }}
          disabled={isRunning}
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={inputs.length === 0 ? "Type input and press Enter" : ""}
            />
          )}
          options={[]}
        />
      </Box>
    </>
  )
}