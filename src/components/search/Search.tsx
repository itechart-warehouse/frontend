import * as React from "react";
import {Field, Form, Formik} from "formik";
import SearchIcon from "@mui/icons-material/Search";
import { SearchPanel, SearchProps } from "./search_types";
import { IconButton, TextField } from "@mui/material";

const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const { handleSubmit } = props;

    const normalize = (text: any) => {
        handleSubmit(text.text.replace('\t', ' '));
    };

  return (
    <SearchPanel>
      <Formik initialValues={{ text: '' }} onSubmit={normalize}>
        <Form
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Field
            required={false}
            autoComplete="off"
            as={TextField}
            label="Search..."
            name="text"
            fullWidth
            type="text"
            variant="standard"
          />
          <IconButton
            size="large"
            aria-label="search"
            type="submit"
            color="primary"
          >
            <SearchIcon />
          </IconButton>
        </Form>
      </Formik>
    </SearchPanel>
  );
};

export default Search;
