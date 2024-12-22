import { Button, Form, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";

const CommonSearchBar = ({ searchInputValue, setSearchInputValue, handleSubmit, isSearchButtonDisabled, startDate, handleDateChange }) => {
    return (
        <div className="is-resposive-part py-sm-3 py-md-0">
            <Form className=" search-form flex-grow-1 " onSubmit={handleSubmit}>
                <FormControl
                    type="text"
                    value={searchInputValue}
                    onChange={(e) => setSearchInputValue(e.target.value)}
                    placeholder="Explore news..."
                    className="form-input color-white form-control-lg mt-lg-2 mt-md-2 mt-sm-2 mt-xl-0"
                />
                <Button
                    onClick={handleSubmit}
                    className="search-btn"
                    disabled={isSearchButtonDisabled}
                >
                    Search
                </Button>
            </Form>
            <div className="date-picker">
                <DatePicker selected={startDate} onChange={handleDateChange} />
            </div>
        </div>
    );
};

export default CommonSearchBar