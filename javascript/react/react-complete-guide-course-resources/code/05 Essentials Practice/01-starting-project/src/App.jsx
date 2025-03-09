import { Header } from "./Header";
import { InputForm } from "./InputForm";
import { useState, useMemo } from "react";
import { calculateInvestmentResults } from "./util/investment";
import { ResultTable } from "./ResultTable";
import PropTypes from "prop-types";

const FIELD_NAMES = {
  INITIAL_INVESTMENT: "Initial investment",
  ANNUAL_INVESTMENT: "Annual Investment",
  EXPECTED_RETURN: "Expected Return",
  DURATION: "Duration (years)",
  Test: "Test (years)",
};

const { INITIAL_INVESTMENT, ANNUAL_INVESTMENT, EXPECTED_RETURN, DURATION } =
  FIELD_NAMES;

function App() {
  const inputFields = Object.keys(FIELD_NAMES).reduce((acc, key) => {
    acc[FIELD_NAMES[key]] = 0;
    return acc;
  }, {});
  const [fields, setFields] = useState(inputFields);

  const calculationResults = useMemo(
    () =>
      calculateInvestmentResults({
        initialInvestment: fields[INITIAL_INVESTMENT],
        annualInvestment: fields[ANNUAL_INVESTMENT],
        expectedReturn: fields[EXPECTED_RETURN],
        duration: fields[DURATION],
      }),
    [fields]
  );

  console.log(fields);
  console.log(calculationResults);

  function updateFieldValue(name, value) {
    setFields((prevFields) => ({
      ...prevFields,
      [name]: parseFloat(value)
    }));
  }

  return (
    <>
      <Header />
      <InputForm fields={fields} fieldUpdateHandler={updateFieldValue} />
      {calculationResults.length > 0 && <ResultTable
        results={calculationResults}
        initialInvestment={fields[INITIAL_INVESTMENT]}
      />}
    </>
  );
}

App.propTypes = {
  fields: PropTypes.object,
  fieldUpdateHandler: PropTypes.func,
  results: PropTypes.array,
  initialInvestment: PropTypes.number,
};

export default App;
