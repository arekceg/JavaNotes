import { formatter } from "./util/investment";

const headers = [
  "Year",
  "Investment Value",
  "Interest (Year)",
  "Total Interest",
  "Invested Capital",
];

export function ResultTable({ results, initialInvestment: investedCapital }) {
  let totalInterest = 0;
  return (
    <table id="result">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {results.map(({ year, valueEndOfYear, interest }) => {
          totalInterest += interest;
          return (
            <tr key={year}>
              <td>{year}</td>
              <FormattedCurrencyRow>{valueEndOfYear}</FormattedCurrencyRow>
              <FormattedCurrencyRow>{interest}</FormattedCurrencyRow>
              <FormattedCurrencyRow>{totalInterest}</FormattedCurrencyRow>
              <FormattedCurrencyRow>{investedCapital}</FormattedCurrencyRow>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function FormattedCurrencyRow({ children }) {
  return <td>{formatter.format(children)}</td>;
}
