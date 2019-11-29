// eslint-disable
import React, { useState, useCallback, Fragment } from "react";

// Form suggestion imports
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button"

import useSearch from '../hooks/search';
import useSocket from '../hooks/socket';

const getUrl = "http://127.0.0.1:4000"

const Search = ({ value, onChange, placeholder }) => {
    const [searchString, setSearchString] = useState("");
    const { data, isConnected }  = useSocket(getUrl, 'init', {})
    const { characterData, isData } = useSocket(getUrl, 'search', searchString);

    const handleInputSelecta = (e) => {
        console.log(e)
    }

    const handleInputSelect = useCallback(e => {
        console.log(e)
        if ((e.target.value.length > 0)) { // For Clearing Selected Input
            setSearchString(e.target.value)
            console.log('aaaa')
        }
        console.log(searchString)
    }, [searchString, setSearchString])

    const handleSubmit = useCallback(e => { 
        onChange({});
    }, [value.name])

    return (
        <Fragment>
            <Typeahead
                id="search-typehead"
                clearButton
                labelKey="name"
                multiple={false}
                options={data}
                placeholder={placeholder}
            />

            <Form inline>
                <Form.Text className="text" style={{ fontSize: '16px', color: "black" }}>
                    Enable comparison
    			</Form.Text>
                <FormControl
                    // checked={data}
                    onChange={ handleInputSelecta }
                    type="checkbox"
                    placeholder={placeholder}
                    className="mr-lg-2">
                </FormControl>

                <Button
                    onClick={handleSubmit}
                    variant="outline-success">Search</Button>
            </Form>
        </Fragment>
    );
};

export default Search;