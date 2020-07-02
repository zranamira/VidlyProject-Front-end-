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
    if (!result.error) return null;
    const errors = {}
    for (let item of result.error.details)
      errors[item.path[0]] = item.message;
    return errors;
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
    //if (errors) return;
    console.log("Submitted");
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1> Login</h1>
        <form onSubmit={this.handelSubmit}>
          <Input
            name="username"
            value={account.value}
            onChange={this.handelChange}
            //name={this.username}
            label={"UserName"}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.value}
            onChange={this.handelChange}
            //name={this.password}
            label={"Password"}
            error={errors.password}
          />

          <button className="btn bnt-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;

