import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required(),
    password: Joi.string().required()
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, { abortEarly: false });
    console.log(result);
    const errors = {};
    const { account } = this.state;
    if (account.username.trim() === '')
      errors.username = "Username is required.";
    if (account.password.trim() === '')
      errors.password = "Passowrd is required.";
    //console.log(Object.keys(errors).length === 0 ? null : errors);
    return Object.keys(errors).length === 0 ? null : errors;
  };
  handelChange = ({ currentTarget: input }) => {
    console.log({ currentTarget: input });
    console.log(input.name, input.value);
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
  handelSubmit = (e) => {
    e.preventDefault();
    //console.log(e.preventDefault());
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
    console.log("Submitted");
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1> Login</h1>
        <form onSubmit={this.handelSubmit}>
          <Input
            name={this.username}
            value={account.value}
            label={"UserName"}
            onChange={this.handelChange}
            error={errors.username}
          />
          <Input
            name={this.password}
            value={account.value}
            label={"Password"}
            onChange={this.handelChange}
            error={errors.password}
          />

          <button className="btn bnt-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
