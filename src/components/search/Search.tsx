import * as React from 'react';
import { Form, Formik ,Field } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import {SearchPanel, SearchProps} from "./search_types";
import { IconButton } from '@mui/material';



const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const { handleSubmit } = props;

  return (
    <SearchPanel>
      <Formik
        initialValues={{ text: '' }}
        onSubmit={handleSubmit}
      >
        <Form style={{ display: 'flex', alignItems: 'center', padding: '0 0 0 15px' }}>
          <Field
              required={false}
              autoComplete="off"
              label="Search..."
              name="text"
              fullWidth
              color="success"
              type="text"
              variant="standard"
          />
          <IconButton size="large" aria-label="search" type="submit">
            <SearchIcon />
          </IconButton>
        </Form>
      </Formik>
    </SearchPanel>
  );
};

export default Search;
