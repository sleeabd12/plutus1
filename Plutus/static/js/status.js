var FormGroup = ReactBootstrap.FormGroup;
var ControlLabel = ReactBootstrap.ControlLabel;
var FormControl = ReactBootstrap.FormControl;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

class Form extends React.Component {
  state = {
    amount: 0
  };
  onClick = e => {
    e.preventDefault();
    this.props.onClick(this.state.amount);
  };
  render() {
    return (
      <form>
        <FieldGroup
          id="amount"
          type="text"
          label="Amount"
          placeholder="Enter Amount"
          onChange={event => this.setState({ amount: event.target.value })}
        />
        <Button type="submit" onClick={this.onClick}>
          Submit
        </Button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    records: {},
    date: moment(),
    selectedMonth: new Date().getMonth(),
    selectedYear: new Date().getFullYear(),
    isIncomeAdded: false,
    isExpenseAdded: false,
    value: new Date().toISOString()
  };
  dateChanged = d => {
    this.setState({
      date: d,
      selectedMonth: new Date(d).getMonth(),
      selectedYear: new Date(d).getFullYear()
    });
  };
  IncomeAdded = () => {
    this.setState({ isIncomeAdded: true });
  };
  cancelIncome = () => {
    this.setState({ isIncomeAdded: false });
  };
  ExpenseAdded = () => {
    this.setState({ isExpenseAdded: true });
  };
  cancelExpense = () => {
    this.setState({ isExpenseAdded: false });
  };
  givePropValue = (propName, objectName) => {
    return objectName.hasOwnProperty(propName) ? objectName[propName] : null;
  };
  updateState = (key, amount) => {
    const { selectedMonth, records, selectedYear } = this.state;

    let recordsCopy = { ...records };
    let newData = null;
    const recordsForSelectedYear = this.givePropValue(selectedYear, records);
    let newRecords = null;
    //selected Year Exists in State records
    if (recordsForSelectedYear != null) {
      const recordsForSelectedMonth = this.givePropValue(
        selectedMonth,
        recordsForSelectedYear
      );
      if (recordsForSelectedMonth != null) {
        //selected Month exists in state records
        const updatedValue = this.givePropValue(key, recordsForSelectedMonth);

        if (updatedValue != null) {
          // expense data exists
          newData = parseInt(updatedValue, 10) + parseInt(amount, 10);
        } else {
          // expense data does not exist
          newData = parseInt(amount, 10);
        }
        let newRecordsForSelectedMonth = null;
        //if (key == "expense")
          newRecordsForSelectedMonth = {
            ...recordsCopy[selectedYear][selectedMonth],
            [key]: newData
          };
        //else
          //newRecordsForSelectedMonth = {
            //...recordsCopy[selectedYear][selectedMonth],
            //income: newData
          //};
        recordsCopy[selectedYear][selectedMonth] = newRecordsForSelectedMonth;
        this.setState({ records: recordsCopy });
      } else {
        //selected Month does not exist
        //1. add month let updatedRecordsForSelectedYear
        let updatedRecordsForSelectedYear = null;
        //if (key == "expense")
          updatedRecordsForSelectedYear = {
            ...recordsForSelectedYear,
            [selectedMonth]: { [key]: parseInt(amount, 10) }
          };
        //else
          //updatedRecordsForSelectedYear = {
            //...recordsForSelectedYear,
            //[selectedMonth]: { income: parseInt(amount, 10) }
          //};
        newRecords = {
          ...recordsCopy,
          [selectedYear]: updatedRecordsForSelectedYear
        };
        this.setState({ records: newRecords });
        //2. add expense
      }
    } else {
      //selected Year does not exist in state records
      //if (key == "expense")
        newRecords = {
          ...recordsCopy,
          [selectedYear]: { [selectedMonth]: { [key]: parseInt(amount, 10) } }
        };
      //else
        //newRecords = {
          //...recordsCopy,
          //[selectedYear]: { [selectedMonth]: { income: parseInt(amount, 10) } }
        //};
      this.setState({ records: newRecords });
    }
  };
  addIncome = amount => {
    this.updateState("income", amount);
    this.cancelIncome();
  };
  addExpense = amount => {
    this.updateState("expense", amount);
    this.cancelExpense();
  };

  render() {
    const { records, selectedYear, selectedMonth } = this.state;
    let income,
      expense = null;
    if (
      records &&
      records[selectedYear] &&
      records[selectedYear][selectedMonth] &&
      records[selectedYear][selectedMonth].hasOwnProperty("income")
    )
      income = records[selectedYear][selectedMonth].income;
    if (
      records &&
      records[selectedYear] &&
      records[selectedYear][selectedMonth] &&
      records[selectedYear][selectedMonth].hasOwnProperty("expense")
    )
      expense = records[selectedYear][selectedMonth].expense;

    income = income == null || isNaN(income) ? 0 : income;
    expense = expense == null || isNaN(expense) ? 0 : expense;
    let statusClass = income - expense >= 0 ? "green" : "red";

    return (
      <div className="App">
        <header className="header">
          <h1 className="App-title">Your Budget Tracker</h1>
          <FormGroup controlId="date">
            <ControlLabel className="date">Select Date</ControlLabel>
            <DatePicker
              selected={this.state.date}
              onChange={this.dateChanged}
            />
          </FormGroup>
          <div
            id="status"
            style={{
              backgroundColor: statusClass,
              width: "100%",
              height: "10%",
              position: "absolute"
            }}
          />
        </header>
        <div className="main">
          <h3>Income</h3>
          <div>$ {income}</div>
        </div>
        <div className="main">
          <h3>Expense</h3>
          <div>$ {expense}</div>
        </div>
        <div className="separator" />
        <div className="main">
          <h3>Balance</h3>
          <div>$ {isNaN(income - expense) ? 0 : income - expense}</div>
        </div>
        <ButtonToolbar className="btnBar">
          <Button onClick={this.IncomeAdded} bsSize="large">
            +Income
          </Button>
          <Button onClick={this.ExpenseAdded} bsSize="large">
            +Expense
          </Button>
        </ButtonToolbar>
        <Modal show={this.state.isIncomeAdded} modalClosed={this.cancelIncome}>
          <Form onClick={this.addIncome} />
        </Modal>
        <Modal
          show={this.state.isExpenseAdded}
          modalClosed={this.cancelExpense}
        >
          <Form onClick={this.addExpense} />
        </Modal>
      </div>
    );
  }
}

const Modal = props => (
  <div>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className="Modal"
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    >
      {props.children}
    </div>
  </div>
);

const Backdrop = props =>
  props.show ? <div className="Backdrop" onClick={props.clicked} /> : null;

ReactDOM.render(<App />, document.getElementById("root"));
